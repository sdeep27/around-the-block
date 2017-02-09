import React from 'react';
import Options from './Options.jsx';


function Location ({location, address, zip, renderRes}) {
  var opts, loading, addressIntro;
  if (zip) {
    opts = <Options zip = {zip}/>
  }
  else opts = <div>Trying to find address...</div>
  if (location === 'Waiting on location...'){
    loading = <img src = './img/blue.gif'/>
    addressIntro = '';
  }
  else {
    addressIntro = 'Your Approximate Address is ';
    loading = '';
  }
  return (
    <div style = {styles.location}>
      <p>{loading}</p>
      <p>{location}</p>
      <p>{addressIntro}{address}</p>
      {opts}
    </div>
  )
}
const styles = {
  location: {
    textAlign: 'center',
    color: '#043953',
    fontSize: '15px',
    marginBottom: '10px'
  }
}

export default Location;