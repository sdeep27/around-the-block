import React from 'react';
import Results from './Results.jsx'

class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'lease',
      min: 1,
      max: 10000,
      results: null
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
        console.log('in success');
        console.log(data.length);
        this.setState({results: data});
        data.forEach((item) => console.log(item, item.length))
      }
    });
    e.preventDefault();
  }
  
  render () {
    return (
    <div>
      <div>
      <form onSubmit = {this.handleSubmit}>
        <label>
          Temporary Sublet or Lease
          <select name = "type" value={this.state.type} onChange={this.handleChange}>
            <option value="lease">Lease</option>
            <option value="sublet">Temporary Sublet</option>
          </select>
        </label>
        <label>
        Min Ask
          <input name = "min" type="text" value={this.state.min} onChange={this.handleChange} />
        </label>
        <label>
        Max Ask
          <input name = "max" type="text" value={this.state.max} onChange={this.handleChange} />
        </label>
        <input type = "submit" value = "Submit" />
      </form>
      </div>
      <div>
        <Results serverCall = {this.state.results} />
      </div>
    </div>
      
        
      
    )
  }
}


export default Options;