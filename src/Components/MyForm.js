import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

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
    obj[a.prop] = '';
  });

  return obj;
}

class MyForm extends Component {
  state = stateAssignment(this.props.fields);

  handleChange = (e, field) => {
    this.setState({[field]: e.target.value});
  }

  handleSubmit = _ => {
    this.props.handleSubmit(Object.assign({}, this.state));

    Object.keys(this.state).forEach(a => this.setState({[a]: ''}));
  }

  render() {
    const { fields, classes } = this.props;

    return (
      <form className={classes.form}>
        {fields.map((a, i) => (
          <div className={classes.formChildren} key={i}>
            <TextField
              value={this.state[a.prop]}
              onChange={e => this.handleChange(e, a.prop)}
              label={a.field}
              placeholder={a.field}
              InputLabelProps={{shrink: true}}
              className={classes.txtFields}
            />
            <br />
          </div>
        ))}
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
