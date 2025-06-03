import React, { useContext } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import Quill from 'quill';
import { useEffect } from 'react';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';


const AddJob = () => {
    

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("Bangalore");
    const [category, setCategory] = useState("Programming");
    const[level, setLevel] = useState("Beginner level");
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const {backendUrl,companyToken} =  useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
        
        const description = quillRef.current.root.innerHTML;
        const {data} = await axios.post(backendUrl + '/api/company/post-job',{
            title,description,location,category,level,salary
        } ,{headers:{token:companyToken}});
        if(data.success){
            toast.success("Job added successfully");
            setTitle("");
            setSalary(0);
            
            quillRef.current.root.innerHTML = "";
        }else{
            toast.error(data.message );
        }

    } catch (error) {
        toast.error(error.message);
    }

  }

    useEffect(() => {

        if(!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow'
            });
        }
    },[])


return (
    <form onSubmit={onSubmitHandler} className="max-w-2xl  mx-auto bg-white shadow-lg rounded-lg p-8 mt-8 space-y-8" action="">
        <div>
            <p className="text-gray-700 font-semibold mb-2">Job Title</p>
            <input
                type="text"
                placeholder="Type Here.."
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div>
            <p className="text-gray-700 font-semibold mb-2">Job Description</p>
            <div
                ref={editorRef}
                className="bg-gray-50 border border-gray-300 rounded-md min-h-[150px] focus:outline-none"
            ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <p className="text-gray-700 font-semibold mb-2">Job Category</p>
                <select
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={category}
                >
                    {JobCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div>
                <p className="text-gray-700 font-semibold mb-2">Job Location</p>
                <select
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={location}
                >
                    {JobLocations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            <div>
                <p className="text-gray-700 font-semibold mb-2">Job Level</p>
                <select
                    onChange={e => setLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={level}
                >
                    <option value="Beginner level">Beginner level</option>
                    <option value="Intermediate level">Intermediate level</option>
                    <option value="Senior level">Senior level</option>
                </select>
            </div>
        </div>

        <div>
            <p className="text-gray-700 font-semibold mb-2">Job Salary</p>
            <input
                onChange={e => setSalary(e.target.value)}
                type="number"
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-200"
        >
            ADD
        </button>
    </form>
)
}

export default AddJob