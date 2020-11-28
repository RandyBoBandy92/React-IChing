import React, { Component } from 'react';
 
class App extends Component {
  getGreeting() {
    return 'nice';
  }

  render() {
    return (
      <div>
        <h1>{this.getGreeting()}</h1>
      </div>
    );
  }
}
 
export default App;
