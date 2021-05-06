/* eslint-disable */
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, MenuItem, Menu, Link } from '@material-ui/core';
// import About from 'src/pages/About';
import { makeStyles } from '@material-ui/core/styles';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({

  title: {
    fontSize: 24,
  },

  toolbar: {
    justifyContent: 'space-between',
    marginRight: '-100px',
    
  },
  left: {
    // flex: 1,
    
  },
  // leftLinkActive: {
  //   color: theme.palette.common.white,
    
    
  // },
  right: {
    // flex: 1,
    // display: 'flex',
    // justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },


  // title: {
  //   fontSize: 24,
  //   marginLeft:'5PX',
  //   // marginLeft: '20px',
    
  // },
  // // placeholder: toolbarStyles(theme).root,
  // toolbar: {
  //   justifyContent: 'space-between',
  //   // marginRight: '20px',
  //   // marginLeft: '80px'
  // },
  // left: {
  //   // flex: 1,
   
  //   display: 'flex',
  //   // justifyContent: 'space-between',
  // },
  // leftLinkActive: {
  //   color: theme.palette.common.white,
    
  // },
  // right: {
  //   // flex: 3,
  //   display: 'flex',
  //   justifyContent: 'flex-end',
  // },
  // rightLink: {
  //   fontSize: 16,
  //   color: theme.palette.common.white,
  //   marginLeft: theme.spacing(3),
  // },
  // linkSecondary: {
  //   color: theme.palette.secondary.main,
  // },
}));

const MainNavbar = (props) => {
  const classes = useStyles();
  return (
    <div>
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <div className={classes.left} />
        
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.title}
          href="/home"
        >
          {'الرئيسية'}
        </Link>

        <Link
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.title}
          href="/about"
        >
          {'عن المنصة'}
        </Link>

         <Link
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.title}
          href="/faq"
        >
           {'أسئلة شائعة'}
        </Link>
       
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.title}
          href="/services-page"
        >
           {' خدماتنا'}
        </Link>
        
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.title}
          href="/call-us"
        >
           {' تصل بنا'}
        </Link>

        <div className={classes.right}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={classes.rightLink}
            href="/register"
          >
            {'تسجسل جديد'}
          </Link>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={classes.rightLink}
            href="/login"
          >
            {'تسجسل الدخول'}
          </Link>
        </div>
      </Toolbar>
    </AppBar>
    <div  />
  </div>
  );
};

export default MainNavbar;



// /* eslint-disable */
// import { Link as RouterLink } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, MenuItem, Menu } from '@material-ui/core';
// // import About from 'src/pages/About';
// import { makeStyles } from '@material-ui/core/styles';
// import Logo from './Logo';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// // const classes = useStyles();
// const MainNavbar = (props) => {
//   const classes = useStyles();
//   return (
//     <AppBar
//       elevation={0}
//       {...props}
//     >
//       <Toolbar sx={{ height: 64 }}>
//         <Menu
//           // anchorEl={mobileMoreAnchorEl}
//           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//           // id={mobileMenuId}
//           keepMounted
//           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           // open={isMobileMenuOpen}
//           // onClose={handleMobileMenuClose}
//         >
//           {/* <MenuItem> */}
//             <RouterLink to="/">
//               <Logo />
//             </RouterLink>
//           {/* </MenuItem> */}
//           <MenuItem>
//             <RouterLink to="/about">

//               {/* <Typography variant="h6" className={classes.title} color="inherit"> */}
//             عن المنصة
//           {/* </Typography> */}
//             </RouterLink>
//           </MenuItem>
//           <RouterLink to="/faq">
//             أسئلة شائعة
//         </RouterLink>

//           <RouterLink to="/services-page">
//             خدماتنا
//         </RouterLink>
//           <RouterLink to="/call-us">
//             اتصل بنا
//         </RouterLink>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default MainNavbar;
