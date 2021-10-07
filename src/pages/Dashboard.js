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
  const { userType } = getCurrentUser();
  console.log('userType+++++++++++', userType);

  const getTaheelRequestsFun = async (userEmail) => {
    const url = 'taheel-apis-records-getRequests-v2';
    const queryParams = { userEmail, startIndex: 1, batchSize: 5 };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const getCentersFun = async (userEmail) => {
    const url = 'taheel-apis-records-getCenters-v2';
    const queryParams = { userEmail, startIndex: 1, batchSize: 5 };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const getMyTasksFun = async (userEmail) => {
    const url = 'taheel-apis-utilities-GetGetExternalUserTasks-v2';
    const queryParams = { userEmail, taskStatus: 0 };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const [loadingTaheelRequests, setLoadingTaheelRequests] = useState(false);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [loadingMyTasks, setLoadingMyTasks] = useState(false);


  const [taheelRequests, setTaheelRequests] = useState([]);
  const [taskRequests, setTaskRequests] = useState([]);
  const [centerRequests, setCenterRequests] = useState([]);
  const [totalPendingRequests, setTotalPendingRequests] = useState(0);
  const [totalCompletedRequests, setTotalCompletedRequests] = useState(0);
  const [totalRejectedRequests, setTotalRejectedRequests] = useState(0);
  const [totalTahelRequests, setTotalTahelRequests] = useState(0);
  const [totalReturnRequests, setTotalReturnRequests] = useState(0);
  const [totalCenters, setTotalCenters] = useState(0);
  const { email } = getCurrentUser();
  useEffect(async () => {

    const getTaheelRequestsRs = await getTaheelRequestsFun(email);
    let response = {};
    if (!getTaheelRequestsRs.isSuccessful) {
      setLoadingTaheelRequests(true);
      response = { isSuccessful: false, message: getTaheelRequestsRs.message };
    } else {
      const { requests, totalCount, totalAccepted, totalPending, totalRejected } = getTaheelRequestsRs.responseBody.data;
      console.log(JSON.stringify(requests));
      setTaheelRequests(requests);
      setTotalTahelRequests(totalCount);
      setTotalCompletedRequests(totalAccepted);
      setTotalRejectedRequests(totalRejected);
      setTotalPendingRequests(totalPending);
      setLoadingTaheelRequests(true)
    }

    return response;
  }, []);
  useEffect(async () => {
    let response = {};
    const getCentersRs = await getCentersFun(email);
    if (!getCentersRs.isSuccessful) {
      setLoadingCenters(true);
      response = { isSuccessful: false, message: getCentersRs.message };
    } else {
      const { Centers, totalCount } = getCentersRs.responseBody.data;
      setTotalCenters(totalCount);
      setCenterRequests(Centers);
      setLoadingCenters(true)
    }
  }, []);
  useEffect(async () => {
    const getMyTasksRs = await getMyTasksFun(email);
    let response = {};
    if (!getMyTasksRs.isSuccessful) {
      setLoadingMyTasks(true);
      response = { isSuccessful: false, message: getMyTasksRs.message };
    } else {
      const { data } = getMyTasksRs.responseBody;
      console.log(JSON.stringify(data));
      setTaskRequests(data);
      setTotalReturnRequests(data.totalCount)
      setLoadingMyTasks(true);
    }
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
              <TotalCenters loading={loadingCenters} totalcenters={totalCenters} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalCompletedRequest loading={loadingTaheelRequests} totalcompletedrequests={totalCompletedRequests} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalPendingRequest loading={loadingTaheelRequests} totalpendingrequests={totalPendingRequests} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalProfit sx={{ height: '100%' }} loading={loadingMyTasks} totalreturnrequests={totalRejectedRequests} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestRequests loading={loadingTaheelRequests} taheelRequests={taheelRequests} />
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
                loading={loadingTaheelRequests}
                totalcompletedrequests={totalCompletedRequests}
                totalpendingrequests={totalPendingRequests}
                totalrejectedrequests={totalRejectedRequests}
                totaltahelrequests={totalTahelRequests}
              />
            </Grid>
            {userType === "2" &&
              <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
              >
                <CentersTable loading={loadingCenters} centerRequests={centerRequests} />
              </Grid>
            }
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <MyTasksTable loading={loadingMyTasks} taskRequests={taskRequests} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
