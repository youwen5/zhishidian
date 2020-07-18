// import React, { Fragment } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1
//   },
//   title: {
//     fontWeight: 400
//   },
//   pos: {
//     marginBottom: 12,
//   },
// }));

// export default function Post(props) {
//   const classes = useStyles();

//   return (
//     <div>
//       { props.post ? (
//         <Fragment>
//             <Card className={classes.root} variant="simple">
//             <CardContent>
//                 <Typography variant="h4" className={classes.title} component="h2">
//                 {props.post.title}
//                 </Typography>
//                 <Typography className={classes.pos} color="textSecondary">
//                 {props.post.author}
//                 </Typography>
//                 <Typography variant="body1" component="p">
//                 {props.post.content}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 <Button size="small">See More</Button>
//             </CardActions>
//             </Card>
//         </Fragment>
//       ) : null }
//     </div>
//   );
// }

import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, blue, green, cyan } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    flexGrow: 1,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    // marginRight: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  metaInfo: {
    marginRight: 'auto'
  },
  avatarRed: {
    backgroundColor: red[500],
  },
  avatarBlue: {
    backgroundColor: blue[500],
  },
  avatarGreen: {
    backgroundColor: green[500],
  },
  avatarCyan: {
    backgroundColor: cyan[500]
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setShowPreview(!showPreview);
  };

  const readingTime = (text) => {
    const wordsPerMinute = 100;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return `${readTime} minute read`;
  }

  const pfColorParser = (color) => {
    let res;

    switch(color) {
      case 'red':
        res = classes.avatarRed;
        break;
      case 'blue':
        res = classes.avatarBlue;
        break;
      case 'green':
        res = classes.avatarGreen;
        break;
      case 'cyan':
        res = classes.avatarCyan;
        break;
      default:
        res = classes.avatarBlue;
    }
    return res;
  }

  const handleSettingsClick = () => {
    props.pushNotification('info', 'Settings clicked! (placeholder)')
  }

  return (
    <div>
    { props.post ? (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="profile" className={pfColorParser(props.post.pfColor)}>
            {props.post.author[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleSettingsClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={props.post.title}
        subheader={`By: ${props.post.author}`}
      />
      <CardContent>
        <Typography variant="body2" component="p" color={showPreview ? 'textPrimary' : 'textSecondary'}>
          { props.post.content.length > 100
             ? `${props.post.content.substring(0, 100)}...`
             : props.post.content
          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <Fragment>
        <div className={classes.metaInfo}>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            { readingTime(props.post.content) }
          </Typography>
          <Typography variant="caption">
            {`Created ${props.post.date}`}
          </Typography>
        </CardContent>
        </div>
        { props.post.content.length > 100
         ? (
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"

        >
          <ExpandMoreIcon />
        </IconButton>
        ) : null }
        </Fragment>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{ props.post.content }</Typography>
        </CardContent>
      </Collapse>
    </Card>
    ) : null }
    </div>
  );
}