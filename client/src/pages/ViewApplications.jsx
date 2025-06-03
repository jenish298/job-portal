import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {

  const {backendUrl, companyToken} = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)
  // function to fetch company job

  const fetchCompanyJobApplications = async()=>{
    try {
      
      const {data} = await axios.get(backendUrl +'/api/company/applicants',{headers:{token:companyToken}})
      if(data.success){
        setApplicants(data.applications.reverse())
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

// function to update job applicatins status

const changeJobApplicationStatus = async (id, status) => {
    try {
      
      const {data} = await axios.post(backendUrl + "/api/company/change-status", {id, status}, {headers: {token: companyToken}});

      if (data.success) {
        fetchCompanyJobApplications();
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }



  useEffect(()=>{
if(companyToken){
  fetchCompanyJobApplications()

}

  },[companyToken])
  return applicants ? applicants.length ===0 ?(<div className='flex items-center justify-center h-[70vh]'>
    
    <p className='text-xl sm:text-2xl'>No Jobs Available or Posted</p>
  </div>):  (
    <div className="p-4 w-full font-sans text-gray-800">
      <div className="overflow-x-auto w-full">
        <table className="min-w-[1000px] w-full bg-white border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border-b border-gray-300 font-semibold tracking-wide text-left">
                #
              </th>
              <th className="p-4 border-b border-gray-300 font-semibold tracking-wide text-left">
                User name
              </th>
              <th className="p-4 border-b border-gray-300 font-semibold tracking-wide text-left">
                Job Title
              </th>
              <th className="p-4 border-b border-gray-300 font-semibold tracking-wide text-left">
                Location
              </th>
              <th className="p-4 border-b border-gray-300 font-semibold tracking-wide text-left">
                Resume
              </th>
              <th className="p-4 border-b border-gray-300 font-semibold tracking-wide text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(iterm => iterm.jobId && iterm.userId).map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-300 w-16">
                  {index + 1}
                </td>
                <td className="p-4 border-b border-gray-300 min-w-[180px] flex items-center gap-2">
                  <img
                    src={applicant.userId.image}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <span className="font-medium">{applicant.userId.name}</span>
                </td>
                <td className="p-4 border-b border-gray-300 min-w-[150px]">
                  {applicant.jobId.title}
                </td>
                <td className="p-4 border-b border-gray-300 min-w-[120px]">
                  {applicant.jobId.location}
                </td>
                <td className="p-4 border-b border-gray-300 min-w-[120px]">
                  <a
                    href={applicant.userId.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-700 bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition-colors duration-150 font-medium text-sm"
                    style={{ minWidth: "80px", justifyContent: "center" }}
                  >
                    Resume
                    <img
                      src={assets.resume_download_icon}
                      alt=""
                      className="w-4 h-4"
                    />
                  </a>
                </td>
                <td className="p-4 border-b border-gray-300 min-w-[120px]">
                  { applicant.status === 'pending' ?
                   <div className="flex gap-2">
                    <button onClick={()=> changeJobApplicationStatus(applicant._id,'Accepted')} className="px-3 py-1 rounded-lg text-green-700 hover:bg-green-50 transition-colors duration-150 font-semibold flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Accept
                    </button>
                    <button onClick={()=> changeJobApplicationStatus(applicant._id,'Rejected')} className="px-3 py-1 rounded-lg text-red-700 hover:bg-red-50 transition-colors duration-150 font-semibold flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Reject
                    </button>
                  </div> : <div>
                    { 
                    
                    applicant.status === 'Accepted' ?

                    <p className="flex items-center justify-center gap-1 text-blue-700 bg-green-100 px-4 py-2 rounded hover:bg-blue-200 transition-colors duration-150 font-medium text-sm"
                   >Accepted</p>
                    
                    : <p className="flex items-center justify-center gap-1 text-blue-700 bg-red-100 px-4 py-2 rounded hover:bg-blue-200 transition-colors duration-150 font-medium text-sm"
                   >Rejected</p>
                    }
                  </div> }
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default ViewApplications;
