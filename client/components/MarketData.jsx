import React from 'react';

function MarketData ({zip, market}) {
  let marketDiv;
  if(market === null) {
    marketDiv = <div>Market Data... Waiting</div>
  }
  else {
    marketDiv = (
      <div style = {{color: '#059332'}}> 
        Market Data: Median Rent for Month ending {market[0][0]} is ${market[0][1]} (Zillow)
      </div>
    )
  }
  return (
    <div style = {styles.container}>
      {marketDiv}
    </div>
  )
}
const styles = {
  container: {
    textAlign: 'center',
    borderTop: '1px #0E2B6D solid',
    borderBottom: '1px #0E2B6D solid',
    width: '100%',
    fontSize: '22px',
    padding: '20px',
    marginBottom: '20px'
  }
}

export default MarketData;