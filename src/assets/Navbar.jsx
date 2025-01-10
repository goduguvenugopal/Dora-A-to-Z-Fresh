import React, { useContext, useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaBars, FaDownload, FaHome, FaSearch } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { MdClose, MdPerson, MdPhone } from 'react-icons/md';
import { Link } from 'react-router-dom';



const Navbar = () => {
  const [offcanvas, setOffcanvas] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);


  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (offcanvas && !e.target.closest('.offcanvas-menu')) {
        setOffcanvas(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {

      document.removeEventListener('click', handleDocumentClick);
    };
  }, [offcanvas]);

  useEffect(() => {
    const handleScroll = () => {

      const currentScrollPos = window.scrollY

      if (prevScrollPos > currentScrollPos || currentScrollPos < 10) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
      setPrevScrollPos(currentScrollPos);

    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)

    }
  }, [prevScrollPos])




  return (
    <>
      <div className={`bg-red-500 w-[100vw] h-[5.2rem] flex justify-between lg:justify-around px-[0.9rem] fixed top-0 left-0 items-center transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'} z-10`}>
        <div className='flex items-center justify-center relative'>
          <FaBars size={25} title='open menu' className="text-white cursor-pointer" onClick={(e) => { setOffcanvas(true), e.stopPropagation() }} />
          <Link onClick={() => setOffcanvas(false)} to="/search" className='text-[1.2rem] absolute top-[0.19rem] left-[3.5rem] lg:left-32'>
            <FaSearch size={25} className="text-white cursor-pointer" />
          </Link>
        </div>
        <Link to="/" className="w-[7.5rem] md:w-[7.9rem]">
          <img className="md:w-full rounded-full" src="/dora-logo.jpeg" alt="dora-logo" />
        </Link>
        <Link to="/cart">
          <FaCartShopping
            size={25}
            title="Cart"
            className="text-white cursor-pointer"
          />

        </Link>
      </div>

      {/* offcanvas  */}

      <div onClick={(e) => e.stopPropagation()} className={`offcanvas-menu fixed z-50 top-0 left-0  h-screen w-screen lg:w-[30%] p-2 transform transition-transform duration-300 ${offcanvas ? "translate-x-0" : "-translate-x-full"}`}>
        <div className='bg-gray-700 relative flex flex-col gap-4 text-white p-5  h-full w-full rounded-lg'>
          <Link onClick={() => setOffcanvas(false)} to="/" className='text-[1.2rem] flex items-center gap-2'><FaHome /> Home</Link>
          <Link onClick={() => setOffcanvas(false)} to="/contact" className='text-[1.2rem] flex items-center gap-2'><MdPhone /> Contact Us</Link>
          <Link onClick={() => setOffcanvas(false)} to="/profile" className='text-[1.2rem] flex items-center gap-2'><MdPerson /> Profile</Link>


          {/*  <Link onClick={() => setOffcanvas(false)} to="/products" className='text-[1.2rem]'>Update Products</Link>
          <Link onClick={() => setOffcanvas(false)} to="/uploadproducts" className='text-[1.2rem]'>Add Products</Link>
          <Link onClick={() => setOffcanvas(false)} to="/carousel" className='text-[1.2rem]'>Add Offer Images</Link>
          <Link onClick={() => setOffcanvas(false)} to="/addcategory" className='text-[1.2rem]'>Add New Category</Link>
          <Link onClick={() => setOffcanvas(false)} to="/admin" className='text-[1.2rem]'>Admin</Link>
          */}
          <a href='/Dora A to Z Fresh.apk' download="Dora A to Z Fresh.apk" className='text-[1.2rem] absolute left-5 bottom-5 h-10 bg-blue-600 flex justify-center items-center gap-2 rounded-full w-fit hover:bg-blue-800 px-5'><FaDownload />  Download App</a>

          <MdClose size={25} className='absolute right-5 cursor-pointer' onClick={() => setOffcanvas(false)} />
        </div>
      </div>


    </>
  );
};

export default Navbar;
