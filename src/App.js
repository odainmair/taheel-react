import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import localContext from 'src/localContext'
import { useState } from 'react';

const App = () => {
  const routing = useRoutes(routes);
  const [users, setUser] = useState(null);

  return (
    <localContext.Provider value={{ users, setUser }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </localContext.Provider>
  );
};

export default App;
