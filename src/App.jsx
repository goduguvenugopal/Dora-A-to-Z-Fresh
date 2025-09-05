import React, {
  useState,
  createContext,
  useEffect,
  lazy,
  Suspense,
} from "react";
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
import { Loading } from "./assets/Loading";
import AllProducts from "./assets/AllProducts";
import ProductOverView from "./assets/ProductOverView";
import "react-lazy-load-image-component/src/effects/blur.css";
// lazy load imports
const Orders = lazy(() => import("./assets/Orders"));
const Profile = lazy(() => import("./assets/Profile"));
const Login = lazy(() => import("./assets/Login"));
const OrderCheckOut = lazy(() => import("./assets/OrderCheckOut"));
const OrderOverView = lazy(() => import("./assets/OrderOverView"));
const ProdutReviewsForm = lazy(() => import("./assets/ProdutReviewsForm"));

export const dataContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const api = import.meta.env.VITE_API;
  const reviews_api = import.meta.env.VITE_REVIEWS_API;
  const number = import.meta.env.VITE_NUMBER;
  const analytics_api = import.meta.env.VITE_ANALYTICS_API;
  const [carousel, setCarousel] = useState({});
  const [products, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});
  const [defaultAddress, setDefaultAddress] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);
  RouteHandler(cartItems);
  const todayDate = new Date().toLocaleDateString("en-GB");

  //  Daily Unique Visitors Tracker
  useEffect(() => {
    const sendVisitorId = async (visitorId) => {
      try {
        const res = await axios.post(`${analytics_api}/analytics/api/visit`, {
          visitorId,
        });
        if (res) {
          localStorage.setItem("todayDate", JSON.stringify(todayDate));
        }
      } catch (error) {
        console.error("Error sending visitor ID:", error);
      }
    };

    const visitorId = localStorage.getItem("visitorId");
    const storedDate = localStorage.getItem("todayDate");

    if (!visitorId && !storedDate) {
      const randomVisitorId = crypto.randomUUID();
      localStorage.setItem("todayDate", JSON.stringify(todayDate));
      localStorage.setItem("visitorId", JSON.stringify(randomVisitorId));
      sendVisitorId(randomVisitorId);
    } else {
      const parsedDate = JSON.parse(storedDate);
      if (parsedDate !== todayDate) {
        const parsedId = JSON.parse(visitorId);
        sendVisitorId(parsedId);
      }
    }
  }, []);

  useEffect(() => {
    // retrieving token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    }
    // retrieving address from localStorage
    const address = localStorage.getItem("address");
    if (address) {
      setDefaultAddress(JSON.parse(address));
    }

    // retrieving user details
    const userDetails = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(userDetails));
    }

    // retrieving reviewed products from session storage
    const isViewdedProducts = localStorage.getItem("viewedProducts");
    if (isViewdedProducts) {
      setViewedProducts(JSON.parse(isViewdedProducts));
    }
  }, []);

  useEffect(() => {
    // fetching user details
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${api}/user/get-single-user`, {
          headers: {
            token: token,
          },
        });
        if (response) {
          setUser(response.data.singleUser);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.singleUser)
          );
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          localStorage.removeItem("token");
          localStorage.removeItem("address");
          localStorage.removeItem("user");
          setToken("");
          setDefaultAddress([]);
          setUser({});
        }
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, carouselRes, categoriesRes, discountRes] =
          await Promise.all([
            axios.get(`${api}/product/get-all-products`),
            axios.get(`${api}/carousel/get-carousel`),
            axios.get(`${api}/category/get-category-products`),
            axios.get(`${api}/offer/get-offer`),
          ]);

        // set data from responses
        if (productsRes)
          setProducts(productsRes.data.retrievdProducts.reverse());
        if (carouselRes) setCarousel(carouselRes.data.retrievedCarousel[0]);
        if (categoriesRes) setCategories(categoriesRes.data.retrievedProducts);
        if (discountRes) setDiscount(discountRes.data.offers[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setSpinner(false); // stop spinner once all requests finish
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // fetching cart products
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${api}/cart/get-user-cart-products`, {
          headers: {
            token: token,
          },
        });
        if (res) {
          setCartItems(res.data.retrievdProducts.reverse());
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchCartItems();
    }
  }, [token]);

  if (spinner) {
    return <Loading />;
  }

  return (
    // useContext provider wrapped to child components for state management
    <dataContext.Provider
      value={{
        api,
        reviews_api,
        number,
        carousel,
        setCarousel,
        products,
        setProducts,
        categories,
        setCategories,
        token,
        setToken,
        user,
        setUser,
        defaultAddress,
        setDefaultAddress,
        cartItems,
        setCartItems,
        discount,
        setDiscount,
        orderProducts,
        setOrderProducts,
        orders,
        setOrders,
        viewedProducts,
        setViewedProducts,
      }}
    >
      <Navbar />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products_by_category/:category"
            element={<AllProducts />}
          />
          <Route
            path="/product_over_view/:itemId"
            element={<ProductOverView />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/reviewform" element={<ProdutReviewsForm />} />
          <Route path="/search" element={<Search />} />
          <Route path="/order_check_out" element={<OrderCheckOut />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/orders/order_over_view/:orderId"
            element={<OrderOverView />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </dataContext.Provider>
  );
}

export default App;
