import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dataContext } from "../App"
import { PiShareNetwork } from 'react-icons/pi'
import { Loading } from './Loading'

const ProductOverView = () => {
  const { api } = useContext(dataContext)
  const { itemId } = useParams()
  const [product, setProduct] = useState({})
  const [itemImg, setItemImg] = useState("")


  // retrieving single product by id 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${api}/product/get-single-product/${itemId}`)
        if (res) {
          console.log(res.data);
          setProduct(res.data.retrievedSingleProduct)
        }
      } catch (error) {
        console.error(error);

      }
    }
    fetchProduct()

  }, [itemId])


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
        text: `Hello! Welcome to Dora A to Z Fresh! 🌸 Take a look at this product: "${data.itemName}"\n\nDescription: ${product.itemDescription}\nPrice: ₹${product.itemCost}\n\nDiscover more by clicking the link below:`,
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
    <div>
      <section className="text-gray-600 p-3">
        <div className=" py-24 pb-8">
          <div className="flex flex-row gap-5 gap-x-[3rem] flex-wrap">
              <div className='relative border flex flex-col gap-3 w-full lg:h-[25rem] sm:w-[48%]'>
                <img
                  alt="ecommerce"
                  className=" w-full rounded "
                  src={itemImg}
                />
                <PiShareNetwork title='Share' onClick={shareFunc} className='absolute top-2 bg-black p-1 h-8 w-10 cursor-pointer  text-white rounded-full  right-2  ' />
              
              <div className=' flex gap-3'>
                {product?.itemImage?.map((item ,index)=>(
                  <img key={index} src={item} alt={product.itemName} onClick={()=> setItemImg(item)} className='w-32 h-24 rounded cursor-pointer hover:border-2 hover:border-blue-600' />

                ))}
              </div>
              </div>

            <div className="w-full sm:w-[40%] border">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">

              </h2>
              <div className="flex gap-1 mb-3 justify-start  items-start ">
                <span className='text-2xl font-semibold'>{product.itemName}</span>
              </div>


              {/* <div className="flex gap-1 mb-3 items-start">
                  <span className='font-semibold text-nowrap'>Book Author : </span>
                  <span className='text-lg'>{data.bookAuthor}</span>
                </div>
             
              <div className="flex gap-1 mb-4 items-center">
                <span className='font-semibold text-nowrap'>{data.itemType === "other" ? "Price" : "Book Price"} : </span>
                <span className='text-lg font-semibold text-black'>  ₹{data.bookPrice}</span>
              </div> */}


              {/* <div className='hidden md:block'>

                  <div className="flex gap-3 justify-start my-5">

                    {cart.some((item) => item._id === data._id) ? <Link to="/cart" className=" bg-indigo-800 w-[12rem] text-center font-semibold text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full">
                      GO TO CART
                    </Link> : <button onClick={() => addCartFunc(data._id)} className="bg-gradient-to-r w-[12rem] from-indigo-700 to-orange-500 font-semibold text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full">
                      ADD TO CART
                    </button>}

                  </div>
                </div> */}

              {/* <div className="md:hidden fixed bottom-2 left-2 right-2">

                  <button onClick={() => addCartFunc(data._id)} className="bg-gradient-to-r w-full from-indigo-700 to-orange-500 font-semibold text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full">
                    ADD TO CART
                  </button>

                </div> */}


              {/* {data.outOfStock === "outofstock" &&

                <h5 className='text-lg mb-3 font-semibold text-red-600'>Currently out of stock</h5>
              } */}
              {/* <div className='w-full'>

                <h4 className='font-semibold text-xl text-gray-900'>Product Details</h4>
                <hr className='my-2 border-1 border-black' />
                <div className="flex gap-1 mb-3 items-center">
                  <span className='font-semibold text-nowrap'>{data.itemType === "other" ? "Weight" : "Book Weight"} : </span>
                  <span className='text-lg'>{data.bookWeight} grams</span>
                </div>
                {data.itemType === "book" && <>
                  <div className="flex gap-1 mb-3 items-center">
                    <span className='font-semibold text-nowrap'>Book Pages : </span>
                    <span className='text-lg'>{data.bookPages}</span>
                  </div>
                  <div className="flex gap-1 mb-3 items-center">
                    <span className='font-semibold text-nowrap'>Book Size : </span>
                    <span className='text-lg'>{data.bookSize}</span>
                  </div>
                </>}
                {data.bookSummary !== "" &&
                  <div className="flex flex-col gap-1 mb-3 items-start">
                    <span className='font-semibold text-black text-lg text-nowrap'>Summary</span>
                    <span className='text-lg'>{data.bookSummary}</span>
                  </div>
                }
              </div> */}
            </div>



          </div>
        </div>

      </section>
    </div>
  )
}

export default ProductOverView