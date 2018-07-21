import React, {Component} from 'react';


class Map extends Component {
  state = {}

  zoomToArea = () => {
    if (!this.map) {
      return;
    }
    let address = this.props.query
// Make sure the address isn't blank.
    if (address !== '') {
      const matches = this.props.locations.filter((l) => l.title.toLowerCase().search(address.toLowerCase()) !== -1)
      if (matches.length > 0) {
        this.map.setCenter(matches[0].location)
        this.map.setZoom(16);
      }
    }
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap.bind(this);
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadMapJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBiwtOmgaHpGbQEN9G6VoeUt3brZncvKnk&v=3&callback=initMap")
  }

  initMap() {
    let markers = [];
    const self = this;
    const defaultIcon = makeMarkerIcon('F6605D'),
      highlightedIcon = makeMarkerIcon('ECFA08');
    const mapview = document.getElementById('map');
    this.map = new window.google.maps.Map(mapview, {
      center: {lat: 26.820553, lng: 30.802498},
      zoom: 10,
      mapTypeControl: false,

    });
    const bounds = new window.google.maps.LatLngBounds();
    const InfoWindow = new window.google.maps.InfoWindow({});
    const largeInfowindow = new window.google.maps.InfoWindow();
    const location = this.props.locations

    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(this.map, marker);
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
        map: this.map,
        icon: defaultIcon,
        id: i
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      marker.addListener('click', function () {
        populateInfoWindow(this, largeInfowindow);
      });
      bounds.extend(markers[i].position);

      marker.addListener('mouseover', function () {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function () {
        this.setIcon(defaultIcon);
      });

    }
    this.map.fitBounds(bounds);
  }

  render() {
    this.zoomToArea()

    return (
      <div id="map"></div>
    )
  }
}

export default Map;

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