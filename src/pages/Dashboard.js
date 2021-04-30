import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TotalPendingRequest from 'src/components/dashboard//TotalPendingRequest';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import TotalCenters from 'src/components/dashboard//TotalCenters';
import TotalCompletedRequest from 'src/components/dashboard//TotalCompletedRequest';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import RequestsChart from 'src/components/dashboard/RequestsChart';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    // Update the document title using the browser API
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(1000);
    setLoading(true);
  });
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalPendingRequest loading={loading} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalCompletedRequest loading={loading} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalCenters loading={loading} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalProfit sx={{ height: '100%' }} loading={loading} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestOrders />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <RequestsChart sx={{ height: '100%' }} loading={loading} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
