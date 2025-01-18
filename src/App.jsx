import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/Navbar";
import PageNotFound from "./assets/PageNotFound";
import Home from "./assets/Home";
import Cart from "./assets/Cart";
import ContactUs from "./assets/ContactUs";
import { RouteHandler } from "./assets/RouteHandler";
import Search from "./assets/Search";
import axios from "axios";
import Profile from "./assets/Profile";
import { Loading } from "./assets/Loading"
import AllProducts from "./assets/AllProducts"
import ProductOverView from "./assets/ProductOverView"
import 'react-lazy-load-image-component/src/effects/blur.css';
import Orders from "./assets/Orders";
import Login from "./assets/Login";



export const dataContext = createContext();

function App() {
  RouteHandler()
  const [token, setToken] = useState("")
  const api = import.meta.env.VITE_API;
  const [carousel, setCarousel] = useState({});
  const [products, setProducts] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState({})
  const [defaultAddress, setDefaultAddress] = useState([])
  const [cartItems, setCartItems] = useState([])



  useEffect(() => {
    // retrieving token from localStorage
    const token = localStorage.getItem("token")
    if (token) {
      setToken(JSON.parse(token))
    }
    // retrieving address from localStorage
    const address = localStorage.getItem("address")
    if (address) {
      setDefaultAddress(JSON.parse(address))
    }
  }, [])

  // fetching all products 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setSpinner(true)
        const res = await axios.get(`${api}/product/get-all-products`)
        if (res) {
          setProducts(res.data.retrievdProducts.reverse())

        }
      } catch (error) {
        console.error(error);

      }
    }
    fetchProducts()

    // fetching all categories
    const fetchAllCategories = async () => {
      try {

        const res = await axios.get(`${api}/category/get-category-products`)
        if (res) {
          setCategories(res.data.retrievedProducts)

        }
      } catch (error) {
        console.error(error);

      }
    }
    fetchAllCategories()

    // fetching carousel 
    const getCarousel = async () => {
      try {
        const res = await axios.get(`${api}/carousel/get-carousel`);
        if (res) {
          setCarousel(res.data.retrievedCarousel[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCarousel();

  }, [])

  useEffect(() => {
    // fetching cart products
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${api}/cart/get-user-cart-products`, {
          headers: {
            token: token
          }
        })
        if (res) {
          console.log(res.data.retrievdProducts.reverse());
          setCartItems(res.data.retrievdProducts.reverse())
          setSpinner(false)
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (token) {
      fetchCartItems()
    }
  }, [token])


  if (spinner) {
    return (<Loading />)
  }

  return (
    // useContext provider wrapped to child components for state management 
    <dataContext.Provider value={{
      api,
      carousel, setCarousel,
      products, setProducts,
      categories, setCategories,
      token, setToken,
      user, setUser,
      defaultAddress, setDefaultAddress,
      cartItems, setCartItems
    }}>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products_by_category/:category" element={<AllProducts />} />
        <Route path="/product_over_view/:itemId" element={<ProductOverView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </dataContext.Provider>
  );
}

export default App;
