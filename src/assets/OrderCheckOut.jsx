import React, { useContext, useEffect, useState } from 'react'
import { FaCircleCheck, FaDownload, FaUpload, FaWhatsapp } from 'react-icons/fa6'
import { dataContext } from "../App"
import axios from 'axios'


const OrderCheckOut = () => {
  const { orderProducts, api, defaultAddress, cartItems, discounts } = useContext(dataContext)
  const [orderOk, setOrderOk] = useState(false)


 console.log(orderProducts);
 

  return (

    <div className="mt-20 py-5 px-3 pb-10">
       
          <div className=" flex flex-wrap gap-5 lg:gap-0 justify-around ">
           
            {/* shpping address details section  */}
            <div className='flex p-3 flex-col w-full lg:w-[29%] text-black  shadow-md shadow-gray-300 rounded-lg bg-white relative  items-start gap-1  '>
            <h2 className="font-bold  text-orange-600">
              SHIPPING DETAILS
            </h2>
              <h5 className='font-medium capitalize ' >{defaultAddress[0]?.name}   </h5>
              <h6 className='font-medium capitalize'>{defaultAddress[0]?.phone} </h6>
              <h6 className=' text-gray-500'>{defaultAddress[0]?.email} </h6>
              <h6 className='capitalize font-semibold'>{defaultAddress[0]?.village}, {defaultAddress[0]?.district}</h6>
              <h6 className='capitalize text-gray-500'>{defaultAddress[0]?.street} </h6>
              <h6 className='font-medium capitalize'>{defaultAddress[0]?.state}, {defaultAddress[0]?.postalCode} </h6>
            </div>


                {/* order product charges and total amount section  */}
            <div className="p-3 flex flex-col w-full lg:w-[34%]  items-center  shadow-md shadow-gray-300 rounded-lg">
               
                <h2 className="font-bold  text-orange-600">
                  PAYMENT DETAILS
                </h2>
                <h4 className='font-medium'>SCAN QR CODE</h4>
                <img
                  src="/qrcode.jpg"
                  alt="qr_code"
                  className="border-2 my-2 h-52 w-52 rounded "
                />
                {/* <span className='font-bold mb-1'>OR</span> */}
                <img src="/allpayments.png" className='w-[60%] mb-1 ' alt="all_upi_logo" />
                <h6 className='text-blue-600 font-bold'>PAY TO THIS NUMBER</h6>
                <span className='font-bold my-1'>8500961256</span>
                <h4 className='text-center'>Banking Name : <span className='font-bold '>KANCHARLA SUDHA MADHURI</span></h4>

                <a href="/qrcode.jpg" className=' animate-bounce text-md font-semibold px-3 h-[2.5rem] mt-6 flex items-center gap-2 rounded-full text-white bg-orange-600' download="/qrcode.jpg"><FaDownload />Download QR Code</a>

                <>
                  <div class="flex justify-between py-2 pt-4 border-b w-full px-5 ">
                    <span class="text-gray-900">Price ({cartItems.length} items)</span>
                    <span class="font-semibold text-gray-700">₹{orderProducts[0]?.totalAmount?.toLocaleString("en-IN")}</span>
                  </div>

                  <div class="flex justify-between py-3 border-b w-full px-5">
                    <span class="text-gray-900">Delivery Charges</span>
                    <div class="flex items-center">
                      <span class="font-semibold text-gray-700">₹{discounts?.deliverCharges}</span>

                    </div>
                  </div>

                  <h3 className="font-semibold mt-3 text-xl  ">
                    TOTAL COST :
                    <span className="text-black pl-1">₹5258.00</span>
                  </h3>
                  <h5 className='mt-2 '><span className='font-bold text-red-500'>Note : </span>Orders will be processed only after full payment. Please send the payment receipt to given below WhatsApp number the same day of the order.

                  </h5>
                  <a href='https://wa.me/918500961256' className='text-green-700 font-bold flex items-center gap-1 '> <FaWhatsapp size={21} /> 8500961256</a>
                  <button type='submit' className="mt-4  bg-yellow-500 hover:bg-yellow-700 text-white w-full font-bold h-12 rounded-full"
                  >
                    PLACE ORDER
                  </button>
                </>
            </div>
       
          {/* order product details section  */}
          <details className="p-3 w-full lg:w-[34%]  shadow-md shadow-gray-300 rounded-lg">
            <summary className="font-bold mb-4 cursor-pointer text-orange-600">
              PRODUCT DETAILS
            </summary>
            <div className=" rounded w-full flex flex-col gap-2">
              {orderProducts?.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 overflow-hidden pb-3 border-b border-gray-400"
                >
                  <img
                    src={item?.products[0]?.itemImage[0]}
                    className="h-auto w-[9rem] rounded-lg"
                    alt="Book 1"
                  />
                  <div>
                    <p className="font-semibold w-full md:w-[13rem] overflow-x-auto">
                      <span className="font-medium hidden  lg:block  text-black  ">
                        {item?.products[0]?.itemName.substring(0, 20)}
                      </span>
                      <span className="font-medium block lg:hidden  text-black  ">
                      {item?.products[0]?.itemName.substring(0, 12)}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Price :
                      <span className="font-medium text-black pl-1">
                        ₹{item.totalAmount}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Quantity :
                      <span className="font-medium text-black pl-1">
                        {item.itemQty}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>


          </details>
       
      </div>


      {/* order  progress spinner  */}
      {/* {orderSpin && <div className='fixed flex justify-center h-screen w-screen items-center top-0 left-0 bg-gray-800 opacity-85'>
        <div
          className="border-t-4 border-solid rounded-full w-12 h-12 animate-spin"
          style={{
            borderWidth: '7px',
            borderColor: 'white',
            borderTopColor: 'blue',
            borderStyle: 'solid',
          }}
        ></div>
      </div>} */}

      {/* order placed card  */}
      {orderOk && <div className='px-5 fixed flex justify-center h-screen w-screen items-center top-0 left-0 bg-white text-black'>
        <div className='text-center flex flex-col items-center justify-center'>
          <FaCircleCheck size={150} className='text-green-500' />
          <h4 className='mt-4 text-2xl font-semibold'> </h4>
          <h2 className="text-black text-2xl mt-1">Order Placed Successfully!</h2>

          <h5 className='mt-2'><span className='font-bold text-red-500'>Note : </span>Orders will be processed only after full payment. Please send the payment receipt to WhatsApp at <a href='https://wa.me/918500961256' className='text-green-700 font-bold'>8500961256</a> on the same day of the order.

          </h5>
          <p className="text-black text-lg mt-2">
            You will receive the order details in your email.
          </p>

          <Link to="/" className="text-blue-700 font-semibold">Continue Shopping</Link>
        </div>

      </div>}

    </div>
  )
}

export default OrderCheckOut