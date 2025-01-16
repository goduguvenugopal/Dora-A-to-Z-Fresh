import React, { useContext, useEffect, useState } from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { Link, useFetcher } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const Cart = () => {
  

 
  return (

    <>
    </>
    // <>
    //   <ToastContainer position='bottom-center' theme='dark' />
    //   <section className="text-gray-600 body-font overflow-hidden">
    //     {cart.length ? <>
    //       <div className="container px-5 py-24 mx-auto ">
    //         <div className="-my-7 divide-y-2 divide-gray-100">
    //           {cart.map((item) => (
    //             <div key={item.id} className="py-8 flex gap-x-6 flex-nowrap">
    //               <Link className='flex  ' to={`/product_over_view/${item._id}`} >

    //                 <img src={item.bookImage} alt={item.title} className='w-[9rem] h-[10rem]  lg:w-[15rem] lg:h-[16rem] rounded' />
    //               </Link>

    //               <div className='flex flex-col items-start'>
    //                 <Link to={`/product_over_view/${item._id}`} className="flex gap-1 mb-3 justify-start  items-start ">

    //                   {
    //                     item.itemType === "other" ?
    //                       <span className='hidden lg:block  text-sm lg:text-xl font-semibold'>{item.bookName.substring(0, 25)}...</span>
    //                       :
    //                       <span className='hidden lg:block  text-sm lg:text-xl font-semibold'>Book Name : {item.bookName.substring(0, 25)}...</span>
    //                   }
    //                   <span className='block lg:hidden text-sm  font-semibold'>{item.bookName.substring(0, 15)}...</span>
    //                 </Link>
    //                 <div className='items-center mt-2 flex gap-2'>

    //                   <h6 className='mb-1 font-semibold capitalize '>qty</h6>

    //                   <div className='flex gap-3 items-center'>
    //                     <button onClick={() => priceDec(item._id, item.bookName)} className="border-orange-500 hover:border-orange-700 text-orange-700 border-2 text-center font-semibold rounded-full  py-1  pl-3 pr-3" disabled={item.qty === 1 && "true"}>
    //                       <FaMinus size={15} />
    //                     </button>
    //                     <h5 className='font-semibold'>{item.qty}</h5>
    //                     <button onClick={() => priceInc(item._id, item.bookName)} className="border-orange-500 hover:border-orange-700 text-orange-700 border-2 text-center font-semibold rounded-full  py-1  pl-3 pr-3">
    //                       <FaPlus size={15} />
    //                     </button>
    //                   </div>
    //                 </div>
    //                 <h6 className="mt-3 title-font font-medium text-2xl text-gray-900">
    //                   ₹{(item.bookPrice * item.qty).toLocaleString("en-IN")}
    //                 </h6>

    //                 <button onClick={() => removeItem(item._id, item.bookName)} className="font-semibold border-2 p-1 bg-red-600 rounded-full  hover:text-white border-none w-32 text-center text-white mt-4">
    //                   REMOVE
    //                 </button>
    //               </div>



    //             </div>

    //           ))}

    //         </div>
    //         {/* place order out card  */}
    //         <div className='pt-10 lg:pt-0 lg:fixed lg:top-[3.5rem] lg:right-0 bg-white '>
    //           <div class="lg:w-[24rem] lg:h-[100vh] lg:mx-auto bg-white lg:shadow-md rounded-lg lg:p-6 lg:border">
    //             <h2 class="text-gray-700 font-bold text-lg mb-4">PRICE DETAILS</h2>
    //             <div class="flex justify-between py-2 border-b">
    //               <span class="text-gray-900">Price ({cart.length} items)</span>
    //               <span class="font-semibold text-gray-700">₹{itemsAmount.toLocaleString("en-IN")}</span>
    //             </div>

               
    //             <div class="flex justify-between py-4 border-t mt-4">
    //               <span class="font-semibold text-lg text-gray-700">Total Amount</span>
    //               <span class="font-bold text-lg text-gray-700">₹{itemsAmount.toLocaleString("en-IN")}</span>
    //             </div>
    //             <Link to="/order" class="mt-2">
    //               <button className='w-full bg-orange-500 text-white h-[3rem] rounded text-lg font-semibold hover:bg-orange-700'>PLACE ORDER</button>
    //             </Link>

    //             <h5 className='text-md text-center mt-3 font-semibold'>or <Link to="/" className='text-blue-700 font-medium'>Continue Shopping</Link></h5>
    //           </div>

    //         </div>


    //       </div>
    //     </> : <div className='h-[100vh] w-full flex justify-center flex-col gap-2 items-center font-semibold text-xl'>
    //       Cart Is Empty
    //       <Link to="/" className='text-white px-3 py-[0.2rem] rounded-full text-[0.9rem]  font-medium bg-blue-500'>Continue Shopping</Link>
    //     </div>}
    //   </section>


    // </>
  )
}

export default Cart