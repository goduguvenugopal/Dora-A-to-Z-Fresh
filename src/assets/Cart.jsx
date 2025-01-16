import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { dataContext } from '../App';
import { Link } from 'react-router-dom';


const Cart = () => {
  const { cartItems, setCartItems } = useContext(dataContext)



  return (

    <>
      <ToastContainer position='bottom-center' theme='dark' />
      <section className="text-gray-600 body-font overflow-hidden">
        {cartItems?.length ? <>
          <div className="container px-5 py-24 mx-auto ">
            <div className="-my-7 divide-y-2 divide-gray-100">
              {cartItems?.map((item) => (
                <div key={item.id} className="py-8 flex gap-x-6 flex-nowrap">
                  <Link className='flex w-[10rem]   lg:w-[15rem] ' to={`/product_over_view/${item.productId}`} >

                    <img src={item?.products[0].itemImage[0]} alt={item.itemName} className='w-full h-full
                    rounded-lg' />
                  </Link>
                  {/* details section  */}
                  <div className='flex flex-col items-start w-[10rem]  lg:w-[15rem]'>
                    <Link to={`/product_over_view/${item.productId}`} className="flex gap-1 mb-2 justify-start  items-start ">
                      <span className='text-sm lg:text-xl font-semibold'>{item.products[0].itemName.substring(0,20)}...</span>
                    </Link>
                    <h6 className="text-lg lg:text-2xl mb-2 text-gray-700 font-medium">
                    Rs. {item.totalAmount}
                    </h6>
                    <div className='items-center mt-2 flex gap-2'>

                      <h6 className='mb-1 font-semibold capitalize '>qty</h6>

                      <div className='flex items-center justify-center p-1 rounded border-2 border-gray-500 w-7 h-7'>
                        <h5 className='font-semibold'>{item.products[0].itemQty}</h5>
                      </div>

                    </div>


                    <button className="font-semibold border-2 p-1 bg-red-600 rounded-full  hover:text-white border-none w-32 text-center text-white mt-4">
                      REMOVE
                    </button>
                  </div>



                </div>

              ))}

            </div>
            {/* place order out card  */}
            <div className='pt-10 lg:pt-0 lg:fixed  lg:top-0 lg:right-0 bg-white '>
              <div class="lg:w-[24rem] lg:h-[100vh] lg:mx-auto bg-white lg:shadow-md  lg:p-6 lg:border lg:pt-24">
                <h2 class="text-gray-700 font-bold text-lg mb-4">PRICE DETAILS</h2>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-900">Price ({cartItems?.length} items)</span>
                  <span class="font-semibold text-gray-700">526</span>
                </div>


                <div class="flex justify-between py-4 border-t mt-4">
                  <span class="font-semibold text-lg text-gray-700">Total Amount</span>
                  <span class="font-bold text-lg text-gray-700"> </span>
                </div>
                <Link to="/order" class="mt-2">
                  <button className='w-full bg-orange-500 text-white h-[3rem] rounded text-lg font-semibold hover:bg-orange-700'>PLACE ORDER</button>
                </Link>

                <h5 className='text-md text-center mt-3 font-semibold'>or <Link to="/" className='text-blue-700 font-medium'>Continue Shopping</Link></h5>
              </div>

            </div>


          </div>
        </> : <div className='h-[100vh] w-full flex justify-center flex-col gap-2 items-center font-semibold text-xl'>
          Cart Is Empty
          <Link to="/" className='text-white px-3 py-[0.2rem] rounded-full text-[0.9rem]  font-medium bg-blue-500'>Continue Shopping</Link>
        </div>}
      </section>


    </>
  )
}

export default Cart