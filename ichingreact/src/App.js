import React from "react";
import {
  iChingData,
  getTrigram,
  getHexagramNumber,
  getTransformValue,
  getHexagramText,
} from "./iChingData";
// const testJson = require('./DekorneText/hexagramJSONS/hexagram1.json')
// console.log(testJson)
import $ from "jquery";

class IChingText extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFancyTitle(divinationData) {
    if (divinationData.hexagram.number) {
      if (
        divinationData.hexagram.number !==
        divinationData.hexagram.transformNumber
      ) {
        return (
          <h1>
            {divinationData.hexagramText.primaryHexagramText.title} -&gt;{" "}
            {divinationData.hexagramText.transformedHexagramText.title}
          </h1>
        );
      } else {
        return <h1>{divinationData.hexagramText.primaryHexagramText.title}</h1>;
      }
    }
  }

  renderDekorneText(hexText, hexType) {
    // I only want this to return something, if I actually have something to produce
    let divinationData = this.props.divinationData;

    function renderHexTitle(hexType) {
      if (hexType === "primary") {
        return <h2>Primary Hexagram: {hexText.title}</h2>;
      } else {
        return <h2>Transformed Hexagram: {hexText.title}</h2>;
      }
    }

    function renderInnerText(textBlock) {
      let textElems = [];
      for (const [key, value] of Object.entries(textBlock)) {
        textElems.push(
          <p>
            {key}: {value}
          </p>
        );
      }
      return textElems;
    }

    if (divinationData.hexagram.number) {
      // if I have a working hexagram,
      // I must also have working hexagram text

      return (
        <div>
          {renderHexTitle(hexType)}
          <h3>Other Titles: {hexText.other_titles}</h3>
          <h4>Judgment:</h4>
          {renderInnerText(hexText.Judgment)}
          <h4>Image:</h4>
          {renderInnerText(hexText.Image)}
          <h4>Commentary:</h4>
          {renderInnerText(hexText.Commentary)}
          <h4>Notes:</h4>
          <p>{hexText.Notes}</p>
          <h4>Changing Lines:</h4>
          <h5>Line 1:</h5>
          {renderInnerText(hexText.line_1)}
          <h5>Line 2:</h5>
          {renderInnerText(hexText.line_2)}
          <h5>Line 3:</h5>
          {renderInnerText(hexText.line_3)}
          <h5>Line 4:</h5>
          {renderInnerText(hexText.line_4)}
          <h5>Line 5:</h5>
          {renderInnerText(hexText.line_5)}
          <h5>Line 6:</h5>
          {renderInnerText(hexText.line_6)}
        </div>
      );
    }
  }

  updateButtonStyles(divinationData) {
    // how many cases do I have?
    // in case of no hexagram, display nothing - thats effectively done
    if (divinationData.hexagram.number) {
      this.styles.buttonStyles.resetButton.display = "block";
    }
    if (
      divinationData.hexagram.number !== divinationData.hexagram.transformNumber
    ) {
      this.styles.buttonStyles.primaryHexButton.display = "block";
      this.styles.buttonStyles.transHexButton.display = "block";
    }
    // in case of just a primary hexagram, display only reset button
    // in case of primary and transformed hex, display all 3 buttons
  }

  render() {
    this.styles = {
      buttonStyles: {
        primaryHexButton: {
          display: "none",
        },
        transHexButton: {
          display: "none",
        },
        resetButton: {
          display: "none",
        },
      },
    };

    this.updateButtonStyles(this.props.divinationData);

    return (
      <div className="iching-text">
        <div className="button-menu">
          <button
            style={this.styles.buttonStyles.primaryHexButton}
            onClick={(e) =>
              this.props.updateTextDisplayState(e.target.innerHTML)
            }
          >
            Primary Hexagram
          </button>
          <button
            style={this.styles.buttonStyles.transHexButton}
            onClick={(e) =>
              this.props.updateTextDisplayState(e.target.innerHTML)
            }
          >
            Transformed Hexagram
          </button>
          <button
            style={this.styles.buttonStyles.resetButton}
            onClick={() => this.props.resetLines()}
          >
            Reset
          </button>
        </div>
        {this.renderFancyTitle(this.props.divinationData)}
        <div
          className="primary-hexagram-text"
          style={this.props.styles.primaryHexText}
        >
          {this.renderDekorneText(
            this.props.divinationData.hexagramText.primaryHexagramText,
            "primary"
          )}
        </div>
        <div
          className="transformed-hexagram-text"
          style={this.props.styles.transformedHexText}
        >
          {this.renderDekorneText(
            this.props.divinationData.hexagramText.transformedHexagramText,
            "transformed"
          )}
        </div>
      </div>
    );
  }
}
class Line extends React.Component {
  constructor(props) {
    super(props);
    this.auto = false;
  }

  componentDidMount() {
    if (this.auto) {
      this.props.handleLineClick(this.props.line.lineNum);
    }
  }

  render() {
    function getUpdatedDisplayProperty(hexagram) {
      // console.log("function called")
      if (hexagram.number && hexagram.transformNumber) {
        // if they both are true, they equal something
        // console.log("both hexagrams are something")
        if (hexagram.number !== hexagram.transformNumber) {
          // but they arent the same number
          return "block";
        } else {
          return "none";
        }
      } else {
        return "none";
      }
    }
    let transformDisplayProperty = getUpdatedDisplayProperty(
      this.props.hexagram
    );
    this.primaryStyles = {
      // width: "200px",
      border: "2px solid black",
      margin: "2px 5px",
    };
    this.transformedStyles = {
      ...this.primaryStyles,
      display: transformDisplayProperty,
    };
    return (
      <div className={`line line-${this.props.line.lineNum}`}>
        <img
          className="primary-hexagram"
          ref={this.autoClick}
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
      marginTop: "20px",
    };
    this.handleLineClick = this.handleLineClick.bind(this);
    this.resetLines = this.resetLines.bind(this);
    this.updateTextDisplayState = this.updateTextDisplayState.bind(this);
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
    let newPrimaryHexagramText = getHexagramText(hexagramNumber);
    let newTransformedHexagramText = getHexagramText(transformedHexagramNumber);
    // console.log(newPrimaryHexagramText);

    this.setState((prevState) => {
      return {
        ...prevState,
        hexagram: {
          number: hexagramNumber,
          transformNumber: transformedHexagramNumber,
        },
        hexagramText: {
          primaryHexagramText: newPrimaryHexagramText,
          transformedHexagramText: newTransformedHexagramText,
        },
        textStyles: {
          primaryHexText: {
            display: "block",
          },
          transformedHexText: {
            display: "none",
          },
        },
      };
    });
  }

  checkTrigrams() {
    let lines = this.makeLinesReadableToHumanPls(this.state.lines);
    let lowerTrigram;
    let upperTrigram;
    let lowerTransformTrigram;
    let upperTransformTrigram;

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
        lines.line3.transformName
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
    this.updateTrigramsState(
      lowerTrigram,
      upperTrigram,
      lowerTransformTrigram,
      upperTransformTrigram
    );
  }

  updateTrigramsState(
    lowerTrigram,
    upperTrigram,
    lowerTransformTrigram,
    upperTransformTrigram
  ) {
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
            value: upperTransformTrigram,
          },
          transformedLower: {
            value: lowerTransformTrigram,
          },
        },
      };
    });
  }

  resetLines() {
    // will reset all lines to factory conditions
    this.setState((prevState) => {
      const updatedLines = prevState.lines.map((line) => {
        return {
          ...line,
          value: undefined,
          transformValue: undefined,
          image: iChingData.imagePaths.nothing,
          transformImage: iChingData.imagePaths.nothing,
          name: undefined,
          transformName: undefined,
        };
      });
      return {
        ...prevState,
        lines: updatedLines,
        trigrams: {
          upper: {
            value: undefined,
          },
          lower: {
            value: undefined,
          },
          transformedUpper: {
            value: undefined,
          },
          transformedLower: {
            value: undefined,
          },
        },
        hexagram: {
          number: undefined,
          transformNumber: undefined,
        },
        hexagramText: {
          primaryHexagramText: undefined,
          transformedHexagramText: undefined,
        },
        textStyles: {
          primaryHexText: {
            display: "block",
          },
          transformedHexText: {
            display: "none",
          },
        },
      };
    });
  }

  updateTextDisplayState(userDesiredTextSection) {
    if (userDesiredTextSection === "Primary Hexagram") {
      this.setState((prevState) => {
        return {
          ...prevState,
          textStyles: {
            primaryHexText: {
              display: "block",
            },
            transformedHexText: {
              display: "none",
            },
          },
        };
      });
    } else if (userDesiredTextSection === "Transformed Hexagram") {
      this.setState((prevState) => {
        return {
          ...prevState,
          textStyles: {
            primaryHexText: {
              display: "none",
            },
            transformedHexText: {
              display: "block",
            },
          },
        };
      });
    }
  }

  handleLineClick(lineNum) {
    // console.log(`Click detected on ${lineNum}`)
    let newValue = this.getRandomNumber(6, 9);
    let newPath = this.getImagePath(newValue);
    let newName = this.getName(newValue);
    let newTransformValue = getTransformValue(newValue);
    let newTransformPath = this.getImagePath(newTransformValue);
    let newTransformName = this.getName(newTransformValue);
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
            transformName: newTransformName,
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
        <div className="lines">{lineComponents}</div>
        <h5
          style={
            this.state.hexagram.number
              ? { display: "none" }
              : { display: "block" }
          }
        >
          Click on the lines to randomly generate yin/yang lines.
        </h5>
        <IChingText
          resetLines={this.resetLines}
          className="divination-text"
          divinationData={this.state}
          styles={this.state.textStyles}
          updateTextDisplayState={this.updateTextDisplayState}
        />
      </div>
    );
  }
}

export default App;
