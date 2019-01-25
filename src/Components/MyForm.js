import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from './Autocomplete';

const styles = {
  form: {
    textAlign: 'center'
  },
  formChildren: {
    padding: '.5rem'
  },
  txtFields: {
    width: '20rem'
  }
};

const stateAssignment = (fields, item) => {
  const obj = {};
  fields.forEach(a => {
    if(!a.systemFilled)
      obj[a.prop] = item ? item[a.prop] : '';
  });

  return obj;
}

class MyForm extends Component {
  state = stateAssignment(this.props.fields);

  componentWillReceiveProps = nextProps => {
    if(this.props.defaultItem !== nextProps.defaultItem) {
      const obj = stateAssignment(this.props.fields, nextProps.defaultItem);
      this.setState(obj);
    }
  }

  handleTxtChange = (e, field) => this.setState({
    [field.prop]: e.target.value,
  });

  handleItemSelection = item => {
    const obj = {};
    this.props.fields
      .filter(a => a.acDependant || a.autocomplete)
      .forEach(a => {
        obj[a.prop] = item[a.prop];
      });

    this.setState(obj);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('submitted');
    let errors = [];

    for (let i in this.state) {
      if(!this.state[i] && i !== 'defaultItem') {
        errors.push('Ένα πεδίο έχει μείνει άδειο.');
      }
    }

    if(errors.length > 0) {
      errors.forEach(a => alert(a));
    } else {

      const systemFilledField = this.props.fields.filter(a => a.systemFilled)[0];
      let obj = systemFilledField ? {[systemFilledField.prop]: systemFilledField.fillingFunc(this.state)} : {};
      Object.assign(obj, this.state);
      this.props.fields.forEach(a => {
        if(a.number) {
          obj[a.prop] = parseFloat(obj[a.prop]);
        }
      });
      this.props.handleSubmit(obj);

      Object.keys(this.state).forEach(a => this.setState({[a]: ''}));
    }
  }

  render() {
    const { fields, classes, alreadySelectedItems } = this.props;
    let { itemSuggestions } = this.props;
    if(alreadySelectedItems && itemSuggestions) {
      itemSuggestions = itemSuggestions.filter(a => alreadySelectedItems.filter(b => b.name === a.name).length === 0);
    }

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        {
          fields.map((a, i) => {
            if(a.systemFilled){
              return null;
            }
            if(a.autocomplete) {
              return (
                <Fragment key={i}>
                  <Autocomplete
                    label={a.field}
                    suggestions={itemSuggestions}
                    value={this.state[a.prop]}
                    handleChange={e => this.handleTxtChange(e, a)}
                    onChange={item => this.handleItemSelection(item)}
                  />
                  <br />
                </Fragment>
              );
            } else {
              return (
                <Fragment key={i}>
                  <TextField
                    className={[classes.txtFields, classes.formChildren].join(' ')}
                    label={a.field}
                    value={this.state[a.prop]}
                    onChange={e => this.handleTxtChange(e, a)}
                    InputLabelProps={{shrink: true}}
                    disabled={a.acDependant ? true : false}
                    type={a.number ? 'number' : 'string'}
                    InputProps={a.number && {step: a.numberStep}}
                  />
                  <br />
                </Fragment>
              );
            }
          })
        }
        <Button
          type='submit'
          className={classes.formChildren}
          variant='contained'
          color='primary'
          onClick={this.handleSubmit}
        >
          ΥΠΟΒΟΛΗ
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(MyForm);
