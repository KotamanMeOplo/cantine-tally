import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

const styles = {
  core: {
    padding: '5rem 2rem 2rem 2rem'
  },
  topHeading: {
    padding: '2rem 0 0 0'
  },
  subHeading: {
    margin: '1rem 0 2rem 0'
  },
  heading: {
    margin: '2rem 0'
  },
  text: {
    margin: '1rem 0'
  },
  code: {
    background: '#eee',
    maxWidth: '100%',
    padding: '1.6em'
  }
};

class DataPage extends Component {
  
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
        <pre className={classes.code}>
          {JSON.stringify(data)}
        </pre>

        <Typography variant="h4" className={classes.subHeading}>
          Είσοδος
        </Typography>
        <Typography variant="subtitle1">
          Επικολλήστε πιο κάτω τα δεδομένα που θέλετε να εισάγετε στον οδηγό.
        </Typography>
        <Input placeholder="Δεδομένα"/>
      </div>
    );
  }
}

export default withStyles(styles)(DataPage);
