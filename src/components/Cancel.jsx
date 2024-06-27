import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGift } from '@fortawesome/free-solid-svg-icons';

const Cancel = () => {
  return (
    <div className='h-screen flex flex-col'>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">
            The transaction failed due to some reason, please try again.
          </h3>
          <Link to="/gift-card" className="bg-blue-500 text-white px-4 py-2 rounded">
            Try Again
          </Link>
        </div>
      </div>
      <BottomNavigation showLabels className="mt-auto">
        <Link to={`/`}><BottomNavigationAction label="Home" icon={<FontAwesomeIcon icon={faHome} />} /></Link>
        <Link to={'/gift-card'}><BottomNavigationAction label="Gift Card" icon={<FontAwesomeIcon icon={faGift}/>}/></Link>
      </BottomNavigation>
    </div>
  )
}

export default Cancel