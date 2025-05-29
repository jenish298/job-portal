import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  return (
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
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-300 w-16">
                  {index + 1}
                </td>
                <td className="p-4 border-b border-gray-300 min-w-[180px] flex items-center gap-2">
                  <img
                    src={applicant.imgSrc}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <span className="font-medium">{applicant.name}</span>
                </td>
                <td className="p-4 border-b border-gray-300 min-w-[150px]">
                  {applicant.jobTitle}
                </td>
                <td className="p-4 border-b border-gray-300 min-w-[120px]">
                  {applicant.location}
                </td>
                <td className="p-4 border-b border-gray-300 min-w-[120px]">
                  <a
                    href=""
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
                  <div className="relative group inline-block">
                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors duration-150 text-gray-700 font-semibold">
                      ...
                    </button>
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 hidden group-hover:flex flex-col gap-2 bg-white border border-gray-300 rounded shadow-lg p-2 min-w-[100px]">
                      <button className="w-full px-3 py-1 rounded-lg text-green-700 hover:bg-green-50 transition-colors duration-150 font-semibold flex items-center justify-center gap-1">
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
                      <button className="w-full px-3 py-1 rounded-lg text-red-700 hover:bg-red-50 transition-colors duration-150 font-semibold flex items-center justify-center gap-1">
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
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
