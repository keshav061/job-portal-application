import mongoose from "mongoose";
import { Job } from "./models/job.model.js";
import { Company } from "./models/company.model.js";
import { User } from "./models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const seedJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        // Find a recruiter user to assign jobs to (or create one)
        let recruiter = await User.findOne({ role: 'recruiter' });
        if (!recruiter) {
            console.log("Creating a content recruiter user...");
            recruiter = await User.create({
                fullname: "Recruiter One",
                email: "recruiter@example.com",
                phoneNumber: "1234567890",
                password: "password123", // Note: In a real app, this should be hashed
                role: "recruiter"
            });
        }

        // Define companies
        const companiesData = [
            { name: "Google", description: "Search engine giant.", website: "https://google.com", location: "Mountain View, CA" },
            { name: "Microsoft", description: "Software corporation.", website: "https://microsoft.com", location: "Redmond, WA" },
            { name: "Tesla", description: "Electric vehicle and clean energy company.", website: "https://tesla.com", location: "Austin, TX" },
            { name: "Amazon", description: "E-commerce and cloud computing.", website: "https://amazon.com", location: "Seattle, WA" },
            { name: "Meta", description: "Social technology company.", website: "https://meta.com", location: "Menlo Park, CA" }
        ];

        const companies = [];
        for (const companyData of companiesData) {
            let company = await Company.findOne({ name: companyData.name });
            if (!company) {
                console.log(`Creating company: ${companyData.name}...`);
                company = await Company.create({
                    ...companyData,
                    userId: recruiter._id
                });
            }
            companies.push(company);
        }

        // Helper to find company by name
        const getCompanyId = (name) => companies.find(c => c.name === name)?._id;

        const jobs = [
            {
                title: "Frontend Developer",
                description: "We differ looking for a skilled Frontend Developer with React experience.",
                requirements: ["React", "JavaScript", "HTML", "CSS"],
                salary: 50000,
                location: "Delhi NCR",
                jobType: "Full-time",
                experienceLevel: 2,
                position: 2,
                company: getCompanyId("Google"),
                created_by: recruiter._id
            },
            {
                title: "Backend Developer",
                description: "Looking for a Node.js developer.",
                requirements: ["Node.js", "Express", "MongoDB"],
                salary: 80000,
                location: "Bangalore",
                jobType: "Full-time",
                experienceLevel: 3,
                position: 1,
                company: getCompanyId("Microsoft"),
                created_by: recruiter._id
            },
            {
                title: "Data Analyst",
                description: "Analyze large datasets and provide insights.",
                requirements: ["Python", "SQL", "Tableau"],
                salary: 60000,
                location: "Mumbai",
                jobType: "Full-time",
                experienceLevel: 1,
                position: 3,
                company: getCompanyId("Tesla"),
                created_by: recruiter._id
            },
            {
                title: "FullStack Developer",
                description: "MERN Stack developer required.",
                requirements: ["React", "Node.js", "MongoDB"],
                salary: 120000,
                location: "Pune",
                jobType: "Remote",
                experienceLevel: 5,
                position: 1,
                company: getCompanyId("Amazon"),
                created_by: recruiter._id
            },
            {
                title: "Graphic Designer",
                description: "Creative designer for marketing materials.",
                requirements: ["Photoshop", "Illustrator", "Figma"],
                salary: 40000,
                location: "Hyderabad",
                jobType: "Contract",
                experienceLevel: 2,
                position: 1,
                company: getCompanyId("Meta"),
                created_by: recruiter._id
            }
        ];

        await Job.insertMany(jobs);
        console.log("Database seeded successfully with 5 jobs for different companies.");

        mongoose.connection.close();
    } catch (error) {
        console.error(error);
    }
};

seedJobs();
