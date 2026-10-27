import mongoose from "mongoose";
import { Job } from "./models/job.model.js";
import dotenv from "dotenv";

dotenv.config();

const checkJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
        const jobs = await Job.find({});
        console.log(`Found ${jobs.length} jobs.`);
        if (jobs.length > 0) {
            console.log(JSON.stringify(jobs, null, 2));
        } else {
            console.log("No jobs found. The database is empty.");
        }
        mongoose.connection.close();
    } catch (error) {
        console.error(error);
    }
};

checkJobs();
