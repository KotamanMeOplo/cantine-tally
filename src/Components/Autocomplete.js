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
    width: '20rem',
    zIndex: 1,
    left: 'calc(50% - 10rem)'
  }
};

class Autocomplete extends Component {
  handleDownshiftChange = selection => {
    this.setState({selectedItem: selection.name});
    this.props.onChange(selection);
  }

  render() {
    const { classes, suggestions, label, value } = this.props;
    
    return (
      <Downshift
        onSelect={selection => this.handleDownshiftChange(selection)}
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
                value: value,
                onChange: e => this.props.handleChange(e),
                InputLabelProps: {shrink: true}
              })}
              label={label}
              className={classes.txtFields}
            />
            <Paper className={classes.paper} {...getMenuProps()}>
              {isOpen
                ? suggestions
                    .filter(item => inputValue && item.name.includes(inputValue))
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
