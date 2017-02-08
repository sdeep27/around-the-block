import React from 'react';
import Location from './Location.jsx'
const parser = require('parse-address');
const apis = require('../../config');
const googleMaps = apis.googleMaps;
const quandl = apis.quandl;


var count = 0;
var apiCount = 0;
class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      location: 'Waiting on location...',
      address: '',
      zip: null,
    }
    this.getAddress = this.getAddress.bind(this);
    this.getCoordAndAddress = this.getCoordAndAddress.bind(this);
    this.renderRes = this.renderRes.bind(this);
  }
  getQuandl () {
    //const medianZillowRent = "https://www.quandl.com/api/v3/datasets/ZILL/Z90026_RMP.json";
    const medianMktRent = "https://www.quandl.com/api/v3/datasets/ZILL/Z90026_RAH.json"
  }
  getAddress(coordArray) {
    const lat = coordArray[0];
    const long = coordArray[1];
    const acc = coordArray[2];
    this.setState({
      location: `Your GPS coords are Latitude ${lat} and Longitude ${long} with estimated accuracy of ${acc}`
    })
    const reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleMaps.api}`
    $.getJSON(reqUrl, (data) => {
      console.log('no. of api request made ', apiCount);
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
  
  renderRes () {
    console.log('Test Render');
  }

  componentDidMount(){
    count++
    console.log('no. of times mounted ', count);
    this.getCoordAndAddress();
  }


  render() {
    return (
      <div>
        <h1 style = {styles.heading}>Around The Block</h1>
        <Location location = {this.state.location} address = {this.state.address} zip = {this.state.zip} />
      </div>
    )
  }
}

const styles = {
  heading: {
    color: 'blue',
    textAlign: 'center'
  }
};

export default App; 