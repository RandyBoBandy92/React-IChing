import React from "react";
import { iChingData, getTrigram } from "./iChingData";


class IChingText extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h3>Upper Trigram: {this.props.divinationData.trigrams.upper.value}</h3>
        <h3>Lower Trigram: {this.props.divinationData.trigrams.lower.value}</h3>
      </div>
    )
  }
}
class Line extends React.Component {
  constructor(props) {
    super(props)
    this.styles = {
      width: "200px",
      border: "2px solid black"
    }
  }
  render () {
    return (
      <div className={`line-${this.props.line.lineNum}`}>
        <img
        src={this.props.line.image}
        style={this.styles}
        onClick={() => this.props.handleLineClick(this.props.line.lineNum)}
        />
      </div>
    )
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = iChingData
    this.styles = {
      margin: "auto",
      width: "max-content",
      marginTop: "20px"
    }
    this.handleLineClick = this.handleLineClick.bind(this)

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lines !== this.state.lines) {
      this.checkTrigrams()
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
    }
  }


  checkTrigrams() {
    let lines = this.makeLinesReadableToHumanPls(this.state.lines)
    this.lowerTrigram = undefined
    this.upperTrigram = undefined

    if (lines.line1.value && lines.line2.value && lines.line3.value) { // if the 3 bottom lines have values
      console.log("Bottom trigram has value!")
      this.lowerTrigram = getTrigram(lines.line1.name, lines.line2.name, lines.line3.name)
      console.log(this.lowerTrigram)
    }
    if (lines.line4.value && lines.line5.value && lines.line6.value) { // if the 3 upper lines have values
      console.log("Upper trigram has value!")
      this.upperTrigram = getTrigram(lines.line4.name, lines.line5.name, lines.line6.name)
      console.log(this.upperTrigram)
    }
    this.updateTrigramsState(this.lowerTrigram, this.upperTrigram)
  }

  updateTrigramsState(lowerTrigram, upperTrigram) {
    this.setState(prevState => {
      return {
        ...prevState,
        trigrams: {
          upper: {
            value: upperTrigram
          },
          lower: {
            value: lowerTrigram
          }
        }
      }
    })
  }


  handleLineClick(lineNum) {
    // console.log(`Click detected on ${lineNum}`)
    let newValue = this.getRandomNumber(6, 9)
    let newPath = this.getImagePath(newValue)
    let newName = this.getName(newValue) 
    this.setState(prevState => {
      const updatedLines = prevState.lines.map(line => {
        if (line.lineNum === lineNum) {
          return {
            ...line,
            value: newValue,
            image: newPath,
            name: newName
          }
        }
        return line
      })
      return {
        ...prevState,
        lines: updatedLines
      }
    })
  }

  getName(value) {
    if (value === 6 || value === 8) {
      return 'yin'
    } else {
      return 'yang'
    }
  }

  getImagePath(value) {
    if (value === 6) {
      return this.state.imagePaths.oldYin
    } else if (value === 7) {
      return this.state.imagePaths.youngYang
    } else if (value === 8) {
      return this.state.imagePaths.youngYin
    } else if (value === 9) {
      return this.state.imagePaths.oldYang
    }
  }
  
  getRandomNumber(min, max) {
    // console.log(Math.floor(Math.random() * (max - min + 1)) + min)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  render() {
    const lineComponents = this.state.lines.map(line => <Line line={line} handleLineClick={this.handleLineClick}
    image={line.image}
    />)
    return (
      <div style={this.styles} className="app">
        {lineComponents}
        <IChingText className="divination-text" divinationData={this.state}/>
      </div>
    );
  }
}

export default App;
