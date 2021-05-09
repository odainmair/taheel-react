/* eslint-disable */
import { useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Drawer,
  Hidden,
  List,
  Toolbar,
  AppBar,
  Grid,
  Typography
} from '@material-ui/core';
import NavItem from './NavItem';

const styles = makeStyles((theme) => ({
  title: {
    fontSize: 12,

    marginLeft: theme.spacing(2)
  },

  toolbar: {
    justifyContent: 'space-between',
    display: 'inline',

  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 12,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },

}));

const MainNavbar = ({ onMobileClose, openMobile }) => {
  const classes = styles();
  const location = useLocation();
  const items = [
    {
      href: '/home',
      title: 'الرئيسية',
      side: true,
    },
    {
      href: '/about',
      title: 'عن المنصة',
      side: true,
    },
    {
      href: '/faq',
      title: 'أسئلة شائعة',
      side: true,
    },
    {
      href: '/services-page',
      title: 'خدماتنا',
      side: true,
    },
    {
      href: '/call-us',
      title: 'اتصل بنا',
      side: true,
    },
    {
      href: '/register',
      title: 'تسجيل جديد',
      side: false,
    },
    {
      href: '/login',
      title: 'تسجيل الدخول',
      side: false,
    }
  ];

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const list = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1, }} />
      <Box
        sx={{
          backgroundColor: '#103145',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/static/Taheel_logo-footer.png"
            width="200"
          />
        </RouterLink>
        <Typography
          align="center"
          variant="body2"
          sx={{
            fontSize: 10,
            color: '#CCC',
            paddingTop: 2
          }}
        >
          جميع الحقوق محفوظة
          © 2021
      </Typography>
      </Box>
    </Box>

  );

  const toolbar = (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Grid container className={classes.left} spacing={1}>
          {items.filter(item => item.side).map(element => (
            <Grid item l={2} >
              <NavItem
                className={classes.title}
                href={element.href}
                key={element.title}
                title={element.title}
              />
            </Grid>
          ))
          }
        </Grid>

        <Grid className={classes.right} spacing={1}>
          {items.filter(item => !item.side).map(element => (
            <Grid item l={2} >
              <NavItem
                className={classes.rightLink}
                href={element.href}
                key={element.title}
                title={element.title}
              />
            </Grid>
          ))
          }
        </Grid>
      </Toolbar>
    </AppBar>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="right"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
              backgroundColor: '#214255',
            }
          }}
        >
          {list}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        {toolbar}
      </Hidden>
    </>
  );
};

MainNavbar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

MainNavbar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default MainNavbar;











// /* eslint-disable */
// import { Link as RouterLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { AppBar, Toolbar , Typography, MenuItem, Menu, Link, IconButton,FormGroup,FormControlLabel ,Switch, Drawer   } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import React, { useState, useEffect } from "react";

// import Logo from './Logo';

// const styles  = makeStyles((theme) => ({
//   title: {
//     fontSize: 12,
//   },
//   // placeholder: toolbarStyles(theme).root,
//   toolbar: {
//     justifyContent: 'space-between',
//   },
//   left: {
//     flex: 1,
//   },
//   leftLinkActive: {
//     color: theme.palette.common.white,
//   },
//   right: {
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'flex-end',
//   },
//   rightLink: {
//     fontSize: 16,
//     color: theme.palette.common.white,
//     marginLeft: theme.spacing(3),
//   },
//   linkSecondary: {
//     color: theme.palette.secondary.main,
//   },

//   menuButton: {
//     marginRight: theme.spacing(2),

//   },

// }));

// const MainNavbar = (props) => {
//   const classes = styles();
//   const getDrawerChoices = () => {
//     return 
//     [1,].map(({ label, href }) => {
//       return
//        (
//         <Link
//           {...{
//             component: RouterLink,
//             to: href,
//             color: "inherit",
//             style: { textDecoration: "none" },
//             key: label,
//           }}
//         >
//           <MenuItem>{label}</MenuItem>
//         </Link>
//       );
//     }
//     );
//   };
//   // const displayMobile = () => {
//     const handleDrawerOpen = () =>
//       setState((prevState) => ({ ...prevState, drawerOpen: true }));
//     const handleDrawerClose = () =>
//       setState((prevState) => ({ ...prevState, drawerOpen: false }));
//   // }
//     const [state, setState] = useState({
//       mobileView: false,
//       drawerOpen: false
//     });
//   const { mobileView, drawerOpen } = state;


//   return (

//     <div>
//       <AppBar position="fixed">
//         <Toolbar className={classes.toolbar}>
//         <IconButton     
//         {...{
//           edge: "start",
//           color: "inherit",
//           "aria-label": "menu",
//           "aria-haspopup": "true",
//           onClick:handleDrawerOpen,
//         }}
//             >
//             <MenuIcon />
//           </IconButton>
//           <Drawer
//           {...{
//             anchor: "left",
//             open: drawerOpen,
//             onClose: handleDrawerClose,
//           }}
//         >
//           <div>{getDrawerChoices()}</div>
//         </Drawer>
//           <div className={classes.left} >

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/home"
//             >
//               {'الرئيسية'}
//             </IconButton>

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/about"
//             >
//               {'عن المنصة'}
//             </IconButton>

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/faq"
//             >
//               {'أسئلة شائعة'}
//             </IconButton>

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/services-page"
//             >
//               {' خدماتنا'}
//             </IconButton>

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/call-us"
//             >
//               {' تصل بنا'}
//             </IconButton>
//           </div>
//           <div className={classes.right}>
//             <IconButton
//               color="inherit"
//               variant="h6"
//               underline="none"
//               className={classes.rightLink}
//               href="/register"
//             >
//               {'تسجيل جديد'}
//             </IconButton>
//             <IconButton
//               color="inherit"
//               variant="h6"
//               underline="none"
//               className={classes.rightLink}
//               href="/login"
//             >
//               {'تسجيل الدخول'}
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//        {/* <div /> */}
//     </div>
//   );
// };

// // MainNavbar.propTypes = {
// //   classes: PropTypes.object.isRequired,
// // };

// export default MainNavbar;
// // export default withStyles(styles)(MainNavbar);





// *******************************************************************


// /* eslint-disable */
// import { Link as RouterLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { AppBar, Toolbar , Typography, MenuItem, Menu, Link, IconButton } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';

// import Logo from './Logo';

// const styles  = makeStyles((theme) => ({
//   title: {
//     fontSize: 12,
//   },
//   // placeholder: toolbarStyles(theme).root,
//   toolbar: {
//     justifyContent: 'space-between',
//   },
//   left: {
//     flex: 1,
//   },
//   leftLinkActive: {
//     color: theme.palette.common.white,
//   },
//   right: {
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'flex-end',
//   },
//   rightLink: {
//     fontSize: 16,
//     color: theme.palette.common.white,
//     marginLeft: theme.spacing(3),
//   },
//   linkSecondary: {
//     color: theme.palette.secondary.main,
//   },

// }));

// const MainNavbar = (props) => {
//   const classes = styles();
//   return (
//     <div>
//       <AppBar position="fixed">
//         <Toolbar className={classes.toolbar}>
//         <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <div className={classes.left} >

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/home"
//             >
//               {'الرئيسية'}
//             </IconButton>

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/about"
//             >
//               {'عن المنصة'}
//             </IconButton>

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/faq"
//             >
//               {'أسئلة شائعة'}
//             </IconButton>

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/services-page"
//             >
//               {' خدماتنا'}
//             </IconButton>

//             <IconButton
//               variant="h6"
//               underline="none"
//               color="inherit"
//               className={classes.title}
//               href="/call-us"
//             >
//               {' تصل بنا'}
//             </IconButton>
//           </div>
//           <div className={classes.right}>
//             <IconButton
//               color="inherit"
//               variant="h6"
//               underline="none"
//               className={classes.rightLink}
//               href="/register"
//             >
//               {'تسجيل جديد'}
//             </IconButton>
//             <IconButton
//               color="inherit"
//               variant="h6"
//               underline="none"
//               className={classes.rightLink}
//               href="/login"
//             >
//               {'تسجيل الدخول'}
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//        {/* <div /> */}
//     </div>
//   );
// };

// MainNavbar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// // export default MainNavbar;
// export default withStyles(styles)(MainNavbar);
