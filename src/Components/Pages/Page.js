import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MyForm from '../MyForm';
import MyTable from '../MyTable';

const styles = {
  core: {
    padding: '5rem 0 5rem 0'
  },
  form: {
    textAlign: 'center'
  },
  txtFields: {
    width: '20rem'
  },
  formChildren: {
    margin: '.5rem'
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
    const { classes, fields, itemSuggestions, items, totalField, handleItemDeletion } = this.props;
    const { itemToEdit } = this.state;

    return (
      <div className={classes.core}>
        <MyForm
          fields={fields}
          itemSuggestions={itemSuggestions}
          handleSubmit={newItem => this.props.handleNewItem(newItem)}
          defaultItem={itemToEdit}
        />
        <MyTable
          fields={fields}
          items={items}
          totalField={totalField}
          handleItemDeletion={item => handleItemDeletion(item)}
          handleItemEdit={item => this.handleItemEdit(item)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Page);
