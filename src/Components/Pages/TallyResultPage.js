import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MyTable from '../MyTable';
import { Typography, Button } from '@material-ui/core';
import { roundNumToNumOfDecimals } from '../../helpers';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  core: {
    padding: '5rem 0 5rem 0'
  },
  divChildren: {
    margin: '3rem 2rem 0 2rem'
  },
  buttonContainer: {
    textAlign: 'center',
    padding: '1rem'
  },
  buttons: {
    margin: '.5rem'
  }
};

class TallyResultPage extends Component {
  render() {
    const { classes, tables, fields, items, totalFields } = this.props;

    const total = items.reduce((pr1, cur1, i1) => pr1 + cur1.reduce((pr2, cur2) => pr2 + cur2[totalFields[i1]], 0), 0);
    return (
      <div className={classes.core}>
        <Typography variant="h4" className={classes.divChildren}>
          Γενικό Σύνολο: €{roundNumToNumOfDecimals(total, 2)}
        </Typography>
        {tables.map((curTable, i) =>
          <div key={i}>
            <Typography variant="h5" className={classes.divChildren}>
              {curTable}
            </Typography>
            <MyTable
              fields={fields[i]}
              items={items[i]}
              totalField={totalFields[i]}
              dialog={false}
            />
          </div>
        )}
        
        <div className={classes.buttonContainer}>
          <Button
            className={classes.buttons}
            variant='contained'
            color='secondary'
            onClick={_ => this.props.onChangePage(-1)}
          >
            <ChevronLeftIcon />
            ΤΑΜΕΙΟ
          </Button>
          <Button
            className={classes.buttons}
            variant='contained'
            color='secondary'
            onClick={_ => this.props.onChangePage(1)}
          >
            ΚΑΤ. PARETO
            <ChevronRightIcon />
          </Button>
          <br />
          <Button
            className={classes.buttons}
            variant='contained'
            color='secondary'
            onClick={this.props.onClearTally}
          >
            <DeleteIcon />
            ΜΗΔΕΝΙΣΜΟΣ ΚΑΤΑΜΕΤΡΗΣΗΣ
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TallyResultPage);
