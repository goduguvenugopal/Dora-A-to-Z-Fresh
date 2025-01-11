import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dataContext } from "../App"
import { PiShareNetwork } from 'react-icons/pi'
import { Loading } from './Loading'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Slide, toast, ToastContainer } from 'react-toastify'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Footer from './Footer'
import { scrollToTop } from './RouteHandler'


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

  console.log(product);
  // related products filter function 
  useEffect(() => {
    const results = products.filter((item) => item.itemSubCategory === product.itemSubCategory)
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

  // Check if the product is still being retrieved or is empty
  if (!product || Object.keys(product).length === 0) {
    return <Loading />;
  }


  return (
    <>
      <ToastContainer position='top-center' draggable transition={Slide} theme='colored' />

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
            <div className="flex gap-1 mb-3 justify-start  items-start ">
              <span className='text-3xl text-black capitalize font-semibold'>{product.itemName}</span>
            </div>

            <div className="flex flex-col gap-3 mb-3 ">
              <div className='flex gap-3 mb-1 items-center'>

                <span className='text-2xl text-gray-700 font-medium'>Rs. {parseFloat(itemCost || 0).toFixed(2)}
                </span>{
                  itemWeight === "250" || product.itemCategory === "food" || product.itemCategory === "non-veg" ?
                    <span className='text-md line-through text-red-700 font-medium'>Rs. {parseFloat(product.offerCost || 0).toFixed(2)}
                    </span> : null
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
            {/* item weight quantity selection section  */}
            {product.itemWeight.length > 0 ?
              <>
                <div className="flex gap-1 mb-3 items-center">
                  <span className='font-semibold text-nowrap'>Quantity : </span>
                  <span className='text-lg font-semibold text-black'> {itemWeight}{product.itemCategory === "milk" ? "ml" : "g"}</span>
                </div>
                <div className='flex gap-2 flex-wrap mb-3'>
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
            <div className='flex gap-2 flex-wrap mb-3'>
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
            {/* add to cart button  */}
            <div className="flex gap-3 justify-start my-5 w-full">
              <button className="w-full bg-blue-800 font-semibold text-white border-0 py-3 px-6 focus:outline-none hover:bg-indigo-600 rounded-full">
                Add to cart
              </button>
            </div>
          </div>
          {/* Description section  */}
        </div>
        <hr className='border border-gray-200 mb-2 lg:mt-5' />
        <div className='lg:px-9'>
          <h5 className='font-bold text-lg mb-2'>Description</h5>
          <p className='font-serif'>{product.itemDescription}</p>
        </div>


        {/* related products section  */}
        {relatedProducts.length > 1 &&
          <div className='mt-3 lg:px-9'>
            <h5 className='text-2xl font-bold'>Related Products</h5>

            <div className='mt-4 flex gap-3 overflow-x-auto'>
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

                      {item?.itemName?.substring(0, 28)}..
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