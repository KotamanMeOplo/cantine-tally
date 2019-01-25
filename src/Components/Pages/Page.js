import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MyForm from '../MyForm';
import MyTable from '../MyTable';
import { Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const styles = {
  core: {
    padding: '5rem 0 5rem 0',
    textAlign: 'center'
  },
  buttons: {
    margin: '1rem'
  }
};

class Page extends Component {
  state = {
    itemToEdit: null
  };
  
  handleItemEdit = item => {
    this.setState({itemToEdit: item});
  }
  
  render() {
    const { classes, fields, itemSuggestions, items, totalField, handleItemDeletion, nextButton, backButton } = this.props;
    const { itemToEdit } = this.state;

    return (
      <div className={classes.core}>
        <MyForm
          fields={fields}
          itemSuggestions={itemSuggestions}
          handleSubmit={newItem => this.props.handleNewItem(newItem)}
          defaultItem={itemToEdit}
          alreadySelectedItems={items}
        />
        <MyTable
          fields={fields}
          items={items}
          totalField={totalField}
          handleItemDeletion={item => handleItemDeletion(item)}
          handleItemEdit={item => this.handleItemEdit(item)}
          menu={true}
        />
        {backButton &&
          <Button
            variant='contained'
            color='secondary'
            className={classes.buttons}
            onClick={_ => this.props.onChangePage(-1)}
          >
            <ChevronLeftIcon />
          </Button>
        }
        {nextButton &&
          <Button
            variant='contained'
            color='secondary'
            className={classes.buttons}
            onClick={_ => this.props.onChangePage(1)}
          >
            <ChevronRightIcon />
          </Button>
        }
      </div>
    );
  }
}

export default withStyles(styles)(Page);
