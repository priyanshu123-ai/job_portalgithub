import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Apply to a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id; // ✅ Make sure this is set via middleware
        const jobId = req.params.id;

        console.log("User ID:", userId);
        console.log("Job ID:", jobId);

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Check if user has already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Create application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });

    } catch (error) {
        console.log("Error applying to job:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// Get all jobs applied by a user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                }
            });

        if (!application || application.length === 0) {
            return res.status(404).json({
                message: "No applications found.",
                success: false
            });
        }

        return res.status(200).json({
            application,
            success: true
        });

    } catch (error) {
        console.log("Error fetching applied jobs:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// Admin: Get all applicants for a job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true // ✅ Fixed typo here
        });

    } catch (error) {
        console.log("Error fetching applicants:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// Admin: Update status of an application
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: 'Status is required.',
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log("Error updating application status:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
