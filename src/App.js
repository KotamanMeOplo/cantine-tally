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
import TallyResultPage from './Components/Pages/TallyResultPage';

class App extends Component {
  state = {
    displayingPage: 'Καταμέτρηση > Αποτέλεσμα',
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
    tallyCash: [],
    supplyProducts: []
  }

  pageChangeHandler = page => this.setState({displayingPage: page});

  handleNewItem = (item, field) => {
    console.log(item, field)
    this.setState({
      [field]: [...this.state[field], item]
    });
  }

  handleItemDeletion = (item, field) => {
    const index = this.state[field].indexOf(item);
    this.setState({
      [field]: [...this.state[field].slice(0, index), ...this.state[field].slice(index + 1, this.state[field].length)]
    })
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
              handleItemDeletion={item => this.handleItemDeletion(item, 'setUpProducts')}
            />
        }
        {
          this.state.displayingPage === 'Set Up > Χρεώστες' &&
            <Page
              fields={setUpOwersFields}
              items={this.state.setUpOwers}
              handleNewItem={item => this.handleNewItem(item, 'setUpOwers')}
              handleItemDeletion={item => this.handleItemDeletion(item, 'setUpOwers')}
            />
        }
        {
          this.state.displayingPage === 'Καταμέτρηση > Προϊόντα' &&
            <Page
              fields={tallyProductsFields}
              itemSuggestions={this.state.setUpProducts}
              items={this.state.tallyProducts}
              handleNewItem={item => this.handleNewItem(item, 'tallyProducts')}
              handleItemDeletion={item => this.handleItemDeletion(item, 'tallyProducts')}
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
              handleItemDeletion={item => this.handleItemDeletion(item, 'tallyOwers')}
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
              handleItemDeletion={item => this.handleItemDeletion(item, 'tallyCash')}
              totalField='amount'
            />
        }
        {
          this.state.displayingPage === 'Καταμέτρηση > Αποτέλεσμα' &&
            <TallyResultPage
              tables={['Προϊόντα', 'Χρωστημιά', 'Ταμείο']}
              fields={[tallyProductsFields, tallyOwersFields, tallyCashFields]}
              items={[this.state.tallyProducts, this.state.tallyOwers, this.state.tallyCash]}
              totalFields={['total', 'amount', 'amount']}
            />
        }
        {
          this.state.displayingPage === 'Χρέωση' &&
            <Page
              fields={tallyProductsFields}
              itemSuggestions={this.state.setUpProducts}
              items={this.state.supplyProducts}
              handleNewItem={item => this.handleNewItem(item, 'supplyProducts')}
              handleItemDeletion={item => this.handleItemDeletion(item, 'supplyProducts')}
              totalField='total'
            />
        }
      </div>
    );
  }
}

export default App;
