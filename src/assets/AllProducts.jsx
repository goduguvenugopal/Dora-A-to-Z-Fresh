import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dataContext } from '../App'
import Footer from './Footer'




const AllProducts = () => {
  const { category } = useParams()
  const { products } = useContext(dataContext)
  const [categoryItems, setCategoryItems] = useState([])


  console.log(products);

  useEffect(() => {
    const results = products.filter((item) => item.itemCategory?.toLowerCase().includes(category.toLowerCase()))
    setCategoryItems(results)
  }, [category, products])

  return (
    <>
    <div className='p-3 mt-3 mb-7 pt-24'>
      <h5 className='text-center text-2xl font-semibold capitalize'>{category} Products</h5>
      <hr className='my-2 border border-orange-500' />

      <div className="mt-8 w-full grid grid-cols-2 gap-y-6 gap-x-5 md:gap-y-7 lg:gap-y-6  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

        {categoryItems.length ? <>
          {categoryItems.map((item) => (

            <div key={item._id} className="group border-2 rounded border-red-300 w-full h-full  md:w-52   lg:w-72   p-3 relative  hover:opacity-85">
              <Link to={`/product_over_view/${item._id}`} className=''>
                <img
                  src={item.itemImage[0]}
                  alt={item.itemName}
                  className="h-fit w-full rounded"
                />
              </Link>

              <div className="mt-2 text-center">

                <h3 className="text-[0.9rem]  text-gray-700">

                  {item?.itemName?.substring(0, 35)}..
                </h3>
                <span className='text-lg font-semibold'>₹{item?.itemCost}</span>

              </div>
            </div>
          ))}
        </> :
          <div className="text-lg font-medium flex justify-center items-center min-h-svh w-[95vw]">
            No Products
          </div>
        }
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default AllProducts