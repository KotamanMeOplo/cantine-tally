import React, { Component } from 'react';
import MyAppBar from './Components/MyAppBar';
import HomePage from './Components/Pages/HomePage';

class App extends Component {
  state = {
    displayingPage: 'Αρχική'
  }

  pageChangeHandler = page => this.setState({displayingPage: page});
  
  render() {
    return (
      <div className="App">
        <MyAppBar page={this.state.displayingPage} handlePageChange={this.pageChangeHandler} />
        {this.state.displayingPage === 'Αρχική' && <HomePage />}
      </div>
    );
  }
}

export default App;
