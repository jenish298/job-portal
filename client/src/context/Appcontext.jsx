import { createContext, useEffect } from "react";
import {useState} from 'react';

import { use } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const {user} = useUser()
    const {getToken} = useAuth()


    const [searchfilter, setSearchfilter] = useState({
        title:'',
        location:'',
    })
    const [isSearch, setIsSearch] = useState(false);
    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken,setCompanyToken]= useState(null)

    const [companyData,setCompanyData] = useState(null)

    const [userData,setUserData] = useState(null)

    const [userApplication,setUserApplication] = useState([])





    // function to fetch jobs
    const fetchJobs = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/jobs')
            if(data.success){
                setJobs(data.jobs)
                console.log(data.jobs)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
        

    }

    // fetch company data
    const fetchCompanyData = async() =>{

        try {
            const {data}= await axios.get(backendUrl + '/api/company/company',{headers:{token:companyToken}})

            if(data.success){
                setCompanyData(data.company)
                console.log(data)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchUserData = async ()=>{
        try {
            
            const token = await getToken();

            const {data} = await axios.get(backendUrl + '/api/users/user',
                {headers:{Authorization:`Bearer ${token}`}})
            console.log("user",data)

            if (data.success) {
                setUserData(data.user)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
                toast.error(error.message)            
        }
    }

    const fetchUserApplications = async()=>
    {
        try {
            
        const token = await getToken()
        const {data} = await axios.get(backendUrl + '/api/users/applications',{headers:{Authorization: `Bearer ${token}`}})

        if(data.success){
            setUserApplication(data.applications)

        }else{
            toast.error(data.message)
        }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchJobs();

        const storeCompanyToken = localStorage.getItem('companyToken')

        if(storeCompanyToken){
            setCompanyToken(storeCompanyToken)
        }
    }, [])


    useEffect(()=>{
        if(companyToken){
            fetchCompanyData()
        }
    },[companyToken])

    useEffect(()=>{
        if(user){
            fetchUserData()
            fetchUserApplications()
        }
    },[user])


    const value = {
        searchfilter, 
        setSearchfilter,
        isSearch, 
        setIsSearch,
        jobs,
        setJobs,
        showRecruiterLogin,
        setShowRecruiterLogin,
        companyToken,
        setCompanyToken,
        companyData,
        setCompanyData,
        backendUrl,
        userData,
        setUserData,
        userApplication,
        setUserApplication,
        fetchUserData,
        fetchUserApplications,
        

    }

   
    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>)
}