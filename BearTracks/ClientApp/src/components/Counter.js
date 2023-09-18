import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: false };
    this.updateState = this.updateState.bind(this);
  }

  async deleteThe_dB(){
    var result = false;
    
    await fetch('highscore/delete')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      result = data;
    });
    return result;
  }

  async updateState() {
    this.state.currentCount = await this.deleteThe_dB();
    this.setState({
      currentCount: this.state.currentCount
    });
  }

  async addRecord(){
    await fetch('highscore/add')
  }

  render() {
    return (
      <div>
        <h1>Add/Delete Page</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Delete succeeded: <strong>{String(this.state.currentCount)}</strong></p>

        <button className="btn btn-primary" onClick={this.addRecord}>Add Score</button>
        <br></br>
        <br></br>
        <button className="btn btn-primary" onClick={this.updateState}>Delete dB</button>
      </div>
    );
  }
}
