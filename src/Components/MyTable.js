import React, { Component } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, Menu, MenuItem } from '@material-ui/core';
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
  state = {
    anchorEl: null
  };

  handleMenuClose = _ => {
    this.setState({anchorEl: null});
  }
  
  handleRightClick = e => {
    e.preventDefault();
    this.setState({anchorEl: e.currentTarget});
  }

  render() {
    const { fields, data, classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map((a, i) => <TableCell key={i}>{a.field}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => (
              <TableRow key={i} onContextMenu={e => this.handleRightClick(e)}>
                {
                  fields.map((field, j) => (
                  <TableCell className={classes.cell} key={j}>
                    {field.shouldRound ? roundNumToNumOfDecimals(item[field.prop], 2) : item[field.prop]}
                  </TableCell>
                  ))
                }
              </TableRow>
            ))}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem>Kota</MenuItem>
            </Menu>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(MyTable);
