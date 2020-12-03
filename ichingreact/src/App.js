import React from "react";
import iChingData from './iChingData'

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
    return (
      <div className="hexagram">
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
    this.state = iChingData
  }

  render() {
    // console.log(this.state.hexagramData)
    return (
      <div className="app">
        <Hexagram
        hexagramData={this.state.hexagramNumber}
        trigramData={this.state.trigramData}
        />
      </div>
    );
  }
}

export default App;
