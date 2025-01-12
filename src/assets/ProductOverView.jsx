import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dataContext } from "../App"
import { PiShareNetwork } from 'react-icons/pi'
import { Loading } from './Loading'
import { FaMinus, FaPlus, FaTruck } from 'react-icons/fa'
import { Slide, toast, ToastContainer } from 'react-toastify'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Footer from './Footer'
import { scrollToTop } from './RouteHandler'
import { locations } from "./hardCodeData"

const ProductOverView = () => {
  scrollToTop()
  const { products } = useContext(dataContext)
  const { itemId } = useParams()
  const [product, setProduct] = useState({})
  const [itemImg, setItemImg] = useState("")
  const [itemWeight, setItemWeight] = useState("")
  const [itemCost, setItemCost] = useState("")
  const [itemQty, setItemQty] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [areas, setAreas] = useState([])
  const [noServiceText, setNoServiceText] = useState("")
  const [areaName, setAreaName] = useState("")
  const [orderType, setOrderType] = useState("buyonce")
  const [days, setDays] = useState(7)

  // related products filter function 
  useEffect(() => {
    const results = products?.filter((item) => item?.itemSubCategory === product?.itemSubCategory)
    if (results.length > 1) {
      setRelatedProducts(results)
    }
  }, [product, itemId])

  // finding single product by id 
  useEffect(() => {
    const results = products.find((item) => item._id === itemId)
    setProduct(results)
  }, [products, itemId])

  // item weight,cost and qty initial value function 
  useEffect(() => {
    if (product && product?.itemWeight && product?.itemWeight.length > 0) {
      setItemWeight(product?.itemWeight[0]);
      setItemCost(product?.itemCost)
      setItemQty(1)
    } else {
      setItemCost(product?.itemCost)
      setItemQty(1)

    }
  }, [product]);


  // item weight and cost radio input handle function 
  const weightSelectFunc = (weightParam) => {
    if (weightParam === "250") {
      setItemWeight(weightParam)
      setItemCost(product?.itemCost)
    } else if (weightParam === "500") {
      setItemWeight(weightParam)
      setItemCost(product?.itemHalfKgCost)
    } else if (weightParam === "1000") {
      setItemWeight(weightParam)
      setItemCost(product?.itemKgCost)
    }
  }

  // item image initial value function 
  useEffect(() => {
    if (product?.itemImage?.length > 0) {
      setItemImg(product?.itemImage[0])
    }
  }, [product])


  // share function 
  const shareFunc = async () => {

    try {
      await navigator.share({
        title: `Check out ${product.itemName} on Dora A to Z Fresh!`,
        text: `Hello! Welcome to Dora A to Z Fresh! 🌸 Take a look at this product: "${product.itemName}"\n\nDescription: ${product.itemDescription}\nPrice: ₹${product.itemCost}\n\nDiscover more by clicking the link below:`,
        url: `https://doraatozfresh.vercel.app/product_over_view/${itemId}`
      });
    } catch (error) {
      console.error(error);
    }
  };


  // searcing for area input handle function 
  const areaInputHandleFunc = (e) => {
    const areaName = e.target.value
    const results = locations.filter((item) => item.toLowerCase().includes(areaName.toLowerCase()))
    setAreas(results)
    if (results.length > !0) {
      setAreaName("")
      setNoServiceText("Door delivery service is currently not available at your location. We apologize for the inconvenience.")
      setAreas([])
    }
  }


  const areaSelectFunc = (param) => {
    setNoServiceText("Door delivery service is available at your location.")
    setAreaName(param)
    setAreas([])
  }



  // order type select drop down handle func 
  const orderTypeFunc = (event) => {
    const inputText = event.target.value
    if (inputText === "subscription") {
      setOrderType(inputText)
    } else {
      setOrderType("buyonce")
    }

  }



  // Check if the product is still being retrieved or is empty
  if (!product || Object.keys(product).length === 0) {
    return <Loading />;
  }


  return (
    <>
      <ToastContainer position='top-center' draggable transition={Slide} theme='dark' />

      <section className="text-gray-600 p-3 select-none mt-3 mb-7 pt-24">

        <div className="flex flex-row lg:pb-2 gap-2 lg:gap-0 gap-x-[3rem] lg:gap-x-0 lg:justify-around flex-wrap">
          {/* image section  */}
          <div className='relative flex flex-col gap-3 w-full sm:w-[48%]'>
            <img
              alt="ecommerce"
              className=" w-full h-auto rounded-lg "
              src={itemImg}
            />
            <PiShareNetwork title='Share' onClick={shareFunc} className='absolute top-2 bg-black p-1 h-8 w-10 cursor-pointer  text-white rounded-full  right-2  ' />

            <div className=' flex gap-3 flex-wrap'>
              {product?.itemImage?.map((item, index) => (
                <img key={index} src={item} alt={product.itemName} onClick={() => setItemImg(item)} className='w-[5rem] h-[4rem] lg:w-32 lg:h-24 rounded-lg cursor-pointer hover:border-2 hover:border-blue-600' />

              ))}
            </div>
          </div>

          <hr className='border w-full sm:hidden border-gray-200 mt-3' />
          {/* item name and cost section  */}
          <div className="w-full sm:w-[40%] ">
            <div className="flex flex-col gap-3 mb-3 ">
              <div className='flex gap-3 mb-1 items-center'>


                {orderType === "subscription" ? <>
                  <span className='text-2xl text-gray-700 font-medium'>Rs. {parseFloat(days * itemCost || 0).toFixed(2)}
                  </span>
                </>
                  :
                  <>
                    <span className='text-2xl text-gray-700 font-medium'>Rs. {parseFloat(itemCost || 0).toFixed(2)}
                    </span>
                    {
                      itemWeight === "250" || product.itemCategory === "food" || product.itemCategory === "non-veg" ?
                        <span className='text-md line-through text-red-700 font-medium'>Rs. {parseFloat(product.offerCost || 0).toFixed(2)}
                        </span> : null
                    }
                  </>
                }

              </div>
              {product.itemStock === "0" ?
                <div className='bg-red-500 rounded px-2 p-1 text-white font-medium w-fit'>
                  Out Of Stock
                </div> :
                <div className='bg-green-500 rounded px-2 p-1 text-white font-medium w-fit'>
                  In Stock
                </div>
              }

            </div>

            <hr className='border border-gray-200 mb-2 mt-5' />

            {/* rendering elements based on stock availability  */}
            {product.itemStock === "0" ?
              <>
                <div className="flex gap-1 mb-3 items-center pointer-events-none">
                  <span className='font-semibold text-nowrap'>Quantity : </span>
                  <span className='text-lg font-semibold text-black'> {itemWeight}{product.itemCategory === "milk" ? "ml" : "g"}</span>
                </div>
                <div className='flex gap-2 flex-wrap mb-3 pointer-events-none'>
                  {product.itemWeight.map((item, index) => (
                    <div onClick={() => weightSelectFunc(item)} key={index} className='border-2 border-green-700 py-1 hover:border-blue-600 px-4 rounded-full cursor-pointer font-semibold'>
                      {item}{product.itemCategory === "milk" ? "ml" : "g"}
                    </div>
                  ))}
                </div>
                <div className="flex gap-1 mb-3 items-center pointer-events-none">
                  <span className='font-semibold text-nowrap'>Quantity : </span>
                  <span className='text-lg font-semibold text-black'> {itemQty}</span>
                </div>
                <div className='flex gap-2 flex-wrap mb-3 pointer-events-none'>
                  <div className='border-2 border-gray-500 py-2 hover:border-gray-800 px-4 rounded-full  font-semibold flex items-center gap-5'>
                    <FaMinus className={` text-lg hover:text-blue-600 ${itemQty === 1 ? "pointer-events-none " : "cursor-pointer"}`} onClick={() => setItemQty(itemQty - 1)} /><span>{itemQty}</span><FaPlus className='cursor-pointer  text-lg hover:text-blue-600' onClick={() => {
                      if (itemQty < parseInt(product.itemStock)) {
                        setItemQty(itemQty + 1)
                      } else {
                        toast.warning(`Maximum quantity limit ${itemQty}`)
                      }

                    }} />
                  </div>
                </div>
                <div className="flex gap-3 justify-start my-5 w-full">
                  <button className="w-full bg-gray-400 font-semibold text-white border-0 py-3 px-6 focus:outline-none pointer-events-none rounded-full">
                    Out Of Stock
                  </button>
                </div>
              </>

              :
              <>
                {/* item weight quantity selection section  */}
                {product.itemWeight.length > 0 ?
                  <>
                    <div className="flex gap-1 mb-3 items-center">
                      <span className='font-semibold text-nowrap'>Quantity : </span>
                      <span className='text-lg font-semibold text-black'> {itemWeight}{product.itemCategory === "milk" ? "ml" : "g"}</span>
                    </div>
                    <div className='flex gap-2 flex-wrap mb-5'>
                      {product.itemWeight.map((item, index) => (
                        <div onClick={() => weightSelectFunc(item)} key={index} className='border-2 border-green-700 py-1 hover:border-blue-600 px-4 rounded-full cursor-pointer font-semibold'>
                          {item}{product.itemCategory === "milk" ? "ml" : "g"}
                        </div>
                      ))}
                    </div>
                  </> : ""
                }


                {/* item quantity increment and decrement section  */}
                <div className="flex gap-1 mb-3 items-center">
                  <span className='font-semibold text-nowrap'>Quantity : </span>
                  <span className='text-lg font-semibold text-black'> {itemQty}</span>
                </div>
                <div className='flex gap-2 flex-wrap mb-5'>
                  <div className='border-2 border-gray-500 py-2 hover:border-gray-800 px-4 rounded-full  font-semibold flex items-center gap-5'>
                    <FaMinus className={` text-lg hover:text-blue-600 ${itemQty === 1 ? "pointer-events-none " : "cursor-pointer"}`} onClick={() => setItemQty(itemQty - 1)} /><span>{itemQty}</span><FaPlus className='cursor-pointer  text-lg hover:text-blue-600' onClick={() => {
                      if (itemQty < parseInt(product.itemStock)) {
                        setItemQty(itemQty + 1)
                      } else {
                        toast.warning(`Contact us for larger quantity orders.`)
                      }

                    }} />
                  </div>
                </div>

                {/* order type and suscription section */}

                {product.itemSubCategory === "Milk" || product.itemSubCategory === "Curd" ?
                  <>
                    <div className="flex gap-1 mb-3 items-center">
                      <span className='font-semibold text-nowrap'>Order Type : </span>
                      <select onChange={orderTypeFunc} className=' border-2 rounded  border-gray-500 '>
                        <option value="" disabled>Select Order Type</option>
                        <option value="buyonce">Buy Once</option>
                        <option value="subscription">Subscription</option>
                      </select>
                    </div>
                    {orderType === "buyonce" && <h5 className='font-semibold my-4 flex items-center gap-2'><FaTruck className='text-blue-500'/> Delivery charges apply at checkout</h5>}

                    {orderType === "subscription" && <>
                      <div className="flex gap-1 mb-3 items-center">
                        <span className='font-semibold text-nowrap'>Days : </span>
                        <span className='text-lg font-semibold text-black'>{days} days</span>
                      </div>
                      <div className='flex gap-2 flex-wrap mb-5'>
                        <div onClick={() => setDays(7)} className='border-2 border-green-700 py-1 hover:border-blue-600 px-4 rounded-full cursor-pointer font-semibold'>
                          7 days
                        </div>
                        <div onClick={() => setDays(10)} className='border-2 border-green-700 py-1 hover:border-blue-600 px-4 rounded-full cursor-pointer font-semibold'>
                          10 days
                        </div>
                        <div onClick={() => setDays(20)} className='border-2 border-green-700 py-1 hover:border-blue-600 px-4 rounded-full cursor-pointer font-semibold'>
                          20 days
                        </div>
                        <div onClick={() => setDays(30)} className='border-2 border-green-700 py-1 hover:border-blue-600 px-4 rounded-full cursor-pointer font-semibold'>
                          30 days
                        </div>
                      </div>
                    <h5 className='font-semibold mb-2 flex items-center gap-2 text-green-600'><FaTruck className='text-blue-500'/> free delivery on all subscription orders.</h5>
                    <h5 className=' mb-3 flex items-center gap-2 '>Subscription orders are delivered daily at <span className='font-bold'>6 PM</span> and  <span className='font-bold'>6 AM</span></h5>

                    </>}


                  </> :
                  <h5 className='font-semibold my-4 flex items-center gap-2'><FaTruck className='text-blue-500'/> Delivery charges apply at checkout</h5>
                   
                }


                {/* checking delivery service to address  */}

                <div>
                  <h6 className='font-bold'>Note : <span className='font-normal'>Check door delivery service for your location.</span></h6>
                  <div className='mt-4 relative'>
                    <input onChange={areaInputHandleFunc} type="text" className='rounded w-full border-2 border-blue-500 py-1 pl-3 ' placeholder='Enter your location check delivery availability.' />
                    {areas.length > 0 ? <div className="border-2 absolute top-10 left-0 bg-white z-10 mt-[0.01rem] flex flex-col outline-none border-blue-500 rounded-lg p-2 px-1 w-full">
                      {
                        areas.map((item, index) => (
                          <span onClick={() => areaSelectFunc(item)} className='hover:bg-blue-600 hover:text-white cursor-pointer rounded p-1 px-2' key={index} value={item}>{item}</span>
                        ))
                      }
                    </div>
                      : <div className='mt-3'>
                        <p className={`${areaName ? "text-green-600" : "text-red-700"}`}>{noServiceText}</p>
                      </div>
                    }

                  </div>
                </div>

                {/* add to cart button  */}
                <div className="flex gap-3 justify-start my-5 w-full">
                  <button className="w-full bg-blue-800 font-semibold text-white border-0 py-3 px-6 focus:outline-none hover:bg-indigo-600 rounded-full">
                    Add to cart
                  </button>
                </div>

              </>
            }

          </div>

          {/* Description section  */}
        </div>
        <div className='lg:px-9'>
          <hr className='border   border-gray-200 mb-2 lg:mt-5' />
          <h5 className='font-bold text-lg mb-2'>Description</h5>
          <p className='font-serif'>{product.itemDescription}</p>
        </div>


        {/* related products section  */}
        {relatedProducts.length > 1 &&
          <div className='mt-10 lg:px-9'>
            <h5 className='text-2xl font-medium text-black'>Related Products</h5>
            <hr className='border border-gray-200 mb-5 mt-3 lg:mt-3' />

            <div className='mt-4 grid grid-cols-2 gap-y-6 gap-x-5 md:gap-y-7 lg:gap-y-6  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
              {relatedProducts.map((item) => (
                <Link to={`/product_over_view/${item._id}`} key={item._id} className="group  w-full h-full  md:w-52   lg:w-72  relative  hover:opacity-85">
                  <div>
                    <LazyLoadImage
                      src={item.itemImage[0]}
                      alt={item.itemName}
                      effect='blur'
                      className="h-fit w-full rounded-lg"
                    />
                  </div>

                  <div className="mt-2 text-center">

                    <h3 className="text-[0.9rem] lg:text-[1rem] font-bold text-black">

                      {item?.itemName?.substring(0, 18)}..
                    </h3>
                    <span className='text-md text-gray-900'>Rs. {parseFloat(item?.itemCost || 0).toFixed(2)}</span>

                  </div>
                </Link>
              ))}
            </div>
          </div>
        }

      </section>
      <Footer />
    </>
  )
}

export default ProductOverView