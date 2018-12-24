import React, { Component } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, Menu, MenuItem } from '@material-ui/core';
import { roundNumToNumOfDecimals } from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  cell: {
    border: 'none'
  }
};

class MyTable extends Component {
  state = {
    mousePosition: {
      x: 0,
      y: 0
    },
    menuOpen: false
  };

  handleMenuClose = _ => {
    console.log(this.state.mousePosition)
    this.setState({
      mousePosition: {
        x: 0,
        y: 0
      }
    });
  }
  
  handleRightClick = e => {
    e.preventDefault();

    this.setState({
      mousePosition: {
        x: e.clientX,
        y: e.clientY
      }
    });
  }

  render() {
    let { fields, items, classes, totalField } = this.props;
    const { mousePosition } = this.state;

    const total = items.reduce((pr, cur) => {
      console.log(cur, pr);
      return pr + cur[totalField]
    }, 0);
    console.log(total);
    items= [...items, {name: 'Σύνολο', [totalField]: total}];

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map((a, i) => <TableCell key={i} padding='dense'>{a.field}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow key={i} onContextMenu={e => this.handleRightClick(e)}>
                {
                  fields.map((field, j) => {
                    let contents = item[field.prop];
                    
                    if(field.shouldRound && contents) {
                      contents = '€' + roundNumToNumOfDecimals(contents, 2);
                    }

                    return (
                      <TableCell className={classes.cell} key={j} padding='dense'>
                        {contents}
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            ))}
            <Menu
              anchorPosition={{left: mousePosition.x, top: mousePosition.y}}
              anchorReference='anchorPosition'
              getContentAnchorEl={null}
              open={mousePosition.x + mousePosition.y !== 0}
              onClose={this.handleMenuClose}
            >
              <MenuItem><DeleteIcon />Διαγραφή</MenuItem>
              <MenuItem><EditIcon />Αλλαγή</MenuItem>
            </Menu>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(MyTable);
