import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the route changes
    window.scrollTo(0, 0);

    // Set document title based on the current route
    switch (location.pathname) {
      case '/':
        document.title = 'Dora A to Z Fresh';
        break;
      case '/search':
        document.title = 'Search for products';
        break;
      case '/contact':
        document.title = 'Contact Us for Any Delivery Queries';
        break;
      default:
        document.title = 'Our Website';
        break;
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default RouteHandler;
