import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Downshift from 'downshift';
import { TextField, Paper, MenuItem } from '@material-ui/core';

const styles = {
  txtFields: {
    width: '20rem'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0
  }
};

class Autocomplete extends Component {
  state = {
    txt: ''
  };

  handleChange = e => this.setState({txt: e.target.value});

  handleDownshiftChange = selection => {
    this.setState({txt: selection.name, selectedItem: selection.name});
    this.props.onChange(selection);
  }

  render() {
    const { classes, suggestions } = this.props;
    const { txt } = this.state;
    
    return (
      <Downshift
        onChange={selection => this.handleDownshiftChange(selection)}
        itemToString={item => (item ? item.name : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div>
            <TextField
              {...getInputProps({
                value: txt,
                onChange: this.handleChange,
                InputLabelProps: {shrink: true}
              })}
              label='Προϊόν'
              className={classes.txtFields}
            />
            <Paper className={classes.paper} {...getMenuProps()}>
              {isOpen
                ? suggestions
                    .filter(item => !inputValue || item.name.includes(inputValue))
                    .map((item, index) => (
                      <MenuItem
                        {...getItemProps({
                          key: item.name,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                      >
                        {item.name}
                      </MenuItem>
                    ))
                : null}
            </Paper>
          </div>
        )}
      </Downshift>
    );
  }
}

export default withStyles(styles)(Autocomplete);
