import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ApplyJob from './pages/ApplyJob'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin.jsx'
import { AppContext } from './context/Appcontext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddJob from './pages/AddJob.jsx'
import ManageJobs from './pages/ManageJobs.jsx'
import ViewApplications from './pages/ViewApplications.jsx'
import 'quill/dist/quill.snow.css'
import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const { showRecruiterLogin, companyToken} = useContext(AppContext);
  return (
    <div>
     {showRecruiterLogin && <RecruiterLogin/> } 
     <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/apply-job/:id" element={<ApplyJob/>} />
        <Route path="/application" element={<Application/>} />
        <Route path="/dashboard" element={<Dashboard/>} >
        {companyToken ? <>
        
            <Route path="add-job" element={<AddJob/>} />
            <Route path="manage-job" element={<ManageJobs/>} />
           <Route path="view-applications" element={<ViewApplications/>} />
        
        </>:null
        }
         
        </Route>

      </Routes>


    </div>
  )
}

export default App