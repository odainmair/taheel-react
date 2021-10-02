/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import GmapsAddress from 'src/components/gmap/GmapsAddress';
import WithGoogleApi from 'src/components/gmap/WithGoogleApi';
import { TextField as TextFieldFinal } from 'final-form-material-ui';

const sampleData = {
  vendorStreetAddress: {
    caption: '7596 الديوان، الحمراء، الرياض 13216 2802، السعودية',
    heart: { lat: 24.774265, lng: 46.738586 },
  },
  vendorServiceAreas: [
    {
      caption: 'Kendall, Fl',
      heart: { lat: 25.664112, lng: -80.356857 },
      polygon: [
        { lat: 25.634253, lng: -80.388439 },
        { lat: 25.632716, lng: -80.309863 },
        { lat: 25.705581, lng: -80.304534 },
        { lat: 25.703632, lng: -80.387227 },
      ],
    },
    {
      caption: 'Coral Gables, Fl',
      heart: { lat: 25.746895, lng: -80.267322 },
      polygon: [
        { lat: 25.633666, lng: -80.303403 },
        { lat: 25.628092, lng: -80.28007 },
        { lat: 25.706354, lng: -80.242616 },
        { lat: 25.772882, lng: -80.254253 },
        { lat: 25.764537, lng: -80.288614 },
      ],
    },
  ],
};

const NewCenterAddress = ({ Condition, setField }) => {
    const inputEl = useRef(null);
    const [streetAddr, setStreetAddr] = useState(sampleData.vendorStreetAddress);
    const getStreetAddrPartsFromGeoResult = (geoResult) => {
      console.log('odai');
      const addressArray = geoResult.address_components;
      const currentAddress = {
        area:
          (addressArray.find((x) => x.types.some((t) => ['sublocality_level_1', 'locality'].includes(t))) || {}).long_name
          || '',
        country: (addressArray.find((x) => x.types[0] === 'country') || {}).long_name || '',
        street: (addressArray.find((x) => x.types[0] === 'route') || {}).long_name || '',
        streetNumber: (addressArray.find((x) => x.types[0] === 'street_number') || {}).long_name || '',
        postalCode: (addressArray.find((x) => x.types[0] === 'postal_code') || {}).long_name || '',
        postalCodeSuffix: (addressArray.find((x) => x.types[0] === 'postal_code_suffix') || {}).long_name || '',
        city: (addressArray.find((x) => x.types[0] === 'administrative_area_level_2') || {}).long_name || '',
        state: (addressArray.find((x) => x.types[0] === 'administrative_area_level_1') || {}).long_name || '',
        address: geoResult.formatted_address,
        lat: geoResult.geometry.location.lat,
        lng: geoResult.geometry.location.lng,
      };
      setStreetAddr(currentAddress);
      setField('sub', currentAddress.area);
      setField('city', currentAddress.city);
      setField('street', currentAddress.street);
      setField('buildNo', currentAddress.streetNumber);
      setField('postalCode', `${currentAddress.postalCode}-${currentAddress.postalCodeSuffix}`);
      setField('lat', currentAddress.lat);
      setField('lng', currentAddress.lng);
  
      console.log(inputEl.current);
      return currentAddress;
    };
    const setFieldValue = (streetAddress) => {
      console.log('odai');
      console.log(JSON.stringify(streetAddress));
      console.log('odai');
    };
    return (
      <>
        <Grid
          container
          spacing={3}
          mt={3}
        >
  
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
              الرجاء تحديد موقع المركز الجديد على الخريطة
            </Typography>
            <WithGoogleApi apiKey="AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw">
              <GmapsAddress value={streetAddr} onChange={setFieldValue} getStreetAddrPartsFromGeoResultMine={getStreetAddrPartsFromGeoResult} />
            </WithGoogleApi>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              fullWidth
              required
              label="المدينة"
              name="city"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              fullWidth
              required
              label="الحي"
              name="sub"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
  
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              fullWidth
              required
              label="الشارع"
              name="street"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              fullWidth
              required
              label="رقم المبنى"
              name="buildNo"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              fullWidth
              required
              label="الرمز البريدي"
              name="postalCode"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              fullWidth
              required
              label="الرقم الاضافي"
              name="additionalNum"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
          </Grid>
        </Grid>
      </>
    );
  };
  export default NewCenterAddress;
  
  NewCenterAddress.propTypes = {
    Condition: PropTypes.func.isRequired,
    setField: PropTypes.func
  };
  