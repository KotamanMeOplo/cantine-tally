import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider, Collapse } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

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

class MyAppBar extends Component {
  state = {
    drawerOpen: false,
    setUpOpen: false,
    tallyOpen: false
  };

  handleDrawerOpen = () => this.setState({drawerOpen: true});

  handleDrawerClose = () => this.setState({
    drawerOpen: false,
    setUpOpen: false,
    tallyOpen: false
  });

  handleChoiceClicked = page => {
    this.handleDrawerClose();
    this.props.handlePageChange(page);
  }

  toggleExpandable = expandable => {
    const closedExpandables = Object.keys(this.state).filter(a => a !== 'drawerOpen' && a !== expandable + 'Open');
    
    this.setState({
      [expandable + 'Open']: !this.state[expandable + 'Open'],
      [[...closedExpandables]]: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="fixed" color="primary">
          <Toolbar>          
            <IconButton color="inherit" aria-label="Open Drawer" onClick={this.handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              {this.props.page}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          variant="temporary"
          open={this.state.drawerOpen}
          onClose={this.handleDrawerClose}
        >
          <div className={classes.list}>
            <div className={classes.drawerHeader}>
              <Typography variant="h6">
                Βοηθός - ΚΨΜ
              </Typography>
            </div>
            <Divider />
            <List>
              <ListItem button onClick={_ => this.handleChoiceClicked('Αρχική')}>
                  <ListItemText primary="Αρχική" />
              </ListItem>
              <ListItem button onClick={_ => this.toggleExpandable('setUp')}>
                <ListItemText primary="Set Up" />
                {this.state.setUpOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.setUpOpen}>
                <List>
                  {['Προϊόντα', 'Χρεώστες'].map(a => (
                    <ListItem button key={a} onClick={_ => this.handleChoiceClicked('Set Up > ' + a)}>
                      <ListItemText inset primary={a} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <ListItem button onClick={_ => this.toggleExpandable('tally')}>
                <ListItemText primary="Καταμέτρηση" />
                {this.state.tallyOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.tallyOpen}>
                <List>
                  {['Προϊόντα', 'Χρωστημιά', 'Ταμείο', 'Αποτέλεσμα'].map(a => (
                    <ListItem button key={a} onClick={_ => this.handleChoiceClicked('Καταμέτρηση > ' + a)}>
                      <ListItemText inset primary={a} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <ListItem button onClick={_ => this.handleChoiceClicked('Χρέωση')}>
                  <ListItemText primary="Χρέωση" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(MyAppBar);
