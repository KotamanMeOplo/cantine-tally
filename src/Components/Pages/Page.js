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
  render() {
    const { classes, fields, itemSuggestions, items, totalField, handleItemDeletion } = this.props;

    return (
      <div className={classes.core}>
        <MyForm
          fields={fields}
          itemSuggestions={itemSuggestions}
          handleSubmit={newItem => this.props.handleNewItem(newItem)}
        />
        <MyTable
          fields={fields}
          items={items}
          totalField={totalField}
          handleItemDeletion={item => handleItemDeletion(item)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Page);
