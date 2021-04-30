/* eslint-disable */
import axios from 'axios';
import { useState } from 'react';

export default ({
  url,
  method,
  body,
  onSuccess
}) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (requestBody = null) => {
    try {
      setErrors(null);
      console.log(body + method);
      const headers = {
        'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YWUxNjY4OC1kMjMxLTRmZTQtYWYyMy0yYjQ5MWUyMjk2NDkifQ.sVfHaN8hSbxpZuuhIjq1Dd9YOEh_ckc2Qk9pCrX_3Sw'
      };
      const response = await axios.post(url, requestBody, { headers });

      if (onSuccess) {
        setErrors(null);
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {JSON.stringify(err)}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
