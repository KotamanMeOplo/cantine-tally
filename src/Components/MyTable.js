import React, { Component } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, Dialog, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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
    targetItem: null
  };

  handleDialogClose = _ => this.setState({targetItem: null});
  
  handleRightClick = (e, item) => {
    e.preventDefault();

    this.setState({
      targetItem: item
    });
  }

  handleItemDeletion = (item) => {
    if(item.name !== 'Σύνολο') {
      this.props.handleItemDeletion(item);
    } else {
      alert('Όχι το σύνολο είναι χρήσιμο και δεν θα το αλλάξεις εσύ αυτό! ლ(▀̿̿Ĺ̯̿̿▀̿ლ)')
    }
    this.handleDialogClose();
  }

  handleEditClick = (item) => {
    if(item.name !== 'Σύνολο') {
      this.props.handleItemEdit(item);
      window.scrollTo(0, 0);
    }
    this.handleItemDeletion(item);
  }

  render() {
    let { fields, items, classes, totalField, dialog } = this.props;
    const { targetItem } = this.state;

    if(totalField) {
      const total = items.reduce((pr, cur) => pr + cur[totalField], 0);
      items= [...items, {name: 'Σύνολο', [totalField]: total}];
    }

    return (
      <div className="table">
        <Table padding="checkbox">
          <TableHead>
            <TableRow>
              {fields.map((a, i) => 
                <TableCell
                  key={i}
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
                      >
                        {contents}
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            ))}
            {dialog && 
              <Dialog
                open={Boolean(targetItem)}
                onClose={this.handleDialogClose}
              >
                <DialogTitle>Ενέργειες</DialogTitle>
                  <List>
                    <ListItem onClick={_ => this.handleItemDeletion(targetItem)} button>
                      <ListItemIcon><DeleteIcon /></ListItemIcon>
                      <ListItemText primary="Διαγραφή" />
                    </ListItem>
                    <ListItem onClick={_ => this.handleEditClick(targetItem)} button>
                      <ListItemIcon><EditIcon /></ListItemIcon>
                      <ListItemText primary="Αλλαγή" />
                    </ListItem>
                  </List>
              </Dialog>
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(MyTable);
