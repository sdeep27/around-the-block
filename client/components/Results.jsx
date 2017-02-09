import React from 'react';

function Results ({serverCall}) {
  let allResults;
  if (serverCall === null) {
    allResults = <div style = {styles.container}>Available Apartments...</div>;
  }
  else if (serverCall === 'waiting') {
    allResults = <div><div><img src = './img/green.gif'/></div><div style = {styles.container}>Results coming soon...</div></div>;
  }
  else {
    allResults = [];
    function fixPrice (dollar) {
      const regex = /\$\d+/;
      return dollar.match(regex).join('')
    }
    serverCall.forEach((place) => {
      allResults.push(
      <div style = {styles.item}>
       <a href = {place.url}><img src = {place.picLink} height="150" width="150"></img></a>
       <a href = {place.url}><p>{place.title}</p></a>
       <p>Price: {fixPrice(place.price)}</p>
      </div>
      )
    })
  } 
  return (
    <div style = {{textAlign: 'center'}}>
      {allResults}
    </div>
  )
}
const styles = {
  container: {
    color: '#0E2B6D',
    fontSize: '15px',
    textAlign: 'center'
  },
  item: {
    display: 'inline-block',
    border: '2px #002711 ridge',
    width: '25%',
    height: '300px',
    margin: '10px',
    padding: '5px'
  }
}

export default Results;