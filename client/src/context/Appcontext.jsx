import { createContext, useEffect } from "react";
import {useState} from 'react';
import { jobsData } from "../assets/assets";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [searchfilter, setSearchfilter] = useState({
        title:'',
        location:'',
    })
    const [isSearch, setIsSearch] = useState(false);
    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);





    // function to fetch jobs
    const fetchJobs = async () => {
        setJobs(jobsData);
    }

    useEffect(() => {
        fetchJobs();
    }, [])
    const value = {
        searchfilter, 
        setSearchfilter,
        isSearch, 
        setIsSearch,
        jobs,
        setJobs,
        showRecruiterLogin,
        setShowRecruiterLogin,
    }

   
    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>)
}