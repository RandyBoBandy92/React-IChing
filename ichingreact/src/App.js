import React from "react";
import iChingData from "./iChingData";

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: "../images/nothing.png",
      value: undefined,
    };
    this.styles = {
      width: "200px",
      border: "2px solid black",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getRandomNumber(min, max) {
    // console.log(Math.floor(Math.random() * (max - min + 1)) + min)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getImagePath(number) {
    if (number === 6) {
      return "../images/old_yin.png";
    } else if (number === 7) {
      return "../images/young_yang.png";
    } else if (number === 8) {
      return "../images/young_yin.png";
    } else if (number === 9) {
      return "../images/old_yang.png";
    } else {
      return "../images/nothing.png";
    }
  }

  handleClick() {
    // this.setState({imgSrc: '../images/young_yang.png'})
    let value = this.getRandomNumber(6, 9);
    let imagePath = this.getImagePath(value);
    this.setState({
      value: value,
      imgSrc: imagePath,
    });
  }

  render() {
    return (
      <div>
        <img
          onClick={this.handleClick}
          style={this.styles}
          src={this.state.imgSrc}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      margin: "auto",
      width: "max-content",
      marginTop: "20px"
    }
  }

  render() {
    return (
      <div style={this.styles} className="app">
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
      </div>
    );
  }
}

export default App;
