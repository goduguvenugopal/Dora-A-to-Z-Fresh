import React, { useContext } from 'react'
import Carousel from "../assets/Carousel"
import Footer from './Footer'
import { dataContext } from '../App'
import { Link } from 'react-router-dom'
import { FaDownload, FaShareSquare } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'



const Home = () => {
    const { categories } = useContext(dataContext)


    // share app function 
    const shareApp = async () => {
        try {
            await navigator.share(({
                text: "Shop fresh and pure products directly from trusted farmers with Dora A to Z Fresh! Experience quality you can trust. :",
                url: "https://doraatozfresh.vercel.app"
            }))
        } catch (error) {
            console.error(error);

        }
    }
    return (
        <>
            <Carousel />
            <div className='p-3 mt-5'>
                <h5 className='text-center text-2xl font-semibold'>Product Categories</h5>
                <hr className='my-2 border border-orange-500' />
                <div className="mt-4 py-6 grid  grid-cols-2 gap-y-5 gap-x-5 md:gap-y-6 lg:gap-y-6  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

                    {categories?.length > 0 ? <>
                        {categories?.map((item) => (

                            <Link to={item.available === "no" ? "/" : `/products_by/${item.productCategoryName}`} key={item._id} className="group border-2 rounded border-red-300 w-full h-full  md:w-52   lg:w-72   p-3    transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 ">
                                <div className=' relative'>
                                    <LazyLoadImage
                                        effect='blur'
                                        src={item?.productImage}
                                        alt={item?.productCategoryName}
                                        className="h-fit w-full rounded "
                                    />
                                    {item.available === "no" && (
                                        <div className='absolute flex items-center justify-center  top-0 left-0 w-full h-full bg-black bg-opacity-0  text-white '>
                                            <span className='bg-black text-white bg-opacity-55 rounded p-1 text-lg lg:text-2xl'>
                                                Available Soon
                                            </span>
                                        </div>
                                    )}

                                </div>

                                <div className="mt-2 text-center">

                                    <h3 className="text-lg capitalize  text-gray-800">

                                        {item?.productCategoryName}
                                    </h3>

                                </div>
                            </Link>
                        ))}
                    </> :
                        <div className="text-lg font-medium text-center w-screen">
                            No Products
                        </div>
                    }
                </div>

            </div>

            {/* download share app section  */}
            <section className="container mb-7 px-5 py-10 mx-auto flex items-center md:flex-row flex-col bg-gray-700">
                <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                    <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                        Dora A to Z Fresh
                    </h2>
                    <h1 className=" text-md font-medium title-font text-white">
                        Download our app for a better experience! Get faster access, exclusive features, and more.

                    </h1>
                </div>
                <div className="flex items-center flex-wrap justify-center gap-3 w-full">
                    <a href='/Dora A to Z Fresh.apk' download="Dora A to Z Fresh.apk" className="bg-gray-100 text-center h-10 inline-flex gap-2 text-black py-2 px-5 rounded-full items-center hover:bg-gray-200 focus:outline-none w-[11rem]">
                        <FaDownload

                            className="w-4 h-4"

                        />
                        <span className="title-font font-medium">Download App</span>

                    </a>
                    <button onClick={shareApp} className='bg-blue-600 text-white flex items-center justify-center gap-2 font-semibold h-10 rounded-full w-[11rem]'>

                        <FaShareSquare className=' text-white' />Share App
                    </button>

                </div>
            </section>


            {/* milk description section  */}
            <div className='mb-9 p-3 bg-orange-100  rounded mt-5 flex justify-around flex-wrap gap-3'>
                <img src="/buffalomilk.jpg" alt="buffalomilk"
                    className='rounded w-full lg:w-[40%]' />
                <div className='w-full lg:w-[45%]'>

                    <h5 className=' text-2xl font-semibold'>Dora A to Z Fresh Milk</h5>
                    <hr className='my-2 border border-orange-500' />
                    <h5 className='my-1 text-orange-600 font-semibold text-lg'>Pure, Farm-Fresh Milk Delivered to Your Doorstep</h5>
                    <p className='text-lg font-sans'>
                        Welcome to Dora A to Z Fresh, where we deliver pure, farm-fresh milk straight to your doorstep. Sourced directly from trusted farmers, our milk is 100% natural, raw, and unprocessed, ensuring the highest quality and nutrition. Free from additives and preservatives, our milk retains its natural taste and goodness. With ethical farming practices and convenient home delivery, Dora A to Z Fresh brings the wholesome purity of nature right to your home.
                    </p>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Home