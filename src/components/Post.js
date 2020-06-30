import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Post(props) {
  const classes = useStyles();

  return (
    <div>
      { props.post ? (
        <Fragment>
            <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                test title
                </Typography>
                <Typography variant="h5" component="h2">
                test text
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                test text 2
                </Typography>
                <Typography variant="body2" component="p">
                test text 3
                <br />
                test
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        </Fragment>
      ) : null }
    </div>
  );
}