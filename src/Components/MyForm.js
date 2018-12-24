import React, { Component } from 'react';
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

const stateAssignment = fields => {
  const obj = {};
  fields.forEach(a => {
    if(!a.systemFilled)
      obj[a.prop] = '';
  });

  return obj;
}

class MyForm extends Component {
  state = stateAssignment(this.props.fields);

  handleTxtChange = (e, field) => this.setState({[field]: e.target.value,});

  handleItemSelection = item => {
    const obj = {};
    this.props.fields
      .filter(a => a.acDependant || a.autocomplete)
      .forEach(a => {
        obj[a.prop] = item[a.prop];
      });

    this.setState(obj);
  }

  handleSubmit = _ => {
    let errors = [];

    for (let i in this.state) {
      if(!this.state[i]) {
        errors.push('Ένα πεδίο έχει μείνει άδειο.');
      }
    }

    if(errors.length > 0) {
      errors.forEach(a => alert(a));
    } else {
      const systemFilledField = this.props.fields.filter(a => a.systemFilled)[0];
      const obj = systemFilledField ? {[systemFilledField.prop]: systemFilledField.fillingFunc(this.state)} : {};
      this.props.handleSubmit(Object.assign(obj, this.state));

      Object.keys(this.state).forEach(a => this.setState({[a]: ''}));
    }
  }

  render() {
    const { fields, classes, itemSuggestions } = this.props;

    return (
      <form className={classes.form}>
        {
          fields.map((a, i) => {
            if(a.systemFilled){
              return;
            }
            if(a.autocomplete) {
              return (
                <div key={i}>
                  <Autocomplete
                    label={a.field}
                    suggestions={itemSuggestions}
                    value={this.state[a.prop]}
                    handleChange={e => this.handleTxtChange(e, a.prop)}
                    onChange={item => this.handleItemSelection(item)}
                  />
                  <br />
                </div>
              );
            } else {
              return (
                <div key={i}>
                  <TextField
                    className={[classes.txtFields, classes.formChildren].join(' ')}
                    label={a.field}
                    value={this.state[a.prop]}
                    onChange={e => this.handleTxtChange(e, a.prop)}
                    InputLabelProps={{shrink: true}}
                    disabled={a.acDependant ? true : false}
                    type={a.number ? 'number' : 'string'}
                    InputProps={a.number && {step: a.numberStep}}
                  />
                  <br />
                </div>
              );
            }
          })
        }
        <Button
          className={classes.formChildren}
          variant='contained'
          color='primary'
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(MyForm);
