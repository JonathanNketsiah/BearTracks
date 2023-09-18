import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Still a Hello, World Prototype</h1>
        <p>Welcome to our new single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>I changed the counter button to add/delete, which will allow you to add a new high score or delete all records.</p>
        
        <p>I updated the fetch data tab to fetch top scores. This page retrieves all records in the highscores table</p>
      </div>
    );
  }
}
