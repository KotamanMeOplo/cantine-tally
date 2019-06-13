import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const styles = {
  core: {
    padding: '5rem 2rem 2rem 2rem'
  },
  subHeading: {
    margin: '1rem 0 2rem 0'
  },
  heading: {
    margin: '2rem 0'
  },
  code: {
    background: '#eee',
    padding: '1.6em',
    overflowWrap: 'break-word',
    lineHeight: '1.6',
    fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace'
  },
  input: {
    width: '100%',
    marginBottom: '.5rem'
  }
};

class DataPage extends Component {
  state = {
    input: ''
  };

  handleChange = e => this.setState({input: e.target.value});

  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.core}>
        <Typography variant="h2" className={classes.heading}>
          Δεδομένα
        </Typography>
        <Typography variant="subtitle1">
          Ένας ΚΨΜτζης έχει εισάγει ήδη όλα τα προϊόντα και χρεώστες του ΚΨΜ του και ένας άλλος ΚΨΜτζης αρχίζει να χρεισημοποιά τον βοηθό, ο 1ος ΚΨΜτζης μπορεί να αποστείλει μερικά δεδομένα στον 2ο έτσι όστε να αποκτήσει και ο 2ος τα προϊόντα και χρεώστες του 1ου.
        </Typography>

        <Typography variant="h4" className={classes.subHeading}>
          Έξοδος
        </Typography>
        <Typography variant="subtitle1">
          Αντιγράψτε τα πιο κάτω δεδομένα και στείλτε τα στο άτομο που επιθυμείτε να τα αποκτήσει.
        </Typography>
        <div className={classes.code}>
          {JSON.stringify(data)}
        </div>

        <Typography variant="h4" className={classes.subHeading}>
          Είσοδος
        </Typography>
        <Typography variant="subtitle1">
          Επικολλήστε πιο κάτω τα δεδομένα που θέλετε να εισάγετε στον οδηγό.
        </Typography>
        <TextField
          label="Δεδομένα"
          onChange={this.handleChange}
          value={this.state.input}
          className={classes.input}
        />
        <Button variant="outlined" color="primary" onClick={_ => this.props.handleClick(this.state.input)}>
          ΕΙΣΑΓΩΓΗ
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(DataPage);
