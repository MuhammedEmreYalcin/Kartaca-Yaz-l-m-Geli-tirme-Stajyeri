import React, { useState } from 'react';
import Product from './Product';
import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import "./Home.css"

function Home() {
  const [product1Bid, setProduct1Bid] = useState(100);
  const [product2Bid, setProduct2Bid] = useState(500);
  const [product3Bid, setProduct3Bid] = useState(200);

  const handleProduct1BidSubmit = (bid) => {
    setProduct1Bid(bid);
  }

  const handleProduct2BidSubmit = (bid) => {
    setProduct2Bid(bid);
  }

  const handleProduct3BidSubmit = (bid) => {
    setProduct3Bid(bid);
  }
  
  const {user, logout} = useContext(UserContext);
  return (
    <div>
      <h1>Welcome to Bidding System</h1>
      <button onClick={logout} className="logout">Logout</button>
      <div className="product-list">
        <Product
          name="Air Pods 2"
          image="/img/airpods.jpg"
          startingBid={product1Bid}
          currentBid={product1Bid}
          user={user.name}
          onBidSubmit={handleProduct1BidSubmit}
        />
        <Product
          name="I phone 14"
          image="/img/iphone14.jpg"
          startingBid={product2Bid}
          currentBid={product2Bid}
          user={user.name}
          onBidSubmit={handleProduct2BidSubmit}
        />
        <Product
          name="Apple Watch"
          image="/img/applewatch.jpg"
          startingBid={product3Bid}
          currentBid={product3Bid}
          user={user.name}
          onBidSubmit={handleProduct3BidSubmit}
        />
      </div>
    </div>
  );
}

export default Home;