import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWbhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import { connect } from "mongoose";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";


  
    // Initialize express
    const app = express();

    // Connect to DB & Cloudinary
    await connectDB();
    await connectCloudinary();

    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(clerkMiddleware());

    // Routes
    app.get("/", (req, res) => res.send("API is working!"));

    app.post("/webhooks", clerkWbhooks);
    app.use("/api/company", companyRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/users", userRoutes);

    // Sentry error handler
    Sentry.setupExpressErrorHandler(app);

    // Start listening
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

 
