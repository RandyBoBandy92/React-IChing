import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// alright so lets try and present something.
// i know i need the reactdom thing

class Box extends React.Component {
  // create a container
  constructor(props) {
    // initialize
    super(props); // inherit abilities from props
    this.state = {
      // now lets give it some states
      testBool: true, // a boolean to use as a toggle
      textString: "hello",
    };
  }

  renderButton() {
    return <boolButton onClick={() => this.handleClick()} />;
  }

  render() {
    return (
      <div className="box">
        <p>{this.state.textString}</p>
        <p>{this.state.testBool ? "Boolean is true" : "Boolean is false"}</p>
        {this.renderButton()}
      </div>
    );
  }
}

// alright, now I want to make a button that will control the toggling of that testBool

function boolButton(props) {
  return (
    <button className="boolButton" onClick={this.props.onClick}>
      I AM BUTTON
    </button>
  );
}

// =========================================
ReactDOM.render(<Box />, document.getElementById("root"));
