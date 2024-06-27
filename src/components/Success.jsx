import React, { useEffect, useState } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGift } from '@fortawesome/free-solid-svg-icons';

const generateCouponCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const Success = () => {
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    setCouponCode(generateCouponCode());
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="mb-4">Your gift card purchase was successful.</p>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Your Coupon Code:</p>
            <p className="text-xl">{couponCode}</p>
          </div>
          <p className="text-sm">Use this coupon code for a 10% discount on your next purchase at the coffeshop</p>
        </div>
      </div>
      <BottomNavigation showLabels className="mt-auto">
        <Link to={`/`}><BottomNavigationAction label="Home" icon={<FontAwesomeIcon icon={faHome} />} /></Link>
        <Link to={'/gift-card'}><BottomNavigationAction label="Gift Card" icon={<FontAwesomeIcon icon={faGift}/>}/></Link>
      </BottomNavigation>
    </div>
  )
}

export default Success