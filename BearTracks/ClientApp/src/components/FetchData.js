import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { scores: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(scores) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(score =>
            <tr key={score.name}>
              <td>{score.name}</td>
              <td>{score.score}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.scores);

    return (
      <div>
        <h1 id="tabelLabel" >Player Scores</h1>
        <p>This component demonstrates fetching data from the database which is access-controlled by the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('highscore');
    const data = await response.json();
    this.setState({ scores: data, loading: false });
  }
}
