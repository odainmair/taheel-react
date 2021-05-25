/* eslint-disable */
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CreateTemporaryLicense from 'src/pages/services/temporary-license/CreateTemporaryLicense';
import CreatefinalLicense from 'src/pages/services/final-license/CreateFinalLicense';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Registration/Register';
import Settings from 'src/pages/Settings';
import OTPLogin from 'src/pages/LoginOtp';
import Home from './pages/public/Home';
import About from './pages/public/AboutUs';
import Faq from './pages/public/faq';
import Services from './pages/public/Services';
import ContactUs from './pages/public/ContactUs';

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: isLoggedIn === "" ? <Login /> : <Navigate to="/app/dashboard" />},
      { path: 'otplogin', element: <OTPLogin /> },
      { path: 'Home', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/faq', element: <Faq /> },
      { path: '/services', element: <Services /> },
      { path: '/contactus', element: <ContactUs /> },
      { path: 'register', element: isLoggedIn === "" ? <Register /> : <Navigate to="/app/dashboard" /> },
      { path: '404', element: <NotFound /> },
      {
        path: '/', element: isLoggedIn === "" ? <Navigate to="/home" /> : <Navigate to="/app/dashboard" />,
      },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app',
    element: isLoggedIn !== "" ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'services',
    element: isLoggedIn !== "" ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'survey', element: <CreateTemporaryLicense /> },
      { path: 'finallicense', element: <CreatefinalLicense /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
