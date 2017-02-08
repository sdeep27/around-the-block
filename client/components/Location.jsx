import React from 'react';
import Options from './Options.jsx';

function Location ({location, address, zip, renderRes}) {
  var opts;
  if (zip) {
    opts = <Options zip = {zip}/>
  }
  else opts = <div>Trying to find address...</div>
  return (
    <div>
      <p>{location}</p>
      <p>Your Approximate Address: {address}</p>
      {opts}
    </div>
  )
}

export default Location;