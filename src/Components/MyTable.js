import React, { Component } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import roundNumToNumOfDecimals from '../helpers';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  cell: {
    border: 'none'
  },
  txtFieldCell: {
    paddingRight: '.5rem',
    paddingLeft: '.5rem'
  },
  txtField: {
    fontSize: '.81rem'
  }
};

class MyTable extends Component {
  state = {};

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  }
  
  render() {
    const { fields, data, classes } = this.props;

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map((a, i) => <TableCell key={i}>{a.field}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRow>
              {fields.map((a, i) => (
                <TableCell className={[classes.cell, classes.txtFieldCell]}>
                  <TextField
                    className={classes.txtField}
                    fullWidth={true}
                    label={a.field}
                    value={this.state[a.prop]}
                    onChange={e => this.handleChange(e, [a.prop])}
                    />
                  </TableCell>
              ))}
            </TableRow> */}

            {data.map((item, i) => (
              <TableRow key={i}>
                {
                  fields.map((field, j) => (
                  <TableCell className={classes.cell} key={j}>
                    {field.shouldRound ? roundNumToNumOfDecimals(item[field.prop], 2) : item[field.prop]}
                  </TableCell>
                  ))
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(MyTable);
