import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LatestDraft from 'src/components/drafts/LatestDraft';
import { APIRequest } from 'src/api/APIRequest';
import { getCurrentUser } from 'src/utils/UserLocalStorage';

const Drafts = () => {
  const getDrafts = async (userEmail) => {
    const url = 'taheel-apis-records-getRequests-v2';
    const queryParams = { userEmail, status:4 };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const [loading, setLoading] = useState(false);
  const [taheelRequests, setTaheelRequests] = useState([]);

  useEffect(async () => {
    const { email } = getCurrentUser();
    const getTaheelRequestsRs = await getDrafts(email);
    let response = {};
    if (!getTaheelRequestsRs.isSuccessful) {
      setLoading(true);
      response = { isSuccessful: false, message: getTaheelRequestsRs.message };
    } else {
      const { requests } = getTaheelRequestsRs.responseBody.data;
      console.log(`Dafts :: taheelRequests => ${JSON.stringify(requests)}`);
      setTaheelRequests(requests);
    }
      
    setLoading(true);
    return response;
  }, []);
  return (
    <>
      <Helmet>
        <title>Drafts</title>
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
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <LatestDraft loading={loading} taheelRequests={taheelRequests} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Drafts;
