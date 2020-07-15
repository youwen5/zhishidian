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
                <Typography variant="h5" component="h2">
                {props.post.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                {props.post.author}
                </Typography>
                <Typography variant="body2" component="p">
                {props.post.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">See More</Button>
            </CardActions>
            </Card>
        </Fragment>
      ) : null }
    </div>
  );
}