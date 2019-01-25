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
    displayingPage: 'Αρχική',
    setUpProducts: [],
    setUpOwers: [],
    tallyProducts: [],
    tallyOwers: [],
    tallyCash: [],
    supplyProducts: []
  }

  pageChangeHandler = (page, direction) => {
    if(page) {
      this.setState({displayingPage: page});
    } else {
      const pages = [
        'Set Up > Προϊόντα',
        'Set Up > Χρεώστες',
        'Καταμέτρηση > Προϊόντα',
        'Καταμέτρηση > Χρωστημιά',
        'Καταμέτρηση > Ταμείο',
        'Καταμέτρηση > Αποτέλεσμα'
      ];
      const newIndex = pages.indexOf(this.state.displayingPage) + direction;
      this.setState({displayingPage: pages[newIndex]});
    }
  }

  handleNewItem = (item, field) => {
    const newValue = [...this.state[field], item];

    if(field === 'tallyOwers') {
      newValue.sort((a, b) => b.amount - a.amount);
    }

    if(field === 'setUpOwers' || field === 'setUpProducts') {
      localStorage.setItem(field, JSON.stringify(newValue));
    }

    this.setState({
      [field]: newValue
    });
  }

  handleItemDeletion = (item, field) => {
    const index = this.state[field].indexOf(item);
    const newValue = [...this.state[field].slice(0, index), ...this.state[field].slice(index + 1, this.state[field].length)];

    if(field === 'setUpOwers' || field === 'setUpProducts') {
        localStorage.setItem(field, JSON.stringify(newValue));
      }
      
    this.setState({
      [field]: newValue
    })
  }

  clearTallyHandler = _ => {
    this.setState({
      tallyProducts: [],
      tallyOwers: [],
      tallyCash: [],
      displayingPage: 'Καταμέτρηση > Προϊόντα',
    });
  }

  componentWillMount = _ => {
    const _setUpProducts = localStorage.getItem('setUpProducts');
    const _setUpOwers = localStorage.getItem('setUpOwers');

    this.setState({
      setUpOwers: _setUpOwers ? JSON.parse(_setUpOwers) : [],
      setUpProducts: _setUpProducts ? JSON.parse(_setUpProducts) : []
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
              handleItemDeletion={item => this.handleItemDeletion(item, 'setUpProducts')}
              onChangePage={dir => this.pageChangeHandler(null, dir)}
              nextButton={true}
            />
        }
        {
          this.state.displayingPage === 'Set Up > Χρεώστες' &&
            <Page
              fields={setUpOwersFields}
              items={this.state.setUpOwers}
              handleNewItem={item => this.handleNewItem(item, 'setUpOwers')}
              handleItemDeletion={item => this.handleItemDeletion(item, 'setUpOwers')}
              onChangePage={dir => this.pageChangeHandler(null, dir)}
              backButton={true}
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
              onChangePage={dir => this.pageChangeHandler(null, dir)}
              nextButton={true}
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
              onChangePage={dir => this.pageChangeHandler(null, dir)}
              nextButton={true}
              backButton={true}
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
              onChangePage={dir => this.pageChangeHandler(null, dir)}
              nextButton={true}
              backButton={true}
            />
        }
        {
          this.state.displayingPage === 'Καταμέτρηση > Αποτέλεσμα' &&
            <TallyResultPage
              tables={['Προϊόντα', 'Χρωστημιά', 'Ταμείο']}
              fields={[tallyProductsFields, tallyOwersFields, tallyCashFields]}
              items={[this.state.tallyProducts, this.state.tallyOwers, this.state.tallyCash]}
              totalFields={['total', 'amount', 'amount']}
              onChangePage={dir => this.pageChangeHandler(null, dir)}
              onClearTally={this.clearTallyHandler}
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
