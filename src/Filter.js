import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp'

class Filter extends Component {
  state = {
    query: ''
  }

  render() {
    let showLocation;
    //filter list based on user's input
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      //Filter the places in the list
      showLocation = this.props.locations.filter((locations) => match.test(locations.title))
    } else {
      showLocation = this.props.locations
    }
    return (
      <div>
        <input tabIndex='2'
               id="zoom-to-area-text"
               type="text"
               placeholder="Enter area name"
               value={this.state.query}
               onChange={(event) => {
                 this.setState({query: event.target.value}, () => {
                   this.props.onFilterSelection(this.state.query)
                 })
               }}

               onKeyPress={(e) => {
                 if (e.key === 'Enter') {
                   // Trigger the button element with a click
                   document.getElementById("zoom-to-area").click();
                 }
               }}
        />
        <input tabIndex='0'
               onClick={(e) => {

                 e.preventDefault();
                 this.props.onFilterSelection(this.state.query)
               }} id="zoom-to-area" type="button" value="Filter"/>
        <ul>
          {showLocation.map((location) => (
            <li onClick={(e) => {
              this.props.onFilterSelection(e.target.textContent)
            }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Trigger the button element with a click
                    this.props.onFilterSelection(e.target.textContent)
                  }
                }}
                tabIndex='0' key={location.title} className='locations'>{location.title}</li>
          ))}
        </ul>
      </div>
    )
  }

}

export default Filter