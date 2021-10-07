/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  LogOut as LogoutIcon,
  Monitor as BarChartIcon,
  Archive as DraftsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Home as homeIcon,
  FileText as ordersIcon,
} from 'react-feather';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { logoutUser } from 'src/utils/UserLocalStorage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import moment from 'moment-hijri';
import NavItem from './NavItem';
import Logo from './Logo';

moment.locale('ar-SA');

const user = {
  avatar: '/static/images/avatars/avatar_4.png',
  currentDate: moment().format('iYYYY iMMM iD'),
  name: 'عبدالله بن محمد',
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'لوحة البيانات'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'الخدمات'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'الملف التعريفي'
  },
  {
    href: '/app/centers',
    icon: homeIcon,
    title: 'المراكز'
  },
  {
    href: '/app/orders',
    icon: ordersIcon,
    title: 'الطلبات'
  },
  // {
  //   href: '/app/notifications',
  //   icon: UserIcon,
  //   title: 'التنبيهات'
  // },
  // {
  //   href: '/app/drafts',
  //   icon: DraftsIcon,
  //   title: 'المسودات'
  // },
  {
    href: '/login',
    icon: LogoutIcon,
    title: 'تسجيل خروج',
    onClick: () => logoutUser()
  }
];
const beneficiaryItems = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'لوحة البيانات'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'الخدمات'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'الملف التعريفي'
  },
  {
    href: '/app/orders',
    icon: ordersIcon,
    title: 'الطلبات'
  },
  // {
  //   href: '/app/notifications',
  //   icon: UserIcon,
  //   title: 'التنبيهات'
  // },
  {
    href: '/login',
    icon: LogoutIcon,
    title: 'تسجيل خروج',
    onClick: () => logoutUser()
  }
];


const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const { firstName, lastName, userType } = getCurrentUser();
  user.name = `${firstName} ${lastName}`;
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          sx={{
            cursor: 'pointer',
            width: 60,
            height: 60
          }}
          to="/app/account"
        >
          <AccountCircleIcon accentHeight={60} fontSize="large" />
        </Avatar>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: 13,
              color: '#fff',
              paddingTop: 1
            }}
          >
            {user.currentDate}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {userType === "2" && items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
          {userType === "4" && beneficiaryItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              onClick={item.onClick}
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
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="right"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 80,
              bottom: 16,
              height: 'calc(100% - 96px)',
              backgroundColor: '#214255',
              borderBottomLeftRadius: 50,
              borderTopLeftRadius: 50
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
