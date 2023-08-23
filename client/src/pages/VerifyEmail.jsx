import React, { useEffect, useState } from 'react';
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const Navigate = useNavigate();
  const [isTokenError, setIsTokenError] = useState(false)
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const verifyUser = async () => {
    try {
      const response = await api.patch(`users/verify?token=${token}`);
      toast.success(response.data.message)

    } catch (error) {
      toast.error(error.response.data.message)
      setIsTokenError(true)
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
    <Toaster/>
    <div>
        <p>Verify success</p>
    </div>
    {/* <div>
        {isTokenError && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <button onClick={() => Navigate("/")}><img src={NotFoundImg} alt="Not Found" style={{ height: "200px" }} /></button>
        <div className="flex flex-col bg-white shadow-md mt-8 px-4 sm:px-6 md:px-8 lg:px-10 py-5 rounded-3xl w-2/3 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-md">
            <div className="mt-5 mb-5">
            <div className="font-medium self-center text-xl text-center text-black">Invalid token for verification</div>
            </div>
            <button 
            className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm uppercase sm:text-base bg-green-500 hover:bg-green-700 rounded-2xl py-2 w-full transition duration-150 ease-in"
            onClick={() => Navigate("/resend-verification")}>
                Resend Verification Email
            </button>
        </div>      
        </div>
        )}
    </div> */}
    </>
  );
};

export default VerifyEmail;
