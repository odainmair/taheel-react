/* eslint-disable */
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import localContext from './localContext'

const App = () => {
  const routing = useRoutes(routes);
  const [otp, setOtp] = useState(Math.floor(Math.random() * (1000000 - 100000) + 100000));
  const [ recipient, setRecipient] = useState(null);
  const [users, setUser] = useState(null);
  return (
    <localContext.Provider value={{ users,setUser,otp, setOtp, recipient, setRecipient}}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </localContext.Provider>
  );
};

export default App;