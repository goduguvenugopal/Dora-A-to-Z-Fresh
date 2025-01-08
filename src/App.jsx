import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/Navbar";
import PageNotFound from "./assets/PageNotFound";
import Home from "./assets/Home";
import Cart from "./assets/Cart";
import ContactUs from "./assets/ContactUs";
import RouteHandler from "./assets/RouteHandler";
import Search from "./assets/Search";
import axios from "axios";
import Profile from "./assets/Profile";
import { Loading } from "./assets/Loading"
import AllProducts from "./assets/AllProducts"

export const dataContext = createContext();

function App() {
  const api = import.meta.env.VITE_API;
  const [carousel, setCarousel] = useState({});
  const [products, setProducts] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [categories, setCategories] = useState([])


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
          setSpinner(false)

        }
      } catch (error) {
        console.error(error);

      }
    }
    fetchAllCategories()
  }, [])

  if (spinner) {
    return (<Loading />)
  }

  return (
    <dataContext.Provider value={{
      api,
      carousel, setCarousel,
      products, setProducts,
      categories, setCategories
    }}>
      <RouteHandler />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products_by/:category" element={<AllProducts/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </dataContext.Provider>
  );
}

export default App;
