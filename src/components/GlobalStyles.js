import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%'
    },
    a: {
      textDecoration: 'none'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    '.st0': {
      fill: '00bef2'
    },
    '.custom-field label': {
      transformOrigin: 'top right',
      right: '30px',
      left: 'unset'
    },
    '.custom-label-field label': {
      transformOrigin: 'top right',
      right: '15px',
      left: 'unset'
    },
    '.custom-field fieldset': {
      textAlign: 'right'
    },
    'span.css-htszrh-MuiButton-startIcon': {
      marginLeft: '8px',
      marginRight: '-4px'
    },
    '.customGrid .MuiGrid-item': {
      paddingLeft: '0px !important'
    },
    '.custom-field .MuiSelect-icon': {
      right: 'unset',
      left: '0'
    },
    '.Mui-checked': {
      color: '#fcb712 !important'
    },
    '.google-map': {
      position: 'relative !important'
    },
    '.custom-wizard .MuiStepConnector-horizontal': {
      left: 'calc(50% + 20px)',
      right: 'calc(-50% + 20px)'
    },
    '.custom-wizard  .MuiStepIcon-completed': {
      color: '#3c8084 !important'
    },
    '.service-not-active .service-content': {
      filter: 'blur(7px)'
    },
    '.MuiCardHeader-title': {
      fontSize: '20px !important'
    }
  }
}));

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
