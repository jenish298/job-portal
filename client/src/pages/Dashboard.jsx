import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const navigate = useNavigate();
  return (
   <div className='min-h-screen '>
        
        {/* navbar for recruiter */}
        <div className='shadow py-4'>
          <div className='px-5 flex justify-between items-center'>
            <img onClick={e=> navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
            <div className='flex items-center gap-3'>
              <p className='max-sm:hidden'>Welcome, Prince</p>
              <div className='relative group'>
                <img src={assets.company_icon} alt="" />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                    <li className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex items-start">
            {/* sidebar for recruiter */}
            <div className="inline-block min-h-screen border-r-2 border-gray-200 w-60">
                <ul className="flex flex-col items-start pt-5 text-gray-800">
                    <NavLink to="/dashboard/add-job" className={({isActive})=>` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500' }`} >
                        <img className="min-w-4" src={assets.add_icon} alt="" />
                        <p className="max-sm:hidden">Add Jobs</p>
                    </NavLink>

                    <NavLink to="/dashboard/manage-job" className={({isActive})=>` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500' }`} >
                        <img className="min-w-4 " src={assets.home_icon} alt="" />
                        <p className="max-sm:hidden" >Manage Jobs</p>
                    </NavLink>

                    <NavLink to="/dashboard/view-applications" className={({isActive})=>` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500' }`} >
                        <img className="min-w-4 " src={assets.person_tick_icon} alt="" />
                        <p className="max-sm:hidden" >View Applications</p>
                    </NavLink>
                </ul>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
