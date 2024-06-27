import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faHome,
  faGift,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';  
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopAndMenu = async () => {
      try {
        const shopResponse = await axios.get(`http://localhost:5000/api/shops/${id}`);
        setShop(shopResponse.data);

        const menuResponse = await axios.get('http://localhost:5000/api/products');
        setMenu(menuResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching shop details and menu:', error);
        setLoading(false);
      }
    };

    fetchShopAndMenu();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow overflow-auto p-4">
        <Link to="/">
          <IconButton edge="start" color="inherit" aria-label="back">
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
        </Link>

        <Typography variant="h4" className="font-bold mb-4">
          {shop.name}
        </Typography>

        <Typography variant="body1" className="mb-4">
          {shop.address.street}, {shop.address.city}
        </Typography>

        <Link 
          to={`/shops/${id}/map`} 
          state={{ coordinates: shop.location.coordinates, shopName: shop.name,  shopImage: shop.images[0] }}
        >
          <IconButton edge="start" color="inherit" aria-label="map">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </IconButton>
          View on Map
        </Link>

        <Typography variant="h5" className="font-bold mb-4">
          Menu
        </Typography>

        <div className="grid grid-cols-2 gap-4 pb-16">
          {menu.map((item) => (
            <Card key={item._id}>
              <LazyLoadImage
                alt={shop.name}
                effect="blur"
                src={item.image}
                placeholderSrc="/placeholder.jpg"
                height="60%"
                width="100%"
                className="hover:opacity-90"
              />  
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.category}
                </Typography>
                <Typography variant="body1" className="font-bold">
                  ₹{item.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation showLabels >
        <Link to={`/`}><BottomNavigationAction label="Home" icon={<FontAwesomeIcon icon={faHome} />} /></Link>
        <Link to={'/gift-card'}><BottomNavigationAction label="Gift Card" icon={<FontAwesomeIcon icon={faGift}/>}/></Link>
      </BottomNavigation>
    </div>
  );
};

export default ShopDetail;
