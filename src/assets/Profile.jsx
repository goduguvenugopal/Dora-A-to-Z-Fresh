import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../App";
import { Loading } from "./Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const { api, token, setUser, user } = useContext(dataContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


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

  // loading when fetching user detailes 
  if (loading) {
    return (<Loading />)
  }

  return (
    <>
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
              <button className="text-blue-600 font-bold hover:text-blue-800 text-sm">
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
    </>

  );
};

export default Profile;
