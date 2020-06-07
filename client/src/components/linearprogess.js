import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, yellow, red} from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import Avatar from '@material-ui/core/Avatar';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  score: {
    width: "300px"
  },
  pos: {
    color: green[500],
    backgroundColor: '#FFFFFF',
  },
  neg: {
    color: red[500],
    backgroundColor: '#FFFFFF',
  },
  neu: {
    color: yellow[500],
    backgroundColor: '#FFFFFF',
  }
}));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: green[300],
  },
  barColorPrimary: {
    backgroundColor: green[500],
  },
})(LinearProgress);

function LinearProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <ColorLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography className={classes.pos} variant="body2">{`Mixed`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularIntegration() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Avatar className={classes.pos}><InsertEmoticonIcon /></Avatar>
      </div>
      <div className={classes.score}>
      <LinearProgressWithLabel value={10} />
    </div>
    </div>
  );
}
