import React, { useContext } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/Appcontext";
import { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterLogin = () => {

  const navigate = useNavigate()
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  const {setShowRecruiterLogin,backendUrl,setCompanyToken,setCompanyData} = useContext(AppContext);
  const onSubmitHandler = async (e) => {

    e.preventDefault();
    if (state === " sign-up" && !isTextDataSubmitted) {
       return setIsTextDataSubmitted(true);
      }
      try {
        
        if(state=='Login')
        {
          
          const {data} = await axios.post(backendUrl + '/api/company/login',{email,password})
          if(data.success)
          {
            toast.success("login successful")
             
              setCompanyData(data.company)
              setCompanyToken(data.token)
              localStorage.setItem('companyToken',data.token)
              setShowRecruiterLogin(false)
              navigate('/dashboard/manage-job')
          }
          else{
            toast.error(data.message)
          }
        }else{
          const formData= new FormData()
          formData.append('name',name)
          formData.append('password',password)
          formData.append('email',email)
          formData.append('image',image)
          const {data} = await axios.post(backendUrl + '/api/company/register',formData)

          if(data.success){
            toast.success("register successful")
          
              setCompanyData(data.company)
              setCompanyToken(data.token)
              localStorage.setItem('companyToken',data.token)
              setShowRecruiterLogin(false)
              navigate('/dashboard/manage-job')
          }else{
            toast.error(data.message)
          }


        }
      } catch (error) {
        toast.error(error.message)
      }
}

useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
        document.body.style.overflow = "unset"
    }
})




  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
      onSubmit={onSubmitHandler}
        action=""
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state} 
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state === " sign-up" && isTextDataSubmitted ? (
          <>
          
          <div className="flex items-center gap-4 my-10">
            <label htmlFor="image">
                <img className="w-16 rounded-full" src={ image ? URL.createObjectURL(image) : assets.upload_area} alt="icon" />
                <input onChange={e=> setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
            <p> Upload Company <br/> logo</p>
          </div>
          
          
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="icon" />
                <input
                  className="outline-0"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  placeholder="company name "
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="icon" />
              <input
                className="outline-0"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                placeholder="Enter Email "
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="icon" />
              <input
                className="outline-0"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                placeholder="Enter Password "
                required
              />
            </div>
          </>
        )}
       {state==='Login' && (<p className="text-sm text-blue-600 mt-4 cursor-pointer">
           
          Forgot Password ?
        </p>)} 
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-full w-full  hover:bg-blue-700 mb-3 transition-all duration-300 cursor-pointer">
          {state === "Login" ? "Login" : isTextDataSubmitted ? "Create Account" : "Next"}
        </button>

        {state === "Login" ? (
          <p className="flex justify-center items-center ">
            Don't have an account ? 
            <span
              className="text-blue-600 cursor-pointer pl-1"
              onClick={() => setState(" sign-up")}
            >
               
               sign Up
            </span>
          </p>
        ) : (
          <p className="flex justify-center items-center">
            Already have an account ? 
            <span
              className="text-blue-600 cursor-pointer pl-1"
              onClick={() => setState("Login")}
            >
               
              Login 
            </span>
          </p>
        )}



        <img onClick={e => setShowRecruiterLogin(false)} className="absolute top-5 right-5 coursor-pointer" src={assets.cross_icon} alt="" />
      </form>
    </div>
  );
};

export default RecruiterLogin;
