import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function AlertBase(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Alert(props) {
  const classes = useStyles();
//   const [open, setOpen] = React.useState(props.isOpen);

  const handleClose = (event, reason) => {
    // setOpen(false);
    props.onClose();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.isOpen} onClose={handleClose} autoHideDuration={props.autoHide}>
        <AlertBase onClose={handleClose} children={props.children} severity={props.severity} />
      </Snackbar>
    </div>
  );
}
// import React from 'react';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
// import { makeStyles } from '@material-ui/core/styles';

// function AlertBase(props) {
//   return <MuiAlert elevation={6} variant="filled" text={props.text} />;
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export default function Alert(props) {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(props.isOpen);

//   const handleClose = (event, reason) => {
//     props.onClose();
//     console.log(open);
//     setOpen(false);
//   };

//   return (
//     <div className={classes.root}>
//       <Snackbar open={props.isOpen} autoHideDuration={props.autoHide} onClose={handleClose} text='test' >
//         <AlertBase text={props.text} />
//       </Snackbar>
//     </div>
//   );
// }
