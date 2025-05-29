import './config/instrument.js' 
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWbhooks } from './controllers/webhooks.js';

  //initiallize express
  const app = express();

  //connect db
  await connectDB();


  //middlewares
  app.use(cors())
  app.use(express.json())

  //routes
  app.get('/',(req,res)=> res.send("api is working hello"))
  app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerkWbhooks)


  //port
  const PORT = process.env.PORT || 5000

  Sentry.setupExpressErrorHandler(app);

  app.listen(PORT,()=>{
    console.log(`server is running port http://localhost:${PORT}`)
  })