import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dataContext } from "../App"
import { PiShareNetwork } from 'react-icons/pi'
import { Loading } from './Loading'
import { FaMinus, FaPlus } from 'react-icons/fa'

const ProductOverView = () => {
  const { api } = useContext(dataContext)
  const { itemId } = useParams()
  const [product, setProduct] = useState({})
  const [itemImg, setItemImg] = useState("")
  const [itemWeight, setItemWeight] = useState("")
  const [itemCost, setItemCost] = useState("")
  const [itemQty, setItemQty] = useState("")

  // retrieving single product by id 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${api}/product/get-single-product/${itemId}`)
        if (res) {
          console.log(res.data.retrievedSingleProduct);
          setProduct(res.data.retrievedSingleProduct)
        }
      } catch (error) {
        console.error(error);

      }
    }
    fetchProduct()

  }, [itemId])

  // item weight,cost and qty initial value function 
  useEffect(() => {
    if (product && product.itemWeight && product.itemWeight.length > 0) {
      setItemWeight(product.itemWeight[0]);
      setItemCost(product.itemCost)
      setItemQty(1)
    }
  }, [product]);


  // item weight and cost radio input handle function 
  const weightSelectFunc = (weightParam) => {
    if (weightParam === "250") {
      setItemWeight(weightParam)
      setItemCost(product.itemCost)
    } else if (weightParam === "500") {
      setItemWeight(weightParam)
      setItemCost(product.itemHalfKgCost)
    } else if (weightParam === "1000") {
      setItemWeight(weightParam)
      setItemCost(product.itemKgCost)
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
    <div>
      <section className="text-gray-600 p-3 select-none">
        <div className=" py-24 pb-8">
          <div className="flex flex-row gap-2 gap-x-[3rem] flex-wrap">
            {/* image section  */}
            <div className='relative   flex flex-col gap-3 w-full lg:h-[25rem] sm:w-[48%]'>
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

              <div className="flex gap-1 mb-3 items-start">
                <span className='text-2xl text-gray-700 font-medium'>₹{parseFloat(itemCost || 0).toFixed(2)}
                </span>
              </div>

              <hr className='border  border-gray-200 my-3' />
              {/* item weight quantity selection section  */}
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

              {/* item quantity increment and decrement section  */}
              <div className="flex gap-1 mb-3 items-center">
                <span className='font-semibold text-nowrap'>Quantity : </span>
                <span className='text-lg font-semibold text-black'> {itemQty}</span>
              </div>
              <div className='flex gap-2 flex-wrap mb-3'>
                <div className='border-2 border-gray-500 py-2 hover:border-gray-800 px-4 rounded-full cursor-pointer font-semibold flex items-center gap-5'>
                  <FaMinus className='cursor-pointer' onClick={() => setItemQty(itemQty - 1)} /><span>{itemQty}</span><FaPlus className='cursor-pointer' onClick={() => setItemQty(itemQty + 1)} />
                </div>

              </div>

              {/* add to cart button  */}
              <div className="flex gap-3 justify-start my-5 w-full">

                <button className="w-full bg-gradient-to-r from-indigo-700 to-orange-500 font-semibold text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full">
                  Add to cart
                </button>

              </div>


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