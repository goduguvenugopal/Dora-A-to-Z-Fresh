import React, { useContext, useState, useEffect } from "react";
import Carousel from "../assets/Carousel";
import Footer from "./Footer";
import { dataContext } from "../App";
import { Link } from "react-router-dom";
import { FaDownload, FaShareSquare } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Faq from "./Faq";
import { MdClose } from "react-icons/md";
import InstallApp from "./InstallApp";
import Promotions from "./Promotions";
import RecentlyViewedProducts from "./recentlyViewedProducts";

const Home = () => {
  const { categories } = useContext(dataContext);
  const { carousel } = useContext(dataContext);
  const [images, setImages] = useState([]);
  const [lastImg, setLastImg] = useState(images?.length);
  const [toggle, setToggle] = useState(null);

  useEffect(() => {
    setImages(carousel?.carouselImage?.reverse());
  }, [carousel]);

  useEffect(() => {
    const toggleValue = sessionStorage.getItem("offerpopup");
    const parsedValue = JSON.parse(toggleValue);
    if (parsedValue === false) {
      setToggle(false);
    } else {
      sessionStorage.setItem("offerpopup", JSON.stringify(true));
      setToggle(true);
    }
  }, []);

  const removePopUp = () => {
    sessionStorage.setItem("offerpopup", JSON.stringify(false));
    setToggle(false);
  };

  // share app function
  const shareApp = async () => {
    try {
      await navigator.share({
        text: "Dora A to Z Fresh - Your one-stop shop for fresh milk, groceries, and all your needs, delivered to your doorstep with quality assurance. Shop now! :",
        url: "https://doraatozfresh.vercel.app",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* offer pop card  */}
      {toggle && images?.length > 0 ? (
        <div className="bg-black fixed  flex p-3  justify-center items-center lg:items-start top-0 left-0 h-full w-full bg-opacity-50 z-10">
          <div className="bg-white  p-1 text-center relative scrollbar-hide-card h-[80%] md:h-full lg:h-full lg:w-[50%] overflow-auto rounded pb-5">
            <span
              onClick={removePopUp}
              className="absolute bg-black hover:bg-black bg-opacity-65 text-white rounded w-8 h-8 flex justify-center items-center font-medium top-1 right-1 cursor-pointer"
            >
              <MdClose size={25} />
            </span>
            <div className="w-full h-fit bg-white rounded ">
              <img
                src={images[lastImg]}
                alt="offer-poster"
                className="w-full h-fit rounded"
              />
            </div>
            <p className="mt-5 mx-2 capitalize font-serif text-green-600 font-semibold">
              {carousel?.offerTitle}
            </p>
            <button
              onClick={removePopUp}
              className="w-[40%] py-2 mt-3 font-medium bg-blue-500 text-white rounded-3xl"
            >
              Shop now
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* categories section  */}
      <Carousel />
      <div className="p-3 mt-5">
        <h5 className="text-center text-2xl font-semibold">
          Product Categories
        </h5>
        <hr className="my-2 border border-orange-500" />
        <div className="mt-4 py-6 grid  grid-cols-2 gap-y-5 gap-x-5 md:gap-y-6 lg:gap-y-6  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {categories?.length > 0 ? (
            <>
              {categories?.map((item) => (
                <Link
                  to={
                    item.available === "no"
                      ? "/"
                      : `/products_by_category/${item.productCategoryName}`
                  }
                  key={item._id}
                  className="group w-full h-full  md:w-52   lg:w-72   transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 "
                >
                  <div className=" relative">
                    <LazyLoadImage
                      effect="blur"
                      src={item?.productImage}
                      alt={item?.productCategoryName}
                      className="h-fit w-full rounded-lg "
                    />
                    {item.available === "no" && (
                      <div className="absolute flex items-center justify-center  top-0 left-0 w-full h-full bg-black bg-opacity-0  text-white ">
                        <span className="bg-black text-white bg-opacity-55 rounded p-1 text-lg lg:text-2xl">
                          Available Soon
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-2 text-center">
                    <h3 className="text-lg capitalize font-medium text-gray-800">
                      {item?.productCategoryName}
                    </h3>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div className="text-lg font-medium text-center w-screen">
              No Products
            </div>
          )}
        </div>
      </div>

{/* recently viewed products component  */}
<RecentlyViewedProducts/>

      {/* download share app section  */}
      <InstallApp />

      {/* milk description section  */}
      <div className="mb-4 p-3 bg-orange-100  rounded mt-5 flex justify-around flex-wrap gap-3">
        <img
          src="/buffalomilk.jpg"
          alt="buffalomilk"
          className="rounded w-full lg:w-[40%]"
        />
        <div className="w-full lg:w-[45%]">
          <h5 className=" text-2xl font-semibold">Dora A to Z Fresh Milk</h5>
          <hr className="my-2 border border-orange-500" />
          <h5 className="my-1 text-orange-600 font-semibold text-lg">
            Pure, Farm-Fresh Milk Delivered to Your Doorstep
          </h5>
          <p className="text-lg font-sans">
            Welcome to Dora A to Z Fresh, where we deliver pure, farm-fresh milk
            straight to your doorstep. Sourced directly from trusted farmers,
            our milk is 100% natural, raw, and unprocessed, ensuring the highest
            quality and nutrition. Free from additives and preservatives, our
            milk retains its natural taste and goodness. With ethical farming
            practices and convenient home delivery, Dora A to Z Fresh brings the
            wholesome purity of nature right to your home.
          </p>
        </div>
      </div>

      {/* <Promotions /> */}

      <Faq />
      <Footer />
    </>
  );
};

export default Home;
