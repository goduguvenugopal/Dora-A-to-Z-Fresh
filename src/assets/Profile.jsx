import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../App";
import { Loading } from "./Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { Slide, toast, ToastContainer } from "react-toastify";


const Profile = () => {
  const { api, token, setUser, user } = useContext(dataContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [address, setAddress] = useState([])
  const [addressToggle, setAddressToggle] = useState(false)
  const initialData = {
    name: "",
    phone: "",
    email: user.email,
    district: "",
    village: "",
    street: "",
    state: "",
    postalCode: ""
  };
  const [addressForm, setAddressForm] = useState(initialData)
  const [addressSpin, setAddressSpin] = useState(false)




  useEffect(() => {
    // fetching user details 
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${api}/user/get-single-user`, {
          headers: {
            token: token
          }
        })
        if (response) {
          setUser(response.data.singleUser)
          setLoading(false)
        }
      } catch (error) {
        setLoading(true)
      }
    }

    if (token) {
      fetchUser()
    }

  }, [token])

 

  // if token not navigate to home 
  useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [token])



// form handle function 
const formHandleFunc = (e) =>{
  const {name , value} = e.target
  setAddressForm((prevData)=>({
    ...prevData , [name] : value
  }))
}


  // address submit function 
  const addressSubmit = async (e) => {
    e.preventDefault()

    try {
      setAddressSpin(true)
      const res = await axios.post(`${api}/address/save-shipping-address`, addressForm, {
        headers: {
          token: token
        }
      })
      if (res) {
        toast.success("Address added successfully")
        setAddressSpin(false)

      }
    } catch (error) {
      console.error(error);
      setAddressSpin(false)
      toast.error("Failed to add address. Please try again.");
    }
  }

  // loading when fetching user detailes 
  if (loading) {
    return (<Loading />)
  }

  return (
    <>
      <ToastContainer position="top-center" theme="dark" transition={Slide} />
      <div className="bg-gray-100  p-3 lg:px-16 select-none mt-3 mb-7 pt-24">
        {/* Profile Container */}
        <div className="w-full bg-white shadow-md rounded-lg p-4 sm:p-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
                {user.fullName}
              </h1>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm text-gray-800 truncate">{user.email}</p>
            </div>

          </div>

          {/* Address Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between lg:justify-start lg:gap-4">
              <h2 className="text-lg font-semibold text-gray-800">Addresses</h2>
              <button onClick={() => setAddressToggle(true)} className="text-blue-600 font-bold hover:text-blue-800 text-sm">
                + Add
              </button>
            </div>
            {/* No Address Placeholder */}
            <div className="mt-4 bg-gray-100 text-center text-gray-600 p-4 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c.621 0 1.206.24 1.648.648l.824.824a2.25 2.25 0 010 3.182l-.824.824a2.25 2.25 0 01-3.182 0l-.824-.824a2.25 2.25 0 010-3.182l.824-.824A2.25 2.25 0 0112 11zm0 0V5.25m0 0L9.75 8.25M12 5.25L14.25 8.25"
                />
              </svg>
              <p className="mt-2 text-sm">No addresses added</p>
            </div>
          </div>
        </div>
      </div>


      {/* add address section modal  */}
      {addressToggle && (
        <div className="bg-gray-700 mt-3  pt-24 bg-opacity-50 fixed top-0 left-0 w-screen h-screen p-4 flex justify-center pb-8 lg:pb-10">
          <div className="py-5 scrollbar-hide-card bg-white rounded-lg h-full w-full sm:w-[60%] md:w-[50%] lg:w-[40%]   overflow-auto ">
            <div className="isolate relative bg-white px-6 rounded-lg">
              <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
              >
                <div
                  className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                  }}
                />
              </div>
              <MdClose onClick={() => setAddressToggle(false)} size={22} className="absolute bg-black cursor-pointer rounded  hover:bg-blue-600 text-white right-4 top-0" />
              <form className="" onSubmit={addressSubmit}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        id="name"
                        required
                        value={addressForm.name}
                        onChange={formHandleFunc}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Enter Email"
                        value={addressForm.email}
                        onChange={formHandleFunc}
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                  <label
                    htmlFor="itemCategory"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    District <span className='text-red-500'>*</span>
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="itemCategory"
                      name="itemCategory"
                      autoComplete="itemCategory"
                      required
                      onChange={formHandleFunc}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option value="wanaprthy">Select the district</option>
                      <option value="wanaparthy">Wanaparthy</option>
                      
                    </select>
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="itemCategory"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Village <span className='text-red-500'>*</span>
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="itemCategory"
                      name="itemCategory"
                      autoComplete="itemCategory"
                      required
                      onChange={formHandleFunc}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1  outline-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option disabled value="">Select the Village</option>
                      <option value="wanaparthy">Wanaparthy</option>
                    </select>
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Phone number
                    </label>
                    <div className="mt-2.5">
                      <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">

                        <input
                          type="text"
                          name="phone"
                        required

                          id="phone"
                          value={addressForm.phone}
                          onChange={formHandleFunc}
                          className="block min-w-0 grow py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="street"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Street Or Colony Name
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        name="street"
                        value={addressForm.street}
                        onChange={formHandleFunc}
                        id="street"
                        rows={4}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        defaultValue={""}
                      />
                    </div>
                  </div>

                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Let's talk
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}
    </>

  );
};

export default Profile;
