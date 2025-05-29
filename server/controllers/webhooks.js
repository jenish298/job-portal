import { Webhook } from "svix";
import User from "../models/user";
import { json } from "express";

export const clearkWebhooks = async (req, res) => {
  try {
    // create a svix instance with

    const whook = new Webhook(process.env.CLERK_WEBHOOK - SECRET);

    await whook.verify(json.stringfy(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestap"],
      "svix-signature": req.headers["savix-signature"],
    });
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userdata={
            _id:data.id,
            email:data.email_addresses[0].email_address,
            name:data.first_name + " "+ last_name,
            image:data.image_url,
            resume:''
        }
        await User.create(userdata)
        res.json({})
        break;
      }
      case "user.updated": {
            const userdata={
            
            email:data.email_addresses[0].email_address,
            name:data.first_name + " "+ last_name,
            image:data.image_url,
            resume:''
        }

        await User.findByIdAndUpdate(data.id,userData)
        res.json({})
        break;
      }
      case "user.deleted": {
           await User.findByIdAndDelete(data.id)
           break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:'webhooks error'})
  }
};
