import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableCell, TableRow, Typography, Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import EditIcon from '@material-ui/icons/Edit'
import { owers8020Fields, roundNumToNumOfDecimals } from '../../helpers';

const styles = {
  core: {
    padding: '5rem 0 5rem 0'
  },
  divChildren: {
    margin: '3rem 2rem 0rem 3rem'
  },
  txt: {
    margin: '3rem 2rem 0 3rem'
  },
  buttonContainer: {
    textAlign: 'center',
    margin: '1rem'
  },
  buttons: {
    margin: '.5rem'
  }
};

class Tally8020Page extends Component {
  render() {
    const { classes, tallyOwers, setUpOwers } = this.props;
    let items;
    let txt;
    let debtSum = 0;

    if(setUpOwers.length > 0) {
      debtSum = tallyOwers.reduce((pre, cur) => pre + cur.amount, 0);

      const owersNotInTallyOwers = setUpOwers
        .filter(a => tallyOwers.filter(b => b.name === a.name).length === 0)
        .map(a => ({
          name: a.name,
          amount: 0
        }));
      const owers = tallyOwers.concat(owersNotInTallyOwers);
      items = owers.map((a, i) => {
        a.index = i + 1;
        
        if(debtSum === 0) {
          a.percentage = '-';
          a.collectivePercentage = '-';
        } else {
          a.percentage = a.amount * 100 / debtSum;

          if(i === 0) {
            a.collectivePercentage = a.percentage;
            a.collectiveSum = a.amount;
          } else {
            a.collectivePercentage  = owers[i - 1].collectivePercentage + a.percentage;
            a.collectiveSum  = owers[i - 1].collectiveSum + a.amount;
          }
        }

        return a;
      });

      const owerColletivePercentageClosestTo80 = owers.reduce((pr, cur) => {
        if(Math.abs(cur.collectivePercentage - 80) < Math.abs(pr.collectivePercentage - 80)) {
          return cur;
        } else {
          return pr;
        }
      });
      const owersPercentage = owerColletivePercentageClosestTo80.index * 100 / owers.length;

      // The text that will be shown under the heading of the page.
      txt = `Συνολικό Χρέος: €${debtSum}\n
      Κατανομή Pareto: ${roundNumToNumOfDecimals(owerColletivePercentageClosestTo80.collectivePercentage, 0) || 0}/${roundNumToNumOfDecimals(owersPercentage, 0)}.\n
      ${owerColletivePercentageClosestTo80.index} άτομα χρωστάνε €${roundNumToNumOfDecimals(owerColletivePercentageClosestTo80.collectiveSum, 2)}`;
    } else {
      items = [];
      txt = '';
    }

    return (
      <div className={classes.core}>
        <Typography variant="h4" className={classes.divChildren}>Κατανομή Pareto</Typography>
        <div className={classes.txt}>
          { debtSum > 0 ? txt.split('\n').map(a => (
            <Typography variant="subtitle1">
              {a}
            </Typography>
          )) : ''}
        </div>
        <Typography variant="h5" className={classes.divChildren}>Χρωστημιά</Typography>
        <Table padding="checkbox">
          <TableHead>
            <TableRow>
              {owers8020Fields.map((a, i) => 
                <TableCell
                  key={i}
                >
                  {a.field}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow key={i}>
                {
                  owers8020Fields.map((field, j) => {
                    let contents = item[field.prop];
                    
                    if(field.shouldRound && contents !== '-') {
                      contents = roundNumToNumOfDecimals(contents, 2);
                    }

                    if(field.prop === 'amount') {
                        contents = '€' + contents;
                    }
                    if((field.prop === 'percentage' || field.prop === 'collectivePercentage') && contents !== '-') {
                        contents += '%';  
                    }

                    return (
                      <TableCell
                        className={items.length !== i + 1 ? classes.cell : ''}
                        key={j}
                      >
                        {contents}
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className={classes.buttonContainer}>
          <Button
              className={classes.buttons}
              variant='contained'
              color='secondary'
              onClick={_ => this.props.onChangePage(null, -1)}
            >
              <ChevronLeftIcon />
            </Button>
          <br />
          <Button
            className={classes.buttons}
            variant='contained'
            color='secondary'
            onClick={_ => this.props.onChangePage('Καταμέτρηση > Χρωστημιά', 0)}
          >
            <EditIcon />
            ΕΠΕΞΕΡΓΑΣΙΑ ΧΡΩΣΤΗΜΙΩΝ
          </Button>
          </div>
      </div>
    );
  }
}

export default withStyles(styles)(Tally8020Page);
