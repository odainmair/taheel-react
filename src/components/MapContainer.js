import React from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '400px',
  height: '400px',
  position: 'relative',
};

const MapContainer = ({ google }) => (
  <Map
    className="google-map"
    google={google}
    zoom={11}
    style={mapStyles}
    initialCenter={
      {
        lat: 24.774265,
        lng: 46.738586
      }
    }
  />
);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCk7ymUnfcjI8qnKnFv7f8KrcUCoPs6sjU'
})(MapContainer);

MapContainer.propTypes = {
  google: PropTypes.object.isRequired,
};
