import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MyTable from '../MyTable';
import MyForm from '../MyForm';

const styles = {
  core: {
    padding: '5rem 0 5rem 0'
  }
};

class SetUpPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.core}>
        <MyForm fields={this.props.fields} handleSubmit={item => this.props.handleNewSetUpItem(item)} />
        <MyTable fields={this.props.fields} data={this.props.data} />
      </div>
    );
  }
}

export default withStyles(styles)(SetUpPage);
