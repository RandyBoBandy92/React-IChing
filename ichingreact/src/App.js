import React from "react";


class Line extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <p>I am line</p>
    )
  }
}
class Trigram extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
              <p>I am the {this.props.trigramData.position} trigram</p>
              <Line/>
              <Line/>
              <Line/>
            </div>
        )
    }
}

class Hexagram extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.hexagramData.hexagramNumber)
    return (
      <div className="hexagram">
          <p>I am Hexagram {this.props.hexagramData.hexagramNumber}</p>
          <Trigram
          trigramData={this.props.trigramData.upperTrigram}/>
          <Trigram
          trigramData={this.props.trigramData.lowerTrigram}/>
      </div>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hexagramData: {
        hexagramNumber: undefined,
      },
      trigramData: {
        upperTrigram: {
          position: "upper",
          lines: {
            upper: undefined,
            middle: undefined,
            lower: undefined
          }
        },
        lowerTrigram: {
          position: "lower",
          lines: {
            upper: undefined,
            middle: undefined,
            lower: undefined
          }
        }
      }
    };
  }

  render() {
    // console.log(this.state.hexagramData)
    return (
      <div className="app">
        <Hexagram
        hexagramData={this.state.hexagramData}
        trigramData={this.state.trigramData}
        />
      </div>
    );
  }
}

export default App;
