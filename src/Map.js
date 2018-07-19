import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import GoogleMapReact from 'google-map-react';

class Map extends Component{
  constructor(props) {
    super(props);

  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: 10.794234, lng: 106.706541},
          zoom: 20
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            this.map.setCenter(pos);

            const marker = new google.maps.Marker({
              position: pos,
              map: this.map,
              title: 'Hello World!'
            });
          }, () => {
            console.log('navigator disabled');
          });
        } else {
          // Browser doesn't support Geolocation
          console.log('navigator disabled');
        }
      }
      else this.props.onError()
    }
  }

  render(){
    return(
      <div>
        <div id="map" style={{height: "600px"}}></div>
      </div>
    )
  }
}

export default scriptLoader(
  ["https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyBiwtOmgaHpGbQEN9G6VoeUt3brZncvKnk&v=3&callback=initMap"]
)(Map)


