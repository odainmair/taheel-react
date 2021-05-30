import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TotalPendingRequest from 'src/components/dashboard//TotalPendingRequest';
import LatestRequests from 'src/components/dashboard/LatestRequest';
import TotalCenters from 'src/components/dashboard//TotalCenters';
import TotalCompletedRequest from 'src/components/dashboard//TotalCompletedRequest';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import RequestsChart from 'src/components/dashboard/RequestsChart';
import { APIRequest } from 'src/api/APIRequest';
import CentersTable from 'src/components/dashboard/CentersTable';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import MyTasksTable from 'src/components/dashboard/MyTasksTable';

const Dashboard = () => {
  const getTaheelRequestsFun = async (userEmail) => {
    const url = 'taheel-apis-records-getRequests-v2';
    const queryParams = { userEmail };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const getCentersFun = async (userEmail) => {
    const url = 'taheel-apis-records-getCenters-v2';
    const queryParams = { userEmail };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const getMyTasksFun = async (userEmail) => {
    const url = 'taheel-apis-utilities-GetGetExternalUserTasks-v2';
    const queryParams = { userEmail:"ahmad.albuthom@inspirejo.com", taskStatus:0 };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const [loading, setLoading] = useState(false);
  const [taheelRequests, setTaheelRequests] = useState([]);
  const [taskRequests, setTaskRequests] = useState([{
    "processID": 268457657,
    "status": 0,
    "centerLicenceNumber": "0101020029",
    "requestNum": "CNTR-REQ-0119",
    "userEmail": "ahmad.albuthom@inspirejo.com",
    "name": "مراجعة طلب رقم CNTR-REQ-0119",
    "ID": 8
  }]);
  const [centerRequests, setCenterRequests] = useState([]);
  const [totalPendingRequests, setTotalPendingRequests] = useState(0);
  const [totalCompletedRequests, setTotalCompletedRequests] = useState(0);
  const [totalRejectedRequests, setTotalRejectedRequests] = useState(0);
  const [totalTahelRequests, setTotalTahelRequests] = useState(0);
  const [totalReturnRequests, setTotalReturnRequests] = useState(0);
  const [totalCenters, setTotalCenters] = useState(0);

  useEffect(async () => {
    // Update the document title using the browser API
    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await sleep(1000); odai odaio
    const { email } = getCurrentUser();
    const getTaheelRequestsRs = await getTaheelRequestsFun(email);
    let response = {};
    if (!getTaheelRequestsRs.isSuccessful) {
      setLoading(true);
      response = { isSuccessful: false, message: getTaheelRequestsRs.message };
    } else {
      const { data } = getTaheelRequestsRs.responseBody;
      console.log(JSON.stringify(data));
      setTaheelRequests(data);
      setTotalTahelRequests(data.length);
      setTotalCompletedRequests(data.filter((request) => request.status === -1).length);
      setTotalRejectedRequests(data.filter((request) => request.status === -2).length);
      setTotalPendingRequests(data.filter((request) => request.status !== -1 && request.status !== -2).length);
    }

    const getCentersRs = await getCentersFun(email);
    if (!getCentersRs.isSuccessful) {
      setLoading(true);
      response = { isSuccessful: false, message: getCentersRs.message };
    } else {
      const { Centers } = getCentersRs.responseBody.data;
      setTotalCenters(Centers.length);
      setCenterRequests(Centers);
    }
    const getMyTasksRs = await getMyTasksFun(email);
    if (!getMyTasksRs.isSuccessful) {
      setLoading(true);
      response = { isSuccessful: false, message: getMyTasksRs.message };
    } else {
      const { data } = getMyTasksRs.responseBody;
      console.log(JSON.stringify(data));
      setTaskRequests(data);
      setTotalReturnRequests(data.length)
      setLoading(true);
    }
    return response;
  }, []);
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
              <TotalCenters loading={loading} totalcenters={totalCenters} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalCompletedRequest loading={loading} totalcompletedrequests={totalCompletedRequests} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalPendingRequest loading={loading} totalpendingrequests={totalPendingRequests} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalProfit sx={{ height: '100%' }} loading={loading} totalreturnrequests={totalReturnRequests} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestRequests loading={loading} taheelRequests={taheelRequests} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <RequestsChart
                sx={{ height: '100%' }}
                loading={loading}
                totalcompletedrequests={totalCompletedRequests}
                totalpendingrequests={totalPendingRequests}
                totalrejectedrequests={totalRejectedRequests}
                totaltahelrequests={totalTahelRequests}
              />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <CentersTable loading={loading} centerRequests={centerRequests} />  
            </Grid>
            <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <MyTasksTable loading={loading} taskRequests={taskRequests} />
              </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
