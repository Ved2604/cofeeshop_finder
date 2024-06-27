import React, { useState } from 'react';
import axios from 'axios';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGift } from '@fortawesome/free-solid-svg-icons';

const GiftCard = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post('https://cofeeshopbackend.vercel.app/api/stripe/create-checkout-session', {
        amount: amount,
      });
      
      // Redirect to Stripe Checkout
      window.location = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className='h-screen flex flex-col'>
      <div className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="max-w-md w-full px-4">
        <h4>₹</h4>
        <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Gift Card Amount"
            className="w-full p-2 mb-4 border rounded"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            {loading ? 'Processing...' : 'Buy Gift Card'}
          </button>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
      </div>
      <BottomNavigation showLabels className="mt-auto">
        <Link to={`/`}><BottomNavigationAction label="Home" icon={<FontAwesomeIcon icon={faHome} />} /></Link>
        <Link to={'/gift-card'}><BottomNavigationAction label="Gift Card" icon={<FontAwesomeIcon icon={faGift}/>}/></Link>
      </BottomNavigation>
    </div>
  );
};

export default GiftCard;