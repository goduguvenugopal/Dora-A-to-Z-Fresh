import React, { useContext, useEffect, useState } from 'react'
import { FaCircleCheck, FaDownload, FaUpload, FaWhatsapp } from 'react-icons/fa6'
import { dataContext } from "../App"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const OrderCheckOut = () => {
  const { orderProducts, api, token, defaultAddress, cartItems, discount } = useContext(dataContext)
  const [orderOk, setOrderOk] = useState(false)
  const [totalAmount, setTotalAmount] = useState(null)
  const navigate = useNavigate()
  const [originalAmount, setOriginalAmount] = useState(null)
  const [ChargesToggle, setChargesToggle] = useState(false)

  useEffect(() => {
    // total amount caluculating function 
    const totalAmount = orderProducts.reduce((acc, item) => {
      const total = parseFloat(item.totalAmount || 0);
      const qty = item.itemQty;
      return acc + total * qty;
    }, 0);
    if (orderProducts?.products?.some((product) => product.some((item) => item.orderType === "subscription"))) {
      setTotalAmount(totalAmount.toFixed(2))
      setOriginalAmount(totalAmount)
      setChargesToggle(false)

    } else {
      const deliveryCharges = discount.deliveryCharges + totalAmount
      setTotalAmount(deliveryCharges.toFixed(2))
      setOriginalAmount(totalAmount - discount.deliveryCharges)
      setChargesToggle(true)

    }

  }, [orderProducts])



  useEffect(() => {
    if (!token || orderProducts.length <= 0) {
      navigate("/")
    }

  }, [token])

  return (

    <div className="mt-20 py-5 px-3 pb-10">

      <div className=" flex flex-wrap gap-5 lg:gap-0 justify-around ">

        {/* shpping address details section  */}
        <details open className=' p-3 lg:order-3 w-full lg:w-[29%] text-black  shadow-md shadow-gray-300 rounded-lg bg-white relative   '>
          <summary className="font-bold cursor-pointer  text-orange-600">
            SHIPPING ADDRESS
          </summary>
          <h5 className='font-medium capitalize mt-2' >{defaultAddress[0]?.name}   </h5>
          <h6 className='font-medium capitalize  mt-1'>{defaultAddress[0]?.phone} </h6>
          <h6 className='font-medium capitalize  mt-1'>{defaultAddress[0]?.email} </h6>
          <h6 className='capitalize font-semibold mt-1'>{defaultAddress[0]?.village}, {defaultAddress[0]?.district}</h6>
          <h6 className='font-medium capitalize mt-1'>{defaultAddress[0]?.street} </h6>
          <h6 className='font-medium capitalize mt-1'>{defaultAddress[0]?.state}, {defaultAddress[0]?.postalCode} </h6>

          <div className='w-full mt-2 pt-2'>
            {defaultAddress.length > 0 ?
              <Link to="/profile" className="font-semibold block text-sm  p-1 bg-blue-600 hover:bg-blue-500 rounded-full   border-none w-32 text-center text-white">
                Change Address
              </Link> :
              <Link to="/profile" className="font-semibold block text-sm  p-1 bg-blue-600 hover:bg-blue-500 rounded-full   border-none w-28 text-center text-white">
                Add Address
              </Link>
            }
          </div>
        </details>


        {/* qr code payment section  */}
        <div className="p-3 flex flex-col w-full lg:w-[34%]  items-center  shadow-md shadow-gray-300 rounded-lg">

          <h2 className="font-bold  text-orange-600">
            PAYMENT DETAILS
          </h2>
          <h4 className='font-medium'>SCAN QR CODE</h4>
          <img
            src="/qrcode.png"
            alt="qr_code"
            className="border-2 my-2 h-52 w-52 rounded "
          />
          {/* <span className='font-bold mb-1'>OR</span> */}
          <img src="/allpayments.png" className='w-[60%] mb-1 ' alt="all_upi_logo" />
          <h6 className='text-blue-600 font-bold'>PAY TO THIS NUMBER</h6>
          <span className='font-bold my-1'>9603669236</span>
          <h4 className='text-center'>Banking Name : <span className='font-bold '>BANUPRAKASH NAGARAM</span></h4>

          <a href="/qrcode.png" className=' animate-bounce text-md font-semibold px-3 h-[2.5rem] mt-6 flex items-center gap-2 rounded-full text-white bg-orange-600' download="/qrcode.png"><FaDownload />Download QR Code</a>
        </div>

        {/* order product details section  */}
        <div className="p-3 w-full lg:w-[34%]  shadow-md shadow-gray-300 rounded-lg">
          <details>
            <summary className="font-bold mb-4 cursor-pointer text-orange-600">
              ORDER SUMMARY
            </summary>
            <div className=" rounded w-full flex flex-col gap-2">
              {orderProducts?.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 overflow-hidden pb-3 border-b border-gray-400"
                >
                  <img
                    src={item?.products[0]?.itemImage[0]}
                    className="h-fit w-[5rem] rounded-lg"
                    alt="Book 1"
                  />
                  <div>
                    <p className="font-semibold w-full md:w-[13rem] text-sm overflow-x-auto">
                      <span className="font-medium hidden text-sm lg:block  text-black  ">
                        {item?.products[0]?.itemName.substring(0, 20)}
                      </span>
                      <span className="font-medium block lg:hidden text-sm  text-black  ">
                        {item?.products[0]?.itemName.substring(0, 12)}
                      </span>
                    </p>
                    <p className="font-semibold text-sm  ">
                      Price :
                      <span className="font-medium text-black pl-1 text-sm  ">
                        ₹{item.totalAmount}
                      </span>
                    </p>
                    <p className="font-semibold text-sm">
                      {item.products[0].orderType.replace("buyonce", "buy once")}
                    </p>
                    <p className="font-semibold text-sm  ">
                      Quantity :
                      <span className="font-medium text-sm   text-black pl-1">
                        {item.itemQty}
                      </span>
                    </p>

                    {item.products[0].itemWeight &&
                      <p className="font-semibold text-sm  ">
                        {item.products[0].itemWeight}{item.products[0].itemSubCategory === "Milk" ? "ml" : "g"}
                      </p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </details>

          {/* order summary total amount section   */}
          <div>
            <div class="flex justify-between py-2 pt-2 border-b w-full">
              <span className="text-gray-900">Price ({orderProducts.length} items)</span>
              <span className="font-semibold text-gray-700">Rs. {originalAmount?.toFixed(2)}</span>
            </div>

            <div class="flex justify-between py-3 border-b w-full ">
              <span class="text-gray-900">Delivery Charges</span>
              <div class="flex items-center">
                {ChargesToggle ?
                  <span className="font-semibold text-gray-700">Rs. {discount?.deliveryCharges}</span>
                  :
                  <span className="fxont-semibold text-gray-700">Rs. 00</span>

                }
              </div>
            </div>

            <h3 className="font-semibold mt-3 text-xl  ">
              TOTAL COST :
              <span className="text-black pl-1">Rs. {totalAmount}</span>
            </h3>
            <h5 className='mt-2 '><span className='font-bold text-red-500'>Note : </span>Orders will be processed only after full payment. Please send the payment receipt to given below WhatsApp number the same day of the order.

            </h5>
            <a href='https://wa.me/919603669236' className='text-green-700 font-bold flex items-center gap-1 '> <FaWhatsapp size={21} />9603669236</a>
            <button type='submit' className="mt-4  bg-yellow-500 hover:bg-yellow-700 text-white w-full font-bold h-12 rounded-full"
            >
              PLACE ORDER
            </button>
          </div>
        </div>

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

          <h5 className='mt-2'><span className='font-bold text-red-500'>Note : </span>Orders will be processed only after full payment. Please send the payment receipt to WhatsApp at <a href='https://wa.me/919603669236' className='text-green-700 font-bold'>9603669236</a> on the same day of the order.

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