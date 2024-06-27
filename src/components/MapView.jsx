import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "../leafleticon";
import { faHome,faGift } from '@fortawesome/free-solid-svg-icons';
import { BottomNavigation,BottomNavigationAction } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const MapView = () => {
  const location = useLocation();
  const { coordinates, shopName, shopImage } = location.state || {};

  if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
    return <div>Error: Invalid coordinates.</div>;
  }

  // Switch the order of coordinates
  const leafletCoords = [coordinates[1], coordinates[0]];

  // Custom icon
  const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1047/1047503.png', // Replace with your coffee icon URL
    iconSize: [75, 65],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
    html: `
    <div style="text-align: center;">
      
      <div style="background-color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;">
        ${shopName || 'Coffee Shop'}
      </div>
    </div>
  `,
  });

  return ( 
    <>
    <MapContainer center={leafletCoords} zoom={13} style={{ height: '90vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={leafletCoords} icon={customIcon}>
        <Popup>
          <div>
            <h3>{shopName || 'Coffee Shop'}</h3>
            {shopImage && <img src={shopImage} alt={shopName} style={{ width: '100%', maxWidth: '200px' }} />}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
    <BottomNavigation showLabels >
        <Link to={`/`}><BottomNavigationAction label="Home" icon={<FontAwesomeIcon icon={faHome} />} /></Link>
        <Link to={'/gift-card'}><BottomNavigationAction label="Gift Card" icon={<FontAwesomeIcon icon={faGift}/>}/></Link>
      </BottomNavigation>
    </>
  );
};

export default MapView;