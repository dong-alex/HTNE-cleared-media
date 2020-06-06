import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';


const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  const [twitterType, setTwitterType] = React.useState('');

  const handleChange = (event) => {
    setTwitterType(event.target.value);
    console.log(twitterType)
  };

  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        Twitter
      </a>
      <FormControl>
        <InputLabel id="demo-simple-select-helper-label">Twitter Search Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={twitterType}
          onChange={handleChange}
        >
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Hashtag">Hashtag</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
      <InputLabel htmlFor="demo-customized-textbox">Search Term</InputLabel>
      <BootstrapInput id="demo-customized-textbox" />
      </FormControl>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        CNN
        </a>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        FOX
        </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;
