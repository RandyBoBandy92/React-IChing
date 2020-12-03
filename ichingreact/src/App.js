import React from "react";
import Hexagram from "./Hexagram";
import Trigram from './Trigram'
import Line from './Line'

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
    return (
      <div className="app">
        <Hexagram
        hexagramData={this.state.hexagramData}>
            <Trigram
            trigramData={this.state.trigramData}>

            </Trigram>
            <Trigram
            trigramData={this.state.trigramData}>

            </Trigram>
        </Hexagram>
      </div>
    );
  }
}

export default App;
