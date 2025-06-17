import React, { useContext, useEffect, useState } from 'react';
import { assets, manageJobsData } from "../assets/assets";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { AppContext } from '../context/AppContext';

const ManageJobs = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState(false);
  console.log(jobs);
  

  const {backendUrl, companyToken} = useContext(AppContext);

  //function to fetch company job
  const fetchCompanyJobs = async () => {

    try {
      
      const {data} = await axios.get(backendUrl + '/api/company/list-jobs', {headers: {token: companyToken}});

      if (data.success){
        setJobs(data.jobsData.reverse());
        console.log(data);
        

      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  //function to change job visibility
  const changeJobVisibility = async (id)=>{
    try {
      
      const {data} = await axios.post(backendUrl + '/api/company/change-visibility', {id},{headers:{token:companyToken}} )

      if (data.success){
        toast.success(data.message);
        fetchCompanyJobs();
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobs();
    }
  },[companyToken])

  return jobs ? jobs.length === 0 ? (
  <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No jobs available or posted</p></div>) :(
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-full overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-[900px] w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Job title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Application</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Visible</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {jobs.map((job, index) => (
              <tr key={index} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{moment(job.date).format('ll')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{job.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-semibold text-center">{job.applicants}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <input onChange={() => changeJobVisibility(job._id)} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400" checked={job.visible} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={()=>navigate("/dashboard/add-job")} className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold">
        Add New Job
      </button>
    </div>
  ) :<Loading/>
}

export default ManageJobs;