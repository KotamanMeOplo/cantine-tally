import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MyTable from '../MyTable';
import MyForm from '../MyForm';
import MyDialog from '../MyDialog';

const styles = {
  core: {
    padding: '5rem 0 5rem 0'
  },
  fab: {
    position: 'fixed',
    right: '1rem',
    bottom: '2rem'
  }
};

class SetUpPage extends Component {
  state = {
    dialogOpen: false
  };
  
  handleDialogOpen = () => this.setState({dialogOpen: true});
  handleDialogClose = () => this.setState({dialogOpen: false});
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.core}>
        <MyForm fields={this.props.fields} handleSubmit={item => this.props.handleNewSetUpItem(item)} />
        <MyTable fields={this.props.fields} data={this.props.data} />
        {/* <Button variant="fab" color="secondary" aria-label="Add" className={classes.fab} onClick={this.handleDialogOpen}>
          <AddIcon />
        </Button>
        <MyDialog
          title="Hello World"
          fields={this.props.fields}
          dialogOpen={this.state.dialogOpen}
          handleDialogClose={this.handleDialogClose}>
          Enter a new item mate
        </MyDialog> */}
      </div>
    );
  }
}

export default withStyles(styles)(SetUpPage);
