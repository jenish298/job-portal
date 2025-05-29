import React from "react";
import { AppContext } from "../context/Appcontext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCart from "./JobCart";
import { useState } from "react";
import { useEffect } from "react";

export const JobListing = () => {
  const { searchfilter, isSearch, setSearchfilter, jobs } =
    React.useContext(AppContext);

  const [showfilter, setshowfilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const[selectedCategory, setSelectedCategory] = useState([]);
  const[selectedLocation, setSelectedLocation] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) => (
        prev.includes(category)? prev.filter(cat => cat !== category) : [...prev, category]
    ));
  }


    const handleLocationChange = (location) => {
    setSelectedLocation((prev) => (
        prev.includes(location)? prev.filter(l => l !== location) : [...prev, location]
    ));
  }

  useEffect(() => {
    const matchesCategory = (job) => selectedCategory.length === 0 || selectedCategory.includes(job.category);

    const matchesLocation = (job) => selectedLocation.length === 0 || selectedLocation.includes(job.location);

    const matchTitle = (job) => searchfilter.title === "" || job.title.toLowerCase().includes(searchfilter.title.toLowerCase());

    const matchesSearchLocation = (job) => searchfilter.location === "" || job.location.toLowerCase().includes(searchfilter.location.toLowerCase());

    const newfilteredJobs = jobs.slice().reverse().filter(job => matchesCategory(job) && matchesLocation(job) && matchTitle(job) && matchesSearchLocation(job));

    setFilteredJobs(newfilteredJobs);
    setCurrentPage(1); 

  }, [jobs, searchfilter, selectedCategory, selectedLocation]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* search filter from hero components */}
        {isSearch &&
          (searchfilter.title !== "" || searchfilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4"> Current Search</h3>
              <div className="mb-4 text-gray-600">
                {searchfilter.title && (
                  <span
                    className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded"
                    style={{ marginRight: "10px" }}
                  >
                    {searchfilter.title}
                    <img
                      onClick={(e) =>
                        setSearchfilter((prev) => ({ ...prev, title: "" }))
                      }
                      src={assets.cross_icon}
                      className="cursor-pointer"
                      alt="image"
                    />
                  </span>
                )}

                {searchfilter.location && (
                  <span className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchfilter.location}
                    <img
                      onClick={(e) =>
                        setSearchfilter((prev) => ({ ...prev, location: "" }))
                      }
                      src={assets.cross_icon}
                      className="cursor-pointer"
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}
        <button
          onClick={(e) => setshowfilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showfilter ? "close" : "Filter"}
        </button>
        {/* category filter  */}
        <div className={showfilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search By Categories</h4>
          <ul className="space-y-2 text-gray-600">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex items-center gap-3 my-2">
                <input onChange={()=>handleCategoryChange(category)} checked={selectedCategory.includes(category)} type="checkbox" className="scale-125" name="" id="" />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* location filter  */}
        <div className={showfilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">Search By Location</h4>
          <ul className="space-y-2 text-gray-600">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex items-center gap-3 my-2">
                <input onChange={()=>handleLocationChange(location)} checked={selectedLocation.includes(location)} type="checkbox" className="scale-125" name="" id="" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* job listing  */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text:3xl py-2" id="job-list">
          Latest Job
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job, index) => (
            <JobCart key={index} job={job} />
          ))}
        </div>
        {/* pagination  */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img onClick={()=>setCurrentPage(Math.max(currentPage-1),1)} src={assets.left_arrow_icon} alt="icon" />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a href="#job-list" key={index}>
                  <button onClick={()=>setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-green-300 rounded ${currentPage === index + 1 ? ' bg-blue-100 text-blue-500': 'text-gray-500'} `}>{index + 1}</button>
                </a>
              )
            )}
               <a href="#job-list">
              <img onClick={()=>setCurrentPage(Math.min(currentPage+1),Math.ceil(jobs.length / 6 ))} src={assets.right_arrow_icon} alt="icon" />
            </a>
          </div>
        )}  
      </section>
    </div>
  );
};
