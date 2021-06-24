/* eslint-disable */
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import localContext from './localContext';
import { getCurrentUser } from 'src/utils/UserLocalStorage';

const App = () => {
  const isLoggedIn = getCurrentUser().firstName
  console.log('isLoggedIn',isLoggedIn)
  const routing = useRoutes(routes(isLoggedIn));
  const [otp, setOtp] = useState(Math.floor(Math.random() * (1000000 - 100000) + 100000));
  const [ recipient, setRecipient] = useState(null);
  const [users, setUser] = useState(null);
  const [documents, SetDocuments] = useState({requirements:{}, healthServices:{}, staff:{}})
  // const [finalLicenseDetails, SetFinalLicenseDetails ] = useState({companyName:null, Capacity:null, FinancialGuarantee:null})
  const [finalLicenseDetails, SetFinalLicenseDetails ] = useState({})


  return (
    <localContext.Provider value={{ users,setUser,otp, setOtp, recipient, setRecipient,documents, SetDocuments, finalLicenseDetails, SetFinalLicenseDetails}}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </localContext.Provider>
  );
};

export default App;