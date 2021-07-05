import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField
} from '@material-ui/core';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { getCenters } from './data/CentersApi';
import CentersTableComponent from './components/CentersTableComponent';

const Centers = (props) => {
  const { email } = getCurrentUser();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const getCentersDetails = await getCenters(email);
    if (!getCentersDetails.isSuccessful) {
      setLoading(false);
      response = { isSuccessful: false, message: getCentersDetails.message };
    } else {

      const { Centers } = getCentersDetails.responseBody.data;
      setLoading(true);
      setCenters(Centers)
    }
  }, []);
  console.log('loDING ++++++++++++++',loading);
  return (
    <>
      <Helmet>
        <title>Centers</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              container
              lg={12}
              md={6}
              xs={12}
              marginTop={3}
            >
              <Grid item
                lg={12}
                md={12}
                xs={12}
                marginBottom={3}
              >
                <CentersTableComponent loading={loading} centerRequests={centers} />                </Grid >
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Centers;
