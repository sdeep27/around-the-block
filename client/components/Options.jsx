import React from 'react';
import Results from './Results.jsx';
import MarketData from './MarketData.jsx';

class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'lease',
      min: 1,
      max: 10000,
      results: null,
      market: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      data: JSON.stringify({type: this.state.value, min: minParse, max: maxParse, zip: this.props.zip}),
      contentType: "application/json; charset=utf-8",
      success: (data) => {
        this.setState({results: data});
        const marketUrl = `https://www.quandl.com/api/v3/datasets/ZILL/Z${this.props.zip}_RMP.json`
        $.getJSON(marketUrl, (data) => {
          this.setState({market: data.dataset.data})
        })
      }
    });
    e.preventDefault();
  }
  
  render () {
    return (
    <div style = {{borderTop: '1px #043953 solid', marginTop: '5px'}}>
      <div style = {styles.section}>
      <form onSubmit = {this.handleSubmit}>
        <label style = {styles.inputs} >
          Temporary Sublet or Lease &nbsp; &nbsp; 
          <select style = {{height: '25px', lineHeight: '25px'}} name = "type" value={this.state.type} onChange={this.handleChange}>
            <option value="lease">Lease</option>
            <option value="sublet">Temporary Sublet</option>
          </select>
        </label>
        <label style = {styles.inputs}>
        Min Price &nbsp; &nbsp;
          <input name = "min" type="text" style = {{lineHeight: '25px', width: '50px'}} value={this.state.min} onChange={this.handleChange} />
        </label>
        <label style = {styles.inputs}>
        Max Price &nbsp; &nbsp;
          <input name = "max" type="text" style = {{lineHeight: '25px', width: '50px'}} value={this.state.max} onChange={this.handleChange} />
        </label>
        <input type = "submit" value = "Submit" />
      </form>
      </div>
      <div style = {{marginTop: '10px'}}>
        <MarketData zip = {this.props.zip} market = {this.state.market}/>
        <Results serverCall = {this.state.results} />
      </div>
    </div>
      
        
      
    )
  }
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