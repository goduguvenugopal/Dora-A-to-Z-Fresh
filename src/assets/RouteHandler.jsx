import React, { Component, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const RouteHandler = () => {
  const location = useLocation();

  useEffect(() => {

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
        document.title = 'Welcome to Dora A to Z Fresh';
        break;
    }
  }, [location]);

  return null;
};


// scroll to top custom Component 
export const scrollToTop = () => {
  const location = useLocation()
  // Scroll to the top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return null
}
