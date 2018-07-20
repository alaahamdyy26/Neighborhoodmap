import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';


class Map extends Component {
  render(){


    var markers = [];


    const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat:30.04442, lng: 31.235712 } }
        defaultZoom = { 10 }
      >
      </GoogleMap>

    ));

    return(

      <div>

        <Map
          containerElement={ <div className='mapContainer' /> }
          mapElement={ <div className='map' /> }
        />


      </div>

    );
  }
};
export default Map;
