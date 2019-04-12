import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  core: {
    padding: '5rem 2rem 2rem 2rem'
  },
  topHeading: {
    padding: '2rem 0 0 0'
  },
  subHeading: {
    margin: '1rem 0 2rem 0'
  },
  heading: {
    margin: '2rem 0'
  },
  text: {
    margin: '1rem 0'
  }
};

class HomePage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.core}>
        <Typography variant="h2" className={classes.topHeading}>
          Βοηθός ΚΨΜ
        </Typography>
        <Typography variant="h5" className={classes.subHeading}>
          Ένα εργαλείο το οποίο θα σας σώσει χρόνο στις καταμετρήσεις αλλά και τις χρεώσεις
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Οι καταμετρήσεις είναι κάτι το οποίο ο κάθε ΚΨΜτζης θα χρειαστεί να εκτελέσει πάμπολλες φορές κατά την όλη διάρκεια της θητείας του. Η παρούσα εφαρμογή δημιουργήθηκε με σκοπό την μείωση του χρόνου και του κόπου που αναλόνωνται κατά την εκτέλεση μιας καταμέτρησης.
        </Typography>

        <Typography variant="h4" className={classes.heading}>
          Set Up
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Το μόνο βήμα που πρέπει να εκτελεστεί προτού να αρχίσετε νά χρησιμοποιήτε τον Βοηθό είναι να καταγράψετε τα άτομα που χρωστάνε(Χρεώστες) και τα προϊόντα που υπάρχουν στο ΚΨΜ μαζί με τις τιμές πώλησης και αγοράς τους. Αυτό μπορείτε να το κάνετε στις 2 σελίδες υπό την πινακίδα Set Up
        </Typography>

        <Typography variant="h4" className={classes.heading}>
          Καταμέτρηση
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          <ul>
            <li><strong>Προϊόντα: </strong>Εισάγετε τα προϊόντα και την ποσότητα τους και ο Βοηθός θα υπολογίσει αυτόματα το συνολικό ποσό.</li>
            <li><strong>Χρωστημιά: </strong>Εισάγετε το ποσό το οποίο χρωστά ο κάθε Χρεώστης και ο Βοηθός θα υπολογίσει αυτόματα το συνολικό Χρέος.</li>
            <li><strong>Ταμείο: </strong>Εισάγετε το ποσό που περιέχει το ταμείο σας ανά μονάδα μέτρησης (Μετρητά, 2 ευρώ, 1 ευρώ, 50 σεντ, 20 σεντ, 10 σεντ, 5 σεντ, 2 σεντ και 1 σεντ).</li>
            <li><strong>Αποτέλεσμα: </strong>Το αποτέλεσμα τις καταμέτρησης. Ο βοηθός θα σας παρουσιάσει το Γενικό Σύνολο όπως επείσης και καθένα από τα παραπάνω παραρτήματα αναλυτικά και μαζί με τα σύνολα τους.</li>
            <li><strong>Κατανομή Pareto: </strong>Τα χρωστημιά σε κατανομή Pareto ή  αλλιώς κατανομή 80/20. Ο νόμος 80/20 αναφέρει πως το περίπου 80% των αποτελεσμάτων προέρχεται από το περίπου 20% των προσπαθειών μας, δηλαδή σε κάθε κατάσταση οι ζωτικοί παράγοντες είναι 20%, ενώ οι επουσιώδεις 80%. Για παράδειγμα το 80% των κερδών μια επιχείρησης προέρχεται από το 20% των πελατών της ή σ'αυτήν την περίπτωση το 80% των χρωστημιών προέρχεται από το 20% των χρεωστών.</li>
          </ul>
        </Typography>

        <Typography variant="h4" className={classes.heading}>
          Χρέωση
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Απλώς εισάγετε τα προϊόντα που χρεώνεστε μαζί με την ποσότητα τους. Ο Βοηθός και πάλι θα υπολογίσει το Συνολικό κόστος.
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
