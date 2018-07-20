import React, {Component} from 'react';
import './App.css';


class App extends Component {

  state = {

  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadMapJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBiwtOmgaHpGbQEN9G6VoeUt3brZncvKnk&v=3&callback=initMap")
  }

  initMap() {
    let markers = [];
    const self = this;
    const mapview = document.getElementById('map');
    const map = new window.google.maps.Map(mapview, {
      center: {lat: 30.04442, lng: 31.235712},
      zoom: 10,
      mapTypeControl: false,

    });

    const bounds = new window.google.maps.LatLngBounds();
    const InfoWindow = new window.google.maps.InfoWindow({});
    const largeInfowindow = new window.google.maps.InfoWindow();
    const location = [
      {title: 'City Stars Mall', location: {lat: 30.072979, lng: 31.34605}},
      {title: 'Bowling Center', location: {lat: 30.076433, lng: 31.301089}},
      {title: 'Gym', location: {lat: 30.084285, lng: 31.342521}},
      {title: 'Home', location: {lat: 30.06791, lng: 31.353687}},
      {title: 'Work', location: {lat: 30.066705, lng: 31.330635}},
      {title: 'Bakery', location: {lat: 29.951662, lng: 31.265496}}
    ]

    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function () {
          infowindow.setMarker = null;
        });
      }
    }

    window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
      self.closeInfoWindow();
    });
    for (let i = 0; i < location.length; i++) {
      // Get the position from the location array.
      let position = location[i].location;
      let title = location[i].title;
      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        map: map,
        id: i
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      marker.addListener('click', function () {
        populateInfoWindow(this, largeInfowindow);
      });
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Neighbourhood Map</h1>
        </header>
        <div className="container">
          <div className="options-box">
            <h1>Search My Neighbourhood</h1>
            <div>


            </div>
            <div>
              <input id="zoom-to-area-text" type="text" placeholder="Enter area name"/>
              <input id="zoom-to-area" type="button" value="Filter"/>
            </div>

            <div>
              <span className="text">Search for nearby places</span>
              <input id="places-search" type="text" placeholder="Ex: Gas Stations in Nasr City"/>
              <input id="go-places" type="button" value="Go"/>
            </div>
          </div>
          <div id="map"></div>
        </div>
      </div>

        )
        }
        }
        export default App;

        function loadMapJS(src) {
        const ref = window.document.getElementsByTagName("script")[0];
        const script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        script.onerror = function () {
        document.write("Google Maps can't be loaded");
      };
        ref.parentNode.insertBefore(script, ref);
      }
