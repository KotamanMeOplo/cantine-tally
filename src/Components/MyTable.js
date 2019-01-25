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
    targetItem: null
  };

  handleMenuClose = _ => this.setState({targetItem: null});
  
  handleRightClick = (e, item) => {
    e.preventDefault();

    this.setState({
      mousePosition: {
        x: e.clientX,
        y: e.clientY
      },
      targetItem: item
    });
  }

  handleItemDeletion = (item) => {
    this.props.handleItemDeletion(item);
    this.handleMenuClose();
  }

  handleEditClick = (item) => {
    this.props.handleItemEdit(item);
    this.handleItemDeletion(item);
  }

  render() {
    let { fields, items, classes, totalField } = this.props;
    const { targetItem, mousePosition } = this.state;

    if(totalField) {
      const total = items.reduce((pr, cur) => pr + cur[totalField], 0);
      items= [...items, {name: 'Σύνολο', [totalField]: total}];
    }

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map((a, i) => 
                <TableCell
                  key={i}
                  padding='dense'
                >
                  {a.field}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow key={i} onContextMenu={e => this.handleRightClick(e, item)}>
                {
                  fields.map((field, j) => {
                    let contents = item[field.prop];
                    
                    if(field.shouldRound && contents) {
                      contents = '€' + roundNumToNumOfDecimals(contents, 2);
                    }

                    return (
                      <TableCell
                        className={items.length !== i + 1 ? classes.cell : ''}
                        key={j}
                        padding='dense'
                      >
                        {contents}
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            ))}
            <Menu
              anchorPosition={{left: mousePosition.x, top: mousePosition.y}}
              transformOrigin={{horizontal: 'center', vertical: 'bottom'}}
              anchorReference='anchorPosition'
              getContentAnchorEl={null}
              open={Boolean(targetItem)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={_ => this.handleItemDeletion(targetItem)}><DeleteIcon />Διαγραφή</MenuItem>
              <MenuItem onClick={_ => this.handleEditClick(targetItem)}><EditIcon />Αλλαγή</MenuItem>
            </Menu>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(MyTable);
