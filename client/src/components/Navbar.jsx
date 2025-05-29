import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'

const Navbar = () => {

    const { openSignIn } = useClerk()
    const {user} = useUser()
    const navigate = useNavigate();
    const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);
  return (
    <div>
        <div className='flex justify-between items-center p-4 bg-white shadow-md'>
            <img onClick={()=>navigate('/')} className='cursor-pointer' src={assets.logo} alt="logo"/>
            {
              user ?
              <div className='flex item-center gap-3' style={{marginRight: '30px'}}>
                <Link to={'/'}> Home </Link>
                <p> | </p>
                <Link to={'/application'}> Applied Job </Link>
                <p> | </p>
                <p className='max-sm:hidden'> Hii, {user.firstName +" "+ user.lastName} </p>

           
                <UserButton />

              </div> :
              <div className='flex items-center gap-4' style={{marginRight: '30px'}}>
                <Link to={'/'}> Home </Link>
                <p> | </p>
                <button onClick={e=>setShowRecruiterLogin(true)} className='text-gray-600 '>Recruiter Login</button>
                <button onClick={ e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
            </div>
            }
         


        </div>
    </div>
  )
}

export default Navbar