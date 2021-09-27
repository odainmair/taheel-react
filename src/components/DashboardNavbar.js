import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'src/Core/Contexts/MainMenu.css'
import {
  AppBar,
  Badge,
  Grid,
  Box,
  Hidden,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import { logoutUser } from 'src/utils/UserLocalStorage';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Logo from './Logo';
import { APIRequest } from 'src/api/APIRequest';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const useStyles = makeStyles({
    cardHovered: {
      background: "white",
      '&:hover': {
        background: "lightBlue",
        cursor: "pointer"
      },
    },
  });
  const classes = useStyles()
  const [allNotif, setAllNotif] = useState([]);
  const [unreadNotif, setUnreadNotif] = useState(0);
  const getNotifications = async (email) => {
    const url = 'taheel-apis-utilities-get-web-notifications';
    const queryParams = { email, "in": "query", "schema": { "type": "string" } };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  useEffect(async () => {
    const { email } = getCurrentUser()
    const notifications = await getNotifications(email)
    if (notifications.isSuccessful) {
      console.log("notifications --> ", notifications.responseBody.data.content)
      setAllNotif(notifications?.responseBody?.data?.content)
      setUnreadNotif(notifications?.responseBody?.data?.content?.filter(notif => !notif.isRead)?.length)
    }
  }, []);

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <PopupState variant="popover" popupId="demo-popup-menu" classes={{ maxWidth: '100px' }} class="hideBar">
            {(popupState) => (
              <React.Fragment>
                <IconButton color="inherit" {...bindTrigger(popupState)}>
                  <Badge
                    badgeContent={unreadNotif}
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Menu {...bindMenu(popupState)} dense={true} >
                  <Card sx={{ maxWidth: 345, borderColor: 'white' }}>
                    <CardHeader style={{ position: 'fixed', zIndex: '1', background: 'white', width: '345px' }}
                      avatar={
                        <>
                          <Avatar
                            sx={{
                              backgroundColor: '#103145',
                            }}
                          >
                            <NotificationsIcon />
                          </Avatar>
                        </>
                      }
                      action={
                        <IconButton aria-label="settings" color="primary">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={<Grid item style={{ paddingRight: "20px" }}>{"التنبيهات"}</Grid>}
                    />
                    <CardContent onClick={popupState.close} style={{ paddingTop: '75px' }}>
                      <List dense={true}  >
                        {allNotif.map((notif, idx) =>
                          <>
                            <ListItem className={classes.cardHovered} onClick={() => { notif.isRead = true; }}>
                              {!notif.isRead ? <FiberManualRecordIcon fontSize="small" /> : ''}
                              <ListItemAvatar>
                                <Avatar>
                                  <ImageIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={notif.content} secondary={notif.date} />
                            </ListItem>
                            <Divider component="li" />
                          </>
                        )}
                      </List>
                    </CardContent>
                  </Card>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>


          {/* <IconButton color="inherit" onClick={() => { logoutUser(); }}>
            <InputIcon />
          </IconButton> */}
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar >
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
