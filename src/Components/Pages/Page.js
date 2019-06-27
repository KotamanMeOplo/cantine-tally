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
    const {
      classes,
      fields,
      itemSuggestions,
      items,
      totalField,
      handleItemDeletion,
      handleDeletionAll,
      nextButton,
      backButton,
      pageIndex
    } = this.props;
    const { itemToEdit } = this.state;

    const pages = [
      'ΠΡΟΪΟΝΤΑ',
      'ΧΡΕΩΣΤΕΣ',
      'ΠΡΟΪΟΝΤΑ',
      'ΧΡΕΏΣΤΕΣ',
      'ΤΑΜΕΙΟ',
      'ΑΠΟΤΕΛΕΣΜΑ'
    ];

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
          handleDeletionAll={handleDeletionAll}
          dialog={true}
        />
        {backButton &&
          <Button
            variant='contained'
            color='secondary'
            className={classes.buttons}
            onClick={_ => this.props.onChangePage(-1)}
          >
            <ChevronLeftIcon />
            { pages[pageIndex - 1] }
          </Button>
        }
        {nextButton &&
          <Button
            variant='contained'
            color='secondary'
            className={classes.buttons}
            onClick={_ => this.props.onChangePage(1)}
          >
            { pages[pageIndex + 1] }
            <ChevronRightIcon />
          </Button>
        }
      </div>
    );
  }
}

export default withStyles(styles)(Page);
