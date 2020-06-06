import React,  { useEffect, useState } from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Search by...');
  const [radioText, setRadioText] = React.useState('Search by')

  useEffect(()=> {
    if (value === '@'){
      setHelperText(`Searching by user`);
    } else if (value === '#') {
      setHelperText(`Searching by hashtag`);
    } 
  },[value])

  const handleChangeTypeInput = (event) => {
    setValue(event.target.value);
    setError(false);
    console.log(`Changed the type: ${value}`)
    console.log(`This is helpertext: ${helperText}`)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit?!")
    if (value === '@') {
      console.log("searching by user")
    } else if (value === '#') {
      console.log("searching by hashtag")
    } else {
      setRadioText('Please select an option below.');
      setError(true);
    }
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
      padding: '10px 0px 10px 8px',
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
  
  const theme = createMuiTheme({
    palette: {
      secondary: { main: '#00acee' }, 
    },
    overrides: {
      // Style sheet name ⚛️
      MuiFormControlLabel: {
        root: {
          color: "#00acee",
        }
      }
    },
  });

  

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <h1>
        <span aria-hidden="true"></span>
        Twitter
      </h1>

        <MuiThemeProvider theme={theme}>
          <FormControl component="fieldset" error={error}>
          <FormLabel color="secondary" component="legend">{radioText}</FormLabel>
            <RadioGroup style={{display: 'flex', flexDirection: 'row'}} aria-label="searchtype" name="searchtype" value={value} onChange={handleChangeTypeInput}>
              <FormControlLabel style={{display: 'inline-block'}} value="@" control={<Radio />} label="User" />
              <FormControlLabel style={{display: 'inline-block'}} value="#" control={<Radio />} label="Hashtag" />
            </RadioGroup>
          </FormControl>
        </MuiThemeProvider>

        
          <FormControl style={{display: 'flex', flexDirection: 'row'}}>
            <InputLabel style={{display: 'inline'}} htmlFor="submitButton">{helperText}</InputLabel>
            <BootstrapInput style={{display: 'inline'}} id="submitButton" />
            <IconButton onClick={handleSubmit} style={{display: 'inline'}} color="primary" aria-label="submit" component="span">
              <TwitterIcon/>
            </IconButton>
          </FormControl>


      <h1>
        <span aria-hidden="true"></span>
        CNN
        </h1>
      <h1>
        <span aria-hidden="true"></span>
        FOX
        </h1>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;
