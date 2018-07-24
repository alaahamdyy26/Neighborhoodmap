import React, {Component} from 'react';
import * as fourSquareAPI from './fourSquareAPI'

class Map extends Component {
  state = {
    venueDetails: []
  }

  zoomToArea = () => {
    if (!this.map) {
      return;
    }
    let address = this.props.query
    // Make sure the address isn't blank.
    if (address !== '') {
      const matches = this.props.locations.filter((l) => l.title.toLowerCase().search(address.toLowerCase()) !== -1)
      if (matches.length === 1 && matches[0].marker) {
        this.fitBounds(matches)
        this.map.setZoom(13);
        this.showInfoWindow(matches[0].marker, this.infowindow);
      }
      else if (matches.length > 1) {
        this.fitBounds(matches)
      } else {
        this.fitBounds(this.props.locations)
      }
    }
    else {
      this.fitBounds(this.props.locations)
    }
  }

  fitBounds(locations) {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((m)=>bounds.extend(m.location))
    this.map.fitBounds(bounds);
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap.bind(this);

    // Register google maps auth error handler
    window.gm_authFailure = this.gm_authFailure;

    // Asynchronously load the Google Maps script, passing in the callback reference
    function loadScript() {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBiwtOmgaHpGbQEN9G6VoeUt3brZncvKnk&v=3&callback=initMap";

      //try/error function scheduled to run with setTimeout to test if map loaded with no error.
      if(navigator.onLine) {
      setTimeout(function () {
        try {
          if (!window.google || !window.google.maps) throw "opps!!! sorry google Maps loading was unsuccessful, try again later";
        }
        catch (err) {
          document.getElementById('map').innerHTML = `<p>Error: ${err} .</p>`;
        }

      },1000)
    document.body.appendChild(script);
    }
    else{
      alert('You are currently offline, the information you are checking might not be up to date.')
    }}
    window.onload = loadScript;
  }

  gm_authFailure = () => {
    alert('Sorry, Could not authenticate with Google Maps')
  };

  showInfoWindow = (marker, infowindow) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      //getting the venue details by the venueID
      fourSquareAPI.getVenueDetails(marker.fourSquareId).then((venueDetails) => {
        infowindow.setContent(
          `<div class="venueName"> ${venueDetails.name}</div><br> <div class="venueContact">Contact us:  ${venueDetails.contact.phone} </div><br> <div class="venueRating">Rating: ${venueDetails.rating} <br><span class="credits"> Provided by FourSquare</span> `)
      })

      infowindow.open(this.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.setMarker = null;
      });
    }
  }

  initMap() {
    let markers = [];
    const self = this;
    const defaultIcon = makeMarkerIcon('F6605D'),
      highlightedIcon = makeMarkerIcon('ECFA08');
    const mapview = document.getElementById('map');
    this.map = new window.google.maps.Map(mapview, {
      enter: {lat: 26.820553, lng: 30.802498},
      zoom: 10,
      mapTypeControl: false,

    });
    const bounds = new window.google.maps.LatLngBounds();
    let InfoWindow = new window.google.maps.InfoWindow({});
    this.infowindow = new window.google.maps.InfoWindow();
    const locations = this.props.locations

    window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
      self.closeInfoWindow();
    });
    for (let i = 0; i < locations.length; i++) {
      // Get the position from the locations array.
      let position = locations[i].location;
      let title = locations[i].title;
      // Create a marker per locations, and put into markers array.
      let marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        map: this.map,
        icon: defaultIcon,
        id: i,
        fourSquareId: locations[i].fourSquareId
      });

      // Push the marker to our array of markers.
      markers.push(marker);
      marker.addListener('click', function () {
        self.showInfoWindow(this, self.infowindow);

        self.map.setZoom(13);
        self.map.setCenter(marker.getPosition())},300)

     ;

      bounds.extend(markers[i].position);

      marker.addListener('mouseover', function () {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function () {
        this.setIcon(defaultIcon);
      });

      locations[i].marker = marker;
    }
    this.map.fitBounds(bounds);
  }

  render() {
    this.zoomToArea()

    return (
      <div role="application" id="map"></div>
    )
  }
}

export default Map;


function makeMarkerIcon(markerColor) {
  const markerImage = new window.google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
    '|40|_|%E2%80%A2',
    new window.google.maps.Size(22, 34),
    new window.google.maps.Point(0, 0),
    new window.google.maps.Point(10, 34),
    new window.google.maps.Size(22, 34));
  return markerImage;
}