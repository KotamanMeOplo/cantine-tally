import React, { Component } from 'react';
import MyAppBar from './Components/MyAppBar';
import HomePage from './Components/Pages/HomePage';
import SetUpPage from './Components/Pages/SetUpPage';
import TallyProductPage from './Components/Pages/TallyProductPage';

class App extends Component {
  state = {
    displayingPage: 'Καταμέτρηση > Προϊόντα',
    products: [
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
    owers: [
      {
        name: 'Λοχαγός'
      },
      {
        name: 'Μονάδα'
      },
      {
        name: 'Ζαχαρίας'
      }
    ]
  }

  pageChangeHandler = page => this.setState({displayingPage: page});

  handleNewProduct = product => {
    this.setState({
      products: [...this.state.products, product]
    });
  }

  handleNewOwer = ower => {
    this.setState({
      owers: [...this.state.owers, ower]
    });
  }
  
  render() {
    const setUpProductsFields = [
      {
        shouldRound: false,
        prop: 'name',
        field: 'Προϊόν'
      },
      {
        shouldRound: true,
        prop: 'buyPrice',
        field: 'Τιμή Αγοράς'
      },
      {
        shouldRound: true,
        prop: 'sellPrice',
        field: 'Τιμή Πώλησης'
      }
    ];

    const setUpOwersFields = [
      {
        field: 'Χρεώστης',
        prop: 'name',
        shouldRound: false
      }
    ];

    return (
      <div className="App">
        <MyAppBar page={this.state.displayingPage} handlePageChange={this.pageChangeHandler} />
        {this.state.displayingPage === 'Αρχική' && <HomePage />}
        {
          this.state.displayingPage === 'Set Up > Προϊόντα' && 
            <SetUpPage
              fields={setUpProductsFields}
              data={this.state.products}
              handleNewSetUpItem={item => this.handleNewProduct(item)}
            />
        }
        {
          this.state.displayingPage === 'Set Up > Χρεώστες' &&
            <SetUpPage
              fields={setUpOwersFields}
              data={this.state.owers}
              handleNewSetUpItem={ower => this.handleNewOwer(ower)}
            />
        }
        {
          this.state.displayingPage === 'Καταμέτρηση > Προϊόντα' &&
            <TallyProductPage
              products={this.state.products}
            />
        }
      </div>
    );
  }
}

export default App;
