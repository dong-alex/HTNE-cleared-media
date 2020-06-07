import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, amber, red, grey} from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

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
    color: green[600],
    backgroundColor: '#FFFFFF',
  },
  neg: {
    color: red[600],
    backgroundColor: '#FFFFFF',
  },
  neu: {
    color: grey[600],
    backgroundColor: '#FFFFFF',
  },
  mix: {
    color: amber[600],
    backgroundColor: '#FFFFFF',
  }
}));

const ResultField = ({ score, magnitude }) => {

  console.log(typeof(score))
  console.log(typeof(magnitude))

  const classes = useStyles();

  const colorBarScheme = {
    pos: green,
    neu: grey,
    neg: red,
    mix: amber
  }

  const iconDisplay = {
    pos: <Avatar className={classes.pos}><SentimentVerySatisfiedIcon /></Avatar>,
    neu: <Avatar className={classes.neu}><SentimentSatisfiedIcon /></Avatar>,
    neg: <Avatar className={classes.neg}><SentimentVeryDissatisfiedIcon /></Avatar>,
    mix: <Avatar className={classes.mix}><SentimentSatisfiedIcon /></Avatar>
  }
  
  const textDisplay = {
    pos: <Typography className={classes.pos} variant="body2">Positive</Typography>,
    neu: <Typography className={classes.neu} variant="body2">Neutral</Typography>,
    neg: <Typography className={classes.neg} variant="body2">Negative</Typography>,
    mix: <Typography className={classes.mix} variant="body2">Mixed</Typography>
  }

  var finalResult
  var convertScore = Number(Math.round(score * 100) / 100).toFixed(2)

  if (convertScore < 0.3 && convertScore > -0.3 && magnitude >= 3){
    finalResult = "mix"
  } else if (convertScore < 0.3 && convertScore > -0.3){
    finalResult = "neu"
  } else if (convertScore >= 0.3) {
    finalResult = "pos"
  } else {
    finalResult = "neg"
  }

  var displayBar = convertScore != 0 ? (50 + ((convertScore/2) * 100)) : 50

  const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: colorBarScheme[finalResult][300],
    },
    barColorPrimary: {
      backgroundColor: colorBarScheme[finalResult][700],
    },
  })(LinearProgress);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {iconDisplay[finalResult]}
      </div>
      <div className={classes.score}>
        <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <ColorLinearProgress variant="determinate" value={displayBar} />
        </Box>
        <Box minWidth={35}>
          {textDisplay[finalResult]}
        </Box>
        </Box>
      </div>
    </div>
  );
}

export default ResultField;
