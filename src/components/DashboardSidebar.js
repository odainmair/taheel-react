import { useEffect } from 'react';
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
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
} from 'react-feather';
import NavItem from './NavItem';
import Logo from './Logo';

const user = {
  avatar: '/static/images/avatars/avatar_4.png',
  currentDate: '3 FEBRUARY 2020',
  name: 'عبدالله بن محمد'
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
    title: 'معلومات الشخصيه'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'الإعدادات'
  },
  {
    href: '/login',
    icon: LogoutIcon,
    title: 'تسجيل خروج'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

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
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 44,
            height: 44
          }}
          to="/app/account"
        />
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
              fontSize: 10,
              color: '#fff'
            }}
          >
            {user.currentDate}
          </Typography>
        </Box>
      </Box>
      <Divider />
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
          <Logo />
          <img
            alt="Logo"
            src="/static/logo-w.svg"
            width="100"
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
