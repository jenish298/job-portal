import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

//register a new company
export const registerCompany = async (req, res) => {

  const { name, email, password} = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({
      success: false,
      message: "missing details"})
  }

  try {
    
    const companyExists = await Company.findOne({email});

    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already exists with this email"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path)

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    })
    
    res.json({
      success: true,
      message: "Company registered successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image
      },
      token: generateToken(company._id)
    })

  } catch (error) {
    res.json({
      success: false,
      message: "Error registering company",
      error: error.message
    })
  }
}

//company login
export const loginCompany = async (req, res) => {

  const {email,password}=req.body

  try{
    const company = await Company.findOne({email})

    if(await bcrypt.compare(password,company.password)){

      res.json({
        success:true,
         company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image
      },
      token:generateToken(company._id)
      })

    }
    else{
      res.json({success:false,
        message:'invalid email or password'
      })
    }
  }catch(error){
    res.json({success:false,
      message:error.message,
      
    })
  }

}

//get company deta
export const getCompanyData = async (req, res) => {

  

  try {
    const company=req.company


    res.json({success:true,company})
  } catch (error) {
    res.json({success:false, message:error.message})
  }
}

//post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  // Validate required fields
  if (!title || !description || !location || !salary || !level || !category) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  // Ensure company is authenticated
  if (!req.company || !req.company._id) {
    return res.status(401).json({ success: false, message: "Unauthorized: Company not found" });
  }

  const companyId = req.company._id;
  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: new Date(),
      level,
      category
    });

    await newJob.save();
    res.json({ success: true, newJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
  



//get company jobs applicants
export const getCompanyJobApplicants = async (req, res) => {

  try {
    
    const companyId = req.company._id;

    //find job applications for the user and populate related data
    const applications = await JobApplication.find({companyId}).populate("userId",'name image resume').populate("jobId", 'title location salary level category').exec();

    return res.json({
      success: true,
      applications
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }

}

//get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id
    const jobs = await Job.find({companyId})

    const jobData = await Promise.all(jobs.map(async (job)=>{
      const applicants = await JobApplication.find({jobId:job._id});
      return {...job.toObject(),applicants:applicants.length}

    }))

    res.json({success:true,jobData})


  } catch (error) {
    res.json({success:false, message:error.message})
  }

}

//change job application status
export const changeJobApplicationStatus = async (req, res) => {


  try {
    
      const {id, status} = req.body;

  //find job application and update status
      await JobApplication.findOneAndUpdate({_id: id}, {status});

      res.json({success:true, message:"status changed successfully"})
    
  } catch (error) {
    res.json({success:false, message:error.message})
  }

}

// Change job visibility
export const changeVisibility = async (req, res) => {

try {
  const {id}=req.body
  const companyId = req.company._id
  const job = await Job.findById(id)
  
  if(companyId.toString() === job.companyId.toString())
  {

    job.visible = !job.visible

  }

  await job.save()

  res.json({success:true,job})
} catch (error) {
  res.json({success:false, message:error.message})
}

}