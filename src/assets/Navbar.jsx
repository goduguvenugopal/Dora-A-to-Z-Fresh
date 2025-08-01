import React, { useContext, useEffect, useState } from "react";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import {
  FaBars,
  FaDownload,
  FaHome,
  FaSearch,
  FaShareSquare,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdClose, MdLogin, MdLogout, MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";
import { dataContext } from "../App";
import { Slide, toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const { token, setToken, cartItems, user, setUser } = useContext(dataContext);
  const [offcanvas, setOffcanvas] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [installApp, setInstallApp] = useState(false);

  useEffect(() => {
    // checking whether app installed or not
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("PWA is installed");
      setInstallApp(false);
    } else {
      console.log("PWA is not installed");
      setInstallApp(true);
    }
  }, []);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (offcanvas && !e.target.closest(".offcanvas-menu")) {
        setOffcanvas(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [offcanvas]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos || currentScrollPos < 10) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

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
      <ToastContainer
        position="bottom-center"
        draggable
        transition={Slide}
        theme="dark"
      />
      <div
        className={`bg-red-500 w-[100vw] h-[5.2rem] flex justify-between lg:justify-around px-[0.9rem] fixed top-0 left-0 items-center transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } z-10`}
      >
        <div className="flex items-center justify-center relative">
          <FaBars
            size={25}
            title="open menu"
            className="text-white cursor-pointer"
            onClick={(e) => {
              setOffcanvas(true), e.stopPropagation();
            }}
          />
          <Link
            onClick={() => setOffcanvas(false)}
            to="/search"
            className="text-[1.2rem] absolute top-[0.19rem] left-[3.5rem] lg:left-32"
          >
            <FaSearch size={25} className="text-white cursor-pointer" />
          </Link>
        </div>
        <Link to="/" className="w-[7.5rem] md:w-[7.9rem]">
          <img
            className="md:w-full rounded-full"
            src="/dora-logo.jpeg"
            alt="dora-logo"
          />
        </Link>
        {token ? (
          <Link className="relative" to="/cart">
            <FaCartShopping
              size={25}
              title="Cart"
              className="text-white cursor-pointer"
            />
            <div className="absolute -top-3 right-0 p-2 bg-black w-5 h-5 rounded-full flex justify-center items-center">
              <span className="text-[0.8rem] text-white font-medium">
                {cartItems.length}
              </span>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <FaCartShopping
              size={25}
              title="Cart"
              className="text-white cursor-pointer"
            />
          </Link>
        )}
      </div>

      {/* offcanvas  */}

      <div
        onClick={(e) => e.stopPropagation()}
        className={`offcanvas-menu fixed z-50 top-0 left-0  h-screen w-screen lg:w-[30%] p-2 transform transition-transform duration-300 ${
          offcanvas ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-gray-700 relative flex flex-col gap-4 text-white p-5  h-full w-full rounded-lg">
          <Link
            onClick={() => setOffcanvas(false)}
            to="/"
            className="text-[1.2rem] flex items-center  border-b border-gray-700 hover:border-white gap-3  w-fit"
          >
            <FaHome /> Home
          </Link>
          {token ? (
            <>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/orders"
                className="text-[1.2rem] flex items-center  w-fit gap-[0.9rem] border-b  border-gray-700 hover:border-white"
              >
                {" "}
                <BsFillBoxSeamFill size={17} />
                My Orders{" "}
              </Link>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/profile"
                className="text-[1.2rem] flex items-center  w-fit gap-[0.7rem] border-b  border-gray-700 hover:border-white"
              >
                <CgProfile size={22} /> Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/login"
                className="text-[1.2rem] flex items-center  w-fit gap-[0.9rem] border-b  border-gray-700 hover:border-white"
              >
                {" "}
                <BsFillBoxSeamFill size={17} />
                My Orders{" "}
              </Link>
              <Link
                onClick={() => setOffcanvas(false)}
                to="/login"
                className="text-[1.2rem] flex items-center  w-fit gap-[0.7rem] border-b  border-gray-700 hover:border-white"
              >
                <CgProfile size={22} /> Profile
              </Link>
            </>
          )}
          <Link
            onClick={() => setOffcanvas(false)}
            to="/contact"
            className="text-[1.2rem] flex items-center  w-fit gap-[0.7rem] border-b  border-gray-700 hover:border-white"
          >
            <MdPhone size={22} /> Contact Us
          </Link>
          {token ? (
            <div
              onClick={() => {
                localStorage.removeItem("token");
                setToken("");
                localStorage.removeItem("user");
                setUser({});
                toast.success("logged out", {
                  className: "custom-toast",
                });
                setOffcanvas(false);
              }}
              to="/login"
              className="text-[1.2rem] cursor-pointer flex items-center  w-fit   gap-[0.7rem] border-b  border-gray-700 hover:border-white"
            >
              <MdLogout size={23} /> Log out
            </div>
          ) : (
            <Link
              onClick={() => setOffcanvas(false)}
              to="/login"
              className="text-[1.2rem] flex items-center  w-fit   gap-[0.7rem] border-b  border-gray-700 hover:border-white"
            >
              <MdLogin size={23} /> Login
            </Link>
          )}

          <div className=" absolute left-5 bottom-5 flex flex-wrap gap-3">
            <button
              onClick={shareApp}
              className="bg-blue-600 text-white flex items-center justify-center gap-2 font-semibold h-10 rounded-full w-[11rem]"
            >
              <FaShareSquare className=" text-white" />
              Share App
            </button>
            <a
              href="/Dora A to Z Fresh.apk"
              download="Dora A to Z Fresh.apk"
              className="text-[1.2rem] text-black h-10 hover:bg-gray-200 bg-gray-100 flex justify-center items-center gap-2 rounded-full w-fit  px-5"
            >
              <FaDownload /> Download App
            </a>
          </div>

          <MdClose
            size={25}
            className="absolute right-5 cursor-pointer"
            onClick={() => setOffcanvas(false)}
          />
        </div>
      </div>

      {/* download share app section  */}
      {installApp && (
        <main className="fixed top-0 left-0 p-3 h-screen w-screen bg-black bg-opacity-55 z-20 flex justify-center items-center">
          <section className="container mb-7 px-5 py-10 mx-auto flex items-center md:flex-row flex-col rounded bg-gray-700 lg:w-[50%] relative">
            <span
              className="bg-black rounded text-white cursor-pointer absolute top-2 right-2 p-1"
              onClick={() => setInstallApp(false)}
            >
              <MdClose size={22} />
            </span>
            <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
              <h2 className="text-xs text-orange-300 tracking-widest font-medium title-font mb-1">
                Dora A to Z Fresh
              </h2>
              <h1 className=" text-md font-medium title-font text-white">
                Download our app for a better experience! Get faster access,
                exclusive features, and more.
              </h1>
            </div>
            <div className="flex items-center flex-wrap justify-center gap-3 w-full">
              <a
                href="/Dora A to Z Fresh.apk"
                download="Dora A to Z Fresh.apk"
                className="bg-gray-100 text-center h-10 inline-flex gap-2 text-black py-2 px-5 rounded-full items-center hover:bg-gray-200 focus:outline-none w-[11rem]"
              >
                <FaDownload className="w-4 h-4" />
                <span className="title-font font-medium">Download App</span>
              </a>
              <button
                onClick={shareApp}
                className="bg-blue-600 text-white flex items-center justify-center gap-2 font-semibold h-10 rounded-full w-[11rem]"
              >
                <FaShareSquare className=" text-white" />
                Share App
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Navbar;
