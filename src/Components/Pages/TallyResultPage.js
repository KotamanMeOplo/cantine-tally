import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MyTable from '../MyTable';
import { Typography } from '@material-ui/core';
import { roundNumToNumOfDecimals } from '../../helpers';

const styles = {
  core: {
    padding: '5rem 0 5rem 0'
  },
  divChildren: {
    margin: '3rem 2rem 0 2rem'
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
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TallyResultPage);
