import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';

const styles = {
  list: {
    width: '300px'
  },
  drawerHeader: {
    padding: '19px 24px',
    display: 'flex',
    alignItems: 'center'
  }
}

class MyDialog extends Component {
  state = {
    
  };

  handleChange = (e, field) => {
    this.setState({[field]: e.target.value})
  }

  render() {
    const { classes } = this.props;
    const fields = Object.keys(this.props.fields).map(a => this.props.fields[a]);

    return (
      <div>
        <Dialog open={this.props.dialogOpen} onClose={this.props.handleDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle aria-label="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            {this.props.children}
          </DialogContent>
          {fields.map(a => (
            <TextField
              label={a.field}
              margin="dense"
              value={this.state[a.field]}
              onChange={e => this.handleChange(e, a.field)}
            />
          ))}
          <DialogActions>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(MyDialog);
