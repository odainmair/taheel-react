/* eslint-disable */
import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
} from '@material-ui/core';

import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { CentertDetails } from 'src/pages/services/final-license/services/finalLicenseAPI';
import FormCreator from 'src/Core/Components/FormCreator';
import CenterDetailsSchema from '../Schema/CenterDetailsSchema';
import finalLicenseFieldSchema from 'src/pages/services/final-license/models/finalLicenseFieldSchema';
import FormTypeEnum from 'src/Core/Utils/FormTypeEnum';

const CentersDetails = (props) => {
    const location = useLocation();
    const licenceNumber = location.state.licenceNumber;
    console.log("licenceNumber+_+_+_+_+_+_+", licenceNumber)
    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = React.useState(false);
    const [errMessage, SetErrMessage] = useState('')
    const [loading, setLoading] = useState(true);
    const sectionNames = ['HealthServices','Capacity']
    const lookupObject =
    {
      "CRNumber":
        [
          {
            label: {
              en: 'High School',
              ar: 'الشهادة الثانوية'
            },
            value: 'High School'
          },
          {
            label: {
              en: 'Bachelore degree',
              ar: 'درجة البكالورياس'
            },
            value: 'Bachelore degree'
          },
          {
            label: {
              en: 'Master Dgree(M.D)',
              ar: 'درجة الماستر'
            },
            value: 'Master Dgree(M.D)'
          }
        ]
    }
    useEffect(async () => {
        setLoading(true)
        const getCenterDetails = await CentertDetails(licenceNumber);
        if (!getCenterDetails.isSuccessful) {
            const response = { isSuccessful: false, message: getCenterDetails.message };
            SetErrMessage(getCenterDetails.message)
        } else {
            const Details = getCenterDetails.responseBody.data.center;
            setDetails(Details)
            console.log("Details+++++++++++++", Details);
            setLoading(false)
        }
    }, []);
    const handleChange = () => {

    };
    const title = 'معلومات المركز'
    return (
        <Card>
            <CardHeader title={title} />
            <Divider />
            <CardContent>
                <FormCreator schema={finalLicenseFieldSchema} sectionNames={sectionNames} lookupObject={lookupObject} errMessage={errMessage} initValues={details} isLoading={loading}/>
            </CardContent>
        </Card>
    );
};
CentersDetails.propTypes = {
    // centers: PropTypes.array.isRequired
};

export default CentersDetails;
