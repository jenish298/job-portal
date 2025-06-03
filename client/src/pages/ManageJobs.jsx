import React, { useContext, useEffect, useState } from 'react'

import moment from 'moment'
import { data, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loading from '../components/Loading'

const ManageJobs = () => {

  const navigate = useNavigate()
  const [jobs,setJobs]= useState(false)

  const {backendUrl, companyToken} = useContext(AppContext)

  // function to fetch company job applicatio data 

  const fetchCompanyJobs = async () =>{

    try{
      const {data} = await axios.get(backendUrl+ '/api/company/list-jobs', {headers:{token:companyToken}})

  
      if (data.success){
        setJobs(data.jobData.reverse());
        console.log(data.jobData)
      }else{
        toast.error(data.message)
      }

    }catch(error){
          toast.error(error.message)
    }
  }

  //function to change job visiblity

  const changeJobVisibility = async (id)=>{
    try {
      
      const {data} =await axios.post(backendUrl+ '/api/company/change-visibility',
        {id},{headers:{token:companyToken }}
      )
      if(data.success){
        toast.success(data.success)
        fetchCompanyJobs()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(companyToken)
    {
  fetchCompanyJobs()
    }
    

  },[companyToken])
  return jobs ? jobs.length ===0 ? (<div className='flex items-center justify-center h-[70vh]'>
    
    <p className='text-xl sm:text-2xl'>No Jobs Available or Posted</p>
  </div>): (
    <div className="p-4 md:p-8 min-h-screen flex justify-center relative">
      <div className="w-full max-w-7xl overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-normal">#</th>
              <th className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-normal">Job title</th>
              <th className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-normal">Date</th>
              <th className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-normal">Location</th>
              <th className="px-6 py-4 text-center text-md font-semibold text-gray-700 uppercase tracking-normal">Application</th>
              <th className="px-6 py-4 text-left text-md font-semibold text-gray-700 uppercase tracking-normal">Visible</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            { jobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600">{moment(job.date).format('ll')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-800">{job.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-blue-700 font-semibold text-center">{job.applicants}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <input type="checkbox" onChange={()=>changeJobVisibility(job._id)} className="form-checkbox h-5 w-5 text-blue-600" checked={job.visible}  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={()=>navigate('/dashboard/add-job')}
        className="fixed md:absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-blue-600 mb-10 mr-10 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-200 text-sm md:text-base"
      >
        Add New Job
      </button>
    </div>
  ) : <Loading/>
}

export default ManageJobs