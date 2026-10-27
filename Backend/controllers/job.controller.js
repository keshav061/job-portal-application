import { Job } from "../models/job.model.js";

// Admin: Create a new job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;  // Get the user ID from the request

        // Check if any required fields are missing
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Create a new job entry
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        // Return success message with the newly created job
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Student: Get all jobs with filters
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const industry = req.query.industry || "";
        const salary = req.query.salary || "";

        const query = {
            $and: [
                {
                    $or: [
                        { title: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } }
                    ]
                }
            ]
        };

        if (location) {
            query.$and.push({ location: { $regex: location, $options: "i" } });
        }
        if (industry) {
            query.$and.push({ title: { $regex: industry, $options: "i" } });
        }
        if (salary) {
            // Salary handling (assuming salary is a number in DB and filter sends a range or value)
            // Example: "0-40000" or "40k-1lakh"
            // For simplicity, let's match exact or partial if string, or range if parsed.
            // Given the complexity of string salary ranges, let's fallback to specific ranges if needed.
            // For now, let's assume it filters by minimum salary if provided, or simple range match.
            // Actually, `salary` in model is `Number`.
            // Let's implement basic range parsing if the frontend sends "min-max"
            const salaryRange = salary.split("-");
            if (salaryRange.length === 2) {
                query.$and.push({ salary: { $gte: Number(salaryRange[0]), $lte: Number(salaryRange[1]) } });
            } else {
                // Fallback for single value
                query.$and.push({ salary: { $gte: Number(salary) } });
            }
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Student: Get a job by its ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find job by ID and populate company data
        const job = await Job.findById(jobId).populate({
            path: "company"  // Populate the company field
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Admin: Get all jobs created by the admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        // Find jobs created by the admin and populate company data, sorted by createdAt in descending order
        const jobs = await Job.find({ created_by: adminId })
            .populate({ path: 'company' })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
