import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField,Button } from '@material-ui/core';
import Autocomplete from '../Autocomplete';

const styles = {
  core: {
    padding: '5rem 0 5rem 0'
  },
  form: {
    textAlign: 'center'
  },
  txtFields: {
    width: '20rem'
  },
  formChildren: {
    margin: '.5rem'
  }
};

class TallyProductPage extends Component {
  state = {
    suggestedProducts: this.props.products,
    amountField: '',
    priceField: '',
    productTally: []
  };

  handleTxtChange = (e, field) => {
    this.setState({
      [field]: e.target.value,
      suggestedProducts: this.props.products.filter(a => a.name.includes(e.target.value))
    });
  }

  handleProductSelection = product => {
    this.setState({
      priceField: product.sellPrice
    });
  }
  
  render() {
    const { classes, products } = this.props;
    const { amountField, priceField } = this.state;

    return (
      <div className={classes.core}>
        <form className={classes.form}>
          <Autocomplete 
            label='Προϊόν'
            suggestions={products}
            onChange={product => this.handleProductSelection(product)}
          />
          <br />
          <TextField
            className={[classes.txtFields, classes.formChildren].join(' ')}
            label='Ποσότητα'
            value={amountField}
            type='number'
            onChange={e => this.handleTxtChange(e, 'amountField')}
            InputLabelProps={{shrink: true}}
          />
          
          <br />
          <TextField
            className={[classes.txtFields, classes.formChildren].join(' ')}
            label='Τιμή'
            value={priceField}
            onChange={e => this.handleTxtChange(e, 'priceField')}
            InputLabelProps={{shrink: true}}
          />
          <br />
          <Button
            className={classes.formChildren}
            variant='contained'
            color='primary'
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(TallyProductPage);
