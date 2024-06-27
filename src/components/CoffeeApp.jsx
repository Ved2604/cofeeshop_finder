import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  IconButton,
  Card,
  CardContent,
  Rating,
  TextField,
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faHeart,
  faBookmark,
  faUser,
  faSearch,
  faSliders,
  faGift
} from '@fortawesome/free-solid-svg-icons';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Link } from 'react-router-dom';

const CoffeeApp = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('https://cofeeshopbackend.vercel.app/api/shops');
        setShops(response.data);
        setFilteredShops(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the shops:', error);
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    const filtered = shops.filter(shop => 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredShops(filtered);
  }, [searchQuery, shops]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow overflow-auto p-4">
        <Typography variant="h5" className="font-bold mb-4">
          Find a coffee shop anywhere
        </Typography>

        <div className="relative mb-4 mt-2">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
              ),
            }}
          />
        </div>

        <Typography variant="h6" className="font-bold mb-2">
          {searchQuery ? 'Search Results' : 'Featured coffee shops'}
        </Typography>

        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredShops.map((shop) => (
              <Link to={`/shops/${shop._id}`} key={shop._id}>
                <Card key={shop._id} className="bg-orange-300">
                  <LazyLoadImage
                    alt={shop.name}
                    effect="blur"
                    src={shop.images[0]}
                    placeholderSrc="/placeholder.jpg"
                    height="75%"
                    width="100%"
                    className="hover:opacity-90 "
                  />
                  <div className="bg-orange-200 hover:bg-orange-300">
                    <CardContent>
                      <Typography variant="subtitle1" className="font-bold">
                        {shop.name}
                      </Typography>
                      <div className="flex items-center">
                        <Rating value={shop.rating} readOnly size="small" />
                      </div>
                      <Typography variant="body2" color="text.secondary">
                        {shop.address.city}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation showLabels >
        <Link to={`/`}><BottomNavigationAction label="Home" icon={<FontAwesomeIcon icon={faHome} />} /></Link>
        <Link to={`/gift-card`}><BottomNavigationAction label="Gift Card" icon={<FontAwesomeIcon icon={faGift}/>}/></Link>
      </BottomNavigation>
    </div>
  );
};

export default CoffeeApp;