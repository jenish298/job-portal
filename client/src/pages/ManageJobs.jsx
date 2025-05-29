import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'

const ManageJobs = () => {
  return (
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
            {manageJobsData.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600">{moment(job.date).format('ll')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-800">{job.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-blue-700 font-semibold text-center">{job.applicants}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="fixed md:absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-blue-600 mb-10 mr-10 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-200 text-sm md:text-base"
      >
        Add New Job
      </button>
    </div>
  )
}

export default ManageJobs