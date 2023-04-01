import React, { useState } from 'react';

function Product(props) {
  const [bid, setBid] = useState(props.startingBid);
  const [currentBidder, setCurrentBidder] = useState("");

  const handleBidChange = (event) => {
    setBid(parseInt(event.target.value));
  }

  const handleBidSubmit = (event) => {
    event.preventDefault();
    if (bid > props.currentBid) {
      setCurrentBidder(props.user);
      props.onBidSubmit(bid);
    } else {
      alert("Your bid must be higher than the current bid.");
    }
  }

  return (
    <div className="product">
      <img src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <p>Current Bid: {props.currentBid} by {currentBidder}</p>
      <form onSubmit={handleBidSubmit}>
        <label>
          Your Bid: $
          <input type="number" value={bid} onChange={handleBidChange} />
        </label>
        <button type="submit">Place Bid</button>
      </form>
    </div>
  );
}

export default Product;