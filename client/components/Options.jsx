import React from 'react';
import Results from './Results.jsx';
import MarketData from './MarketData.jsx';

function Options ({zip, handleChange, handleSubmit, type, min, max, results, market}) {

  return (
    <div style = {{borderTop: '1px #043953 solid', marginTop: '5px'}}>
      <div style = {styles.section}>
      <form onSubmit = {handleSubmit}>
        <label style = {styles.inputs} >
          Temporary Sublet or Lease &nbsp; &nbsp; 
          <select style = {{height: '25px', lineHeight: '25px'}} name = "type" value={type} onChange={handleChange}>
            <option value="lease">Lease</option>
            <option value="sublet">Temporary Sublet</option>
          </select>
        </label>
        <label style = {styles.inputs}>
        Min Price &nbsp; &nbsp;
          <input name = "min" type="text" style = {{lineHeight: '25px', width: '50px'}} value={min} onChange={handleChange} />
        </label>
        <label style = {styles.inputs}>
        Max Price &nbsp; &nbsp;
          <input name = "max" type="text" style = {{lineHeight: '25px', width: '50px'}} value={max} onChange={handleChange} />
        </label>
        <input type = "submit" value = "Submit" />
      </form>
      </div>
      <div style = {{marginTop: '10px'}}>
        <MarketData zip = {zip} market = {market}/>
        <Results serverCall = {results} />
      </div>
    </div>
      
    )
}

const styles = {
  section: {
    textAlign: 'center',
    color: '#0A40BC',
    fontSize: '20px',
    marginBottom: '30px',
    marginTop: '30px'
  },
  inputs: {
     marginRight: '15px',
  }
}

export default Options;