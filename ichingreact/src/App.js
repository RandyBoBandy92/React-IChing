import React from "react";
import { iChingData, getTrigram, getHexagramNumber, getTransformValue } from "./iChingData";

class IChingText extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Upper Trigram: {this.props.divinationData.trigrams.upper.value}</h3>
        <h3>Lower Trigram: {this.props.divinationData.trigrams.lower.value}</h3>
        <h3>Hexagram Number: {this.props.divinationData.hexagram.number}</h3>
      </div>
    );
  }
}
class Line extends React.Component {
  constructor(props) {
    super(props);
    this.primaryStyles = {
      // width: "200px",
      border: "2px solid black",
      margin: "2px"
    };
    this.transformedStyles = {
      ...this.primaryStyles,
      display: "none"
    }
    this.addStylestoState(this.primaryStyles, this.transformedStyles)
  }
  addStylestoState(primaryStyles, transformedStyles) {
    this.setState(prevState => {
      return {
        ...prevState,
        lineStyles: {
          primaryStyles: primaryStyles,
          transFormedStyles: transformedStyles
        }
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.hexagram.number !== this.props.hexagram.transformNumber) {
      this.setState(prevState => {
        return {
          ...prevState,
          lineStyles: {
            ...prevState.lineStyles,
            transFormedStyles: {
              display: "block"
            }
          }
        }
      })
    }
  }

  render() {

    return (
      <div className={`line line-${this.props.line.lineNum}`}>
        <img
          className="primary-hexagram"
          src={this.props.line.image}
          style={this.primaryStyles}
          onClick={() => this.props.handleLineClick(this.props.line.lineNum)}
        />
        <img
          className="transformed-hexagram"
          src={this.props.line.transformImage}
          style={this.transformedStyles}
        />
      </div>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = iChingData;
    this.styles = {
      margin: "auto",
      width: "max-content",
      marginTop: "20px",
    };
    this.handleLineClick = this.handleLineClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lines !== this.state.lines) {
      this.checkTrigrams();
    } else if (prevState.trigrams !== this.state.trigrams) {
      this.checkHexagram();
    }
  }

  makeLinesReadableToHumanPls(linesArray) {
    return {
      line1: linesArray[5],
      line2: linesArray[4],
      line3: linesArray[3],
      line4: linesArray[2],
      line5: linesArray[1],
      line6: linesArray[0],
    };
  }

  checkHexagram() {
    // console.log("check hexagram function running");
    if (this.state.trigrams.lower.value && this.state.trigrams.upper.value) {
      // if both trigrams are truthy - have values
      let hexagramNumber = getHexagramNumber(
        this.state.trigrams.lower.value,
        this.state.trigrams.upper.value
      );
      let transformedHexagramNumber = getHexagramNumber(
        this.state.trigrams.transformedLower.value,
        this.state.trigrams.transformedUpper.value

      );
      this.updateHexagramState(hexagramNumber, transformedHexagramNumber);
    } else {
      // console.log("hexagram cannot be generated yet");
    }
  }


  updateHexagramState(hexagramNumber, transformedHexagramNumber) {
    this.setState((prevState) => {
      return {
        ...prevState,
        hexagram: {
          number: hexagramNumber,
          transformNumber: transformedHexagramNumber
        },
      };
    });
  }

  checkTrigrams() {
    let lines = this.makeLinesReadableToHumanPls(this.state.lines);
    let lowerTrigram 
    let upperTrigram 
    let lowerTransformTrigram
    let upperTransformTrigram

    if (lines.line1.value && lines.line2.value && lines.line3.value) {
      // if the 3 bottom lines have values
      // console.log("Bottom trigram has value!");
      lowerTrigram = getTrigram(
        lines.line1.name,
        lines.line2.name,
        lines.line3.name
      );
      lowerTransformTrigram = getTrigram(
        lines.line1.transformName,
        lines.line2.transformName,
        lines.line3.transformName,
      );
      // console.log(this.lowerTrigram);
    }
    if (lines.line4.value && lines.line5.value && lines.line6.value) {
      // if the 3 upper lines have values
      // console.log("Upper trigram has value!");
      upperTrigram = getTrigram(
        lines.line4.name,
        lines.line5.name,
        lines.line6.name
      );
      upperTransformTrigram = getTrigram(
        lines.line4.transformName,
        lines.line5.transformName,
        lines.line6.transformName
      );
      // console.log(this.upperTrigram);
    }
    this.updateTrigramsState(lowerTrigram, upperTrigram, lowerTransformTrigram, upperTransformTrigram);
  }

  updateTrigramsState(lowerTrigram, upperTrigram, lowerTransformTrigram, upperTransformTrigram) {
    this.setState((prevState) => {
      return {
        ...prevState,
        trigrams: {
          upper: {
            value: upperTrigram,
          },
          lower: {
            value: lowerTrigram,
          },
          transformedUpper: {
            value: upperTransformTrigram
          },
          transformedLower: {
            value: lowerTransformTrigram
          }
        },
      };
    });
  }

  handleLineClick(lineNum) {
    // console.log(`Click detected on ${lineNum}`)
    let newValue = this.getRandomNumber(6, 9);
    let newPath = this.getImagePath(newValue);
    let newName = this.getName(newValue);
    let newTransformValue = getTransformValue(newValue)
    let newTransformPath = this.getImagePath(newTransformValue)
    let newTransformName = this.getName(newTransformValue)
    // i need to write the function first and import it 
    this.setState((prevState) => {
      const updatedLines = prevState.lines.map((line) => {
        if (line.lineNum === lineNum) {
          return {
            ...line,
            value: newValue,
            transformValue: newTransformValue,
            image: newPath,
            transformImage: newTransformPath,
            name: newName,
            transformName: newTransformName
          };
        }
        return line;
      });
      return {
        ...prevState,
        lines: updatedLines,
      };
    });
  }

  getName(value) {
    if (value === 6 || value === 8) {
      return "yin";
    } else {
      return "yang";
    }
  }

  getImagePath(value) {
    if (value === 6) {
      return this.state.imagePaths.oldYin;
    } else if (value === 7) {
      return this.state.imagePaths.youngYang;
    } else if (value === 8) {
      return this.state.imagePaths.youngYin;
    } else if (value === 9) {
      return this.state.imagePaths.oldYang;
    }
  }

  getRandomNumber(min, max) {
    // console.log(Math.floor(Math.random() * (max - min + 1)) + min)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  render() {
    const lineComponents = this.state.lines.map((line) => (
      <Line
        line={line}
        handleLineClick={this.handleLineClick}
        image={line.image}
        hexagram={this.state.hexagram}
      />
    ));
    return (
      <div style={this.styles} className="app">
        <div className="lines">
        {lineComponents}
        </div>
        <IChingText className="divination-text" divinationData={this.state} />
      </div>
    );
  }
}

export default App;
