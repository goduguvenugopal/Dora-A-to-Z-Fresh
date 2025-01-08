import React, { useContext } from 'react'
import Carousel from "../assets/Carousel"
import Footer from './Footer'
import { dataContext } from '../App'
import { Link } from 'react-router-dom'




const Home = () => {
    const { categories } = useContext(dataContext)


    return (
        <>
            <Carousel />
            <div className='p-3 mt-5'>
                <h5 className='text-center text-2xl font-semibold'>Product Categories</h5>
                <hr className='my-2 border border-orange-500' />
                <div className="mt-5 py-6 grid  grid-cols-2 gap-y-5 gap-x-5 md:gap-y-6 lg:gap-y-6  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

                    {categories?.length > 0 ? <>
                        {categories?.map((item) => (

                            <Link to={item.available === "no" ? "/" : `/products_by/${item.productCategoryName}`} key={item._id} className="group border-2 rounded border-red-300 w-full h-full  md:w-52   lg:w-72   p-3    transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 ">
                                <div className=' relative'>
                                    <img
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
            <div className='mb-9 p-3 bg-orange-100  rounded mt-5 flex justify-around flex-wrap gap-3'>
                <img src="/buffalomilk.jpg" alt="buffalomilk"
                    className='rounded w-full lg:w-[40%]' />
                <div className='w-full lg:w-[45%]'>

                    <h5 className=' text-2xl font-semibold'>Dora A to Z Fresh Milk</h5>
                    <hr className='my-2 border border-orange-500' />
                    <h5 className='my-1 font-semibold text-lg'>Pure, Farm-Fresh Milk Delivered to Your Doorstep</h5>
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