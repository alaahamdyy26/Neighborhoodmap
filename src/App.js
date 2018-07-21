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
    {title: 'Stars Mall', location: {lat: 30.072979, lng: 31.34605}},
    {title: 'Bowling Center', location: {lat: 30.076433, lng: 31.301089}},
    {title: 'Gym', location: {lat: 30.084285, lng: 31.342521}},
    {title: 'Home', location: {lat: 30.06791, lng: 31.353687}},
    {title: 'Bakery', location: {lat: 29.951662, lng: 31.265496}},
    {title: 'Restaurant', location: {lat: 30.072994, lng: 31.221878}},
    {title: 'Airport', location: {lat:30.112363, lng: 31.400289}},
    {title: 'Coffee House', location: {lat:30.068441, lng: 31.344537}},
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
