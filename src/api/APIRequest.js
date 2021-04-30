/* eslint-disable indent  */
/* eslint-disable no-unused-vars  */
/* eslint-disable padded-blocks  */
import axios from 'axios';

const APIRequest = async ({
    requestBody = {},
    url, queryParams = {},
    method
}) => {
    const response = {
        isSuccessful: true,
        data: {},
        message: ''
    };
    console.log(`----requestBody :: ${JSON.stringify(requestBody)}`);
    console.log(`----url :: ${url}`);
    console.log(`----queryParams :: ${queryParams}`);
    try {
        const headers = {
            'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YWUxNjY4OC1kMjMxLTRmZTQtYWYyMy0yYjQ5MWUyMjk2NDkifQ.sVfHaN8hSbxpZuuhIjq1Dd9YOEh_ckc2Qk9pCrX_3Sw',
            'Content-Type': 'application/json; charset=utf-8'
        };
        const apiResponse = await axios.post(url, requestBody, { headers, params: { ...queryParams } });
        response.responseBody = { ...apiResponse.data };
        console.log(`----apiResponse :: ${JSON.stringify(apiResponse)}`);
        console.log(`----responseresponseBody :: ${JSON.stringify(response.responseBody)}`);

    } catch (err) {
        response.isSuccessful = false;
        response.message = err.message;
        console.log(`----apiResponse err.message :: ${err.message}`);
    }
    return response;
};

export default APIRequest;
