import React, { Component } from 'react';
import MyAppBar from './Components/MyAppBar';
import HomePage from './Components/Pages/HomePage';
import {
  setUpProductsFields,
  setUpOwersFields,
  tallyProductsFields,
  tallyOwersFields,
  tallyCashFields,
  cashMeasurementUnitSuggestions
} from './helpers';
import Page from './Components/Pages/Page';

class App extends Component {
  state = {
    displayingPage: 'Καταμέτρηση > Προϊόντα',
    setUpProducts: [
      {
        name: 'Νερό',
        buyPrice: 0.20,
        sellPrice: .2
      },
      {
        name: 'Τριάρα',
        buyPrice: 2.05,
        sellPrice: 2.2
      },
      {
        name: 'Aero',
        buyPrice: 0.70,
        sellPrice: .8
      }
    ],
    setUpOwers: [
      {
        name: 'Λοχαγός'
      },
      {
        name: 'Μονάδα'
      },
      {
        name: 'Ζαχαρίας'
      }
    ],
    tallyProducts: [],
    tallyOwers: [],
    tallyCash: []
  }

  pageChangeHandler = page => this.setState({displayingPage: page});

  handleNewItem = (item, field) => {
    console.log(item, field)
    this.setState({
      [field]: [...this.state[field], item]
    });
  }
  
  render() {
    return (
      <div className="App">
        <MyAppBar page={this.state.displayingPage} handlePageChange={this.pageChangeHandler} />
        {this.state.displayingPage === 'Αρχική' && <HomePage />}
        {
          this.state.displayingPage === 'Set Up > Προϊόντα' && 
            <Page
              fields={setUpProductsFields}
              items={this.state.setUpProducts}
              handleNewItem={item => this.handleNewItem(item, 'setUpProducts')}
            />
        }
        {
          this.state.displayingPage === 'Set Up > Χρεώστες' &&
            <Page
              fields={setUpOwersFields}
              items={this.state.setUpOwers}
              handleNewItem={item => this.handleNewItem(item, 'setUpOwers')}
            />
        }
        {
          this.state.displayingPage === 'Καταμέτρηση > Προϊόντα' &&
            <Page
              fields={tallyProductsFields}
              itemSuggestions={this.state.setUpProducts}
              items={this.state.tallyProducts}
              handleNewItem={item => this.handleNewItem(item, 'tallyProducts')}
              totalField='total'
            />
        }
        {
          this.state.displayingPage === 'Καταμέτρηση > Χρωστημιά' &&
            <Page
              fields={tallyOwersFields}
              itemSuggestions={this.state.setUpOwers}
              items={this.state.tallyOwers}
              handleNewItem={item => this.handleNewItem(item, 'tallyOwers')}
              totalField='amount'
            />
        }
        {
          this.state.displayingPage === 'Καταμέτρηση > Ταμείο' &&
            <Page
              fields={tallyCashFields}
              itemSuggestions={cashMeasurementUnitSuggestions}
              items={this.state.tallyCash}
              handleNewItem={item => this.handleNewItem(item, 'tallyCash')}
              totalField='amount'
            />
        }
      </div>
    );
  }
}

export default App;
