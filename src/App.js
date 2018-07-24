import React, {Component} from 'react';
import './App.css';
import Map from "./Map";
import Filter from "./Filter";

class App extends Component {
  state = {
    query: "",
  }

  zoomToArea=(value)=>{
    this.setState({query: value})
  }

  locations = [
    {title: 'Stars Mall', location: {lat: 30.072979, lng: 31.34605},fourSquareId:'4b853e48f964a520845231e3'},
    {title: 'Point-90', location: {lat:30.020321, lng: 31.495028},fourSquareId: '55aacda1498e0ce436da1bb6'},
    {title: 'Gym', location: {lat: 30.084285, lng: 31.342521},fourSquareId: '4fa51d64e4b01acec3a40d97'},
    {title: 'Bakery', location: {lat: 29.951662, lng: 31.265496},fourSquareId:'59dd23de625a666ff072eab1'},
    {title: 'Restaurant', location: {lat: 30.072994, lng: 31.221878},fourSquareId:'4bd33cf641b9ef3b1da3ffe5'},
    {title: 'Airport', location: {lat:30.112363, lng: 31.400289},fourSquareId:'4b7a230bf964a52034242fe3'},
    {title: 'Coffee House', location: {lat:30.068441, lng: 31.344537},fourSquareId:'4c89f3f3159cbfb7abb26e35'},
    {title: 'SDC', location: {lat:30.110194, lng: 31.376745},fourSquareId:'50142a17e4b0e28d99387589'},
  ]
  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Neighbourhood Map</h1>
        </header>
        <div className="container">
          <div className="options-box">
            <h1>Search my Neighbourhood</h1>
            <div>
            </div>
            <Filter
            query={this.state.query}
            locations={this.locations}
            onFilterSelection={this.zoomToArea}
            />
          </div>

          <Map
          locations={this.locations}
          query={this.state.query}

          />
        </div>
      </div>

    )
  }
}

export default App;
