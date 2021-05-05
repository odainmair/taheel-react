/* eslint-disable   */

import axios from 'axios';
import fileDownload from 'js-file-download';

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
        console.log(`----requestBody err :: ${JSON.stringify(err.response)}`);
        response.message = err.response.data.message.errorMessageAr;
        console.log(`----apiResponse err.message :: ${response.message}`);
    }
    return response;
};
const downloadFileAPI = async ({
    url, queryParams = {}, fileName,
    method
}) => {
    try {
        console.log(`----url :: ${url}`);
        console.log(`----queryParams :: ${queryParams}`);
        const headers = {
            'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YWUxNjY4OC1kMjMxLTRmZTQtYWYyMy0yYjQ5MWUyMjk2NDkifQ.sVfHaN8hSbxpZuuhIjq1Dd9YOEh_ckc2Qk9pCrX_3Sw',
            'Content-Type': 'application/json; charset=utf-8'
        };
        const apiResponse = await axios.get(url, { headers, responseType: 'blob', params: { ...queryParams } });
        console.log(`----headers :: ${JSON.stringify(apiResponse.headers)}`);
        fileDownload(apiResponse.data, fileName, apiResponse.headers['content-type']);
    } catch (err) {
        console.log(`----requestBody err :: ${JSON.stringify(err.response)}`);
        throw (err);
    }

};

export { downloadFileAPI, APIRequest };
