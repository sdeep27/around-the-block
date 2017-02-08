import React from 'react';

function Results ({serverCall}) {
  let allResults;
  if (serverCall === null) {
    allResults = <div>Waiting for you to submit...</div>;
  }
  else if (serverCall === 'waiting') {
    allResults = <div>Results coming soon...</div>;
  }
  else {
    allResults = [];
    serverCall.forEach((place) => {
      allResults.push(
      <div style = {styles.container}>
       <a href = {place.url}><img src = {place.picLink} height="75" width="75"></img></a>
       <a href = {place.url}><p>{place.title}</p></a>
       <p>Price: {place.price}</p>
      </div>
      )
    })
  } 
  return (
    <div>
      {allResults}
    </div>
  )
}
const styles = {
  container: {
    display: 'inline',
    float: 'left',
    border: '2px black solid',
    width: '25%',
    margin: '10px',
    padding: '3px'
  }
}

export default Results;