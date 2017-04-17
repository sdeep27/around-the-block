import React from 'react';
import Location from './Location.jsx'
import Login from './Login.jsx'
const parser = require('parse-address');
const apis = require('../../config');
const googleMaps = apis.googleMaps;
const quandl = apis.quandl;
const fb = apis.fb;

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: 'Waiting on location...',
      address: '',
      zip: null,
      type: 'lease',
      min: 1,
      max: 10000,
      results: null,
      market: null
    }
    this.getAddress = this.getAddress.bind(this);
    this.getCoordAndAddress = this.getCoordAndAddress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  getAddress(coordArray) {
    const lat = coordArray[0];
    const long = coordArray[1];
    const acc = coordArray[2];
    this.setState({
      location: `Your GPS coords are Latitude ${lat} and Longitude ${long} with estimated accuracy of ${acc} meters`
    })
    const reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleMaps.api}`
    $.getJSON(reqUrl, (data) => {
      const address = data.results[0].formatted_address
      const zip = parser.parseLocation(address).zip
      this.setState({
        address: `${address}`,
        zip: zip
      })
    })
  }

  getCoordAndAddress() {
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    const options = {
      enableHighAccuracy: false,
      maximumAge: 1.8*Math.pow(10, 6)
    };
    return new Promise ((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        resolve([pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy])
      }, error, options) 
    }).then(this.getAddress);
  }

  handleChange(e) {
    var value = e.target.value;
    var name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    this.setState({results: 'waiting'})
    let minParse = Math.floor(this.state.min);
    let maxParse = Math.floor(this.state.max);
    if(isNaN(minParse)) minParse = 1;
    if(isNaN(maxParse)) maxParse = 10000;
    $.ajax({
      url: '/options',
      type: 'POST',
      data: JSON.stringify({type: this.state.type, min: minParse, max: maxParse, zip: this.state.zip}),
      contentType: "application/json; charset=utf-8",
      success: (data) => {
        this.setState({results: data});
        const marketUrl = `https://www.quandl.com/api/v3/datasets/ZILL/Z${this.state.zip}_RMP.json`
        $.getJSON(marketUrl, (data) => {
          this.setState({market: data.dataset.data})
        })
      }
    });
    e.preventDefault();
  }

  componentDidMount(){
    this.getCoordAndAddress();
  }

  render() {
    return (
      <div>
      <div>
        <h1 style = {styles.heading}>Around The Block</h1>
        <Location location = {this.state.location} address = {this.state.address} zip = {this.state.zip} handleChange = {this.handleChange} handleSubmit = {this.handleSubmit} type = {this.state.type} min = {this.state.min} max = {this.state.max} results = {this.state.results} market = {this.state.market} />
      </div>
      </div>
    )
  }
}

const styles = {
  heading: {
    color: '#0A40BC',
    textAlign: 'center'
  }
};

export default App; 