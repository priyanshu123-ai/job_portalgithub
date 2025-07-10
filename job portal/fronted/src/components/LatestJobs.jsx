// ✅ LatestJobsconst jobs = [
//   {
//     company: "TCS",
//     location: "Mumbai, India",
//     title: "Frontend Developer",
//     description: "Develop responsive UI using React & Tailwind. Collaborate with teams to deliver user-friendly designs.",
//     positions: "6 Positions",
//     type: "Full Time",
//     salary: "10 LPA",
//   },
//   {
//     company: "Google",
//     location: "Bangalore, India",
//     title: "Backend Developer",
//     description: "Build scalable APIs with Node.js. Work with cloud and database technologies in a hybrid environment.",
//     positions: "3 Positions",
//     type: "Hybrid",
//     salary: "28 LPA",
//   },
//   {
//     company: "Wipro",
//     location: "Noida, India",
//     title: "UI/UX Designer",
//     description: "Design intuitive user experiences using Figma. Create pixel-perfect layouts and user flows.",
//     positions: "2 Positions",
//     type: "Remote",
//     salary: "14 LPA",
//   },
//   {
//     company: "Infosys",
//     location: "Pune, India",
//     title: "DevOps Engineer",
//     description: "Automate deployments with Docker & Jenkins. Maintain CI/CD pipelines and cloud infrastructure.",
//     positions: "4 Positions",
//     type: "Full Time",
//     salary: "18 LPA",
//   },
//   {
//     company: "IBM",
//     location: "Hyderabad, India",
//     title: "Data Scientist",
//     description: "Analyze data using Python and ML tools. Create predictive models to drive business decisions.",
//     positions: "5 Positions",
//     type: "Internship",
//     salary: "12 LPA",
//   },
//   {
//     company: "Amazon",
//     location: "Chennai, India",
//     title: "Cloud Architect",
//     description: "Design scalable cloud systems on AWS. Handle architecture, automation, and security strategies.",
//     positions: "1 Position",
//     type: "Full Time",
//     salary: "35 LPA",
//   },
// ];.jsx
import React from "react";
import LatestJobsCard from "./LatestJobsCard";
import { useSelector } from "react-redux";

// 


const LatestJobs = () => {
  const {allJobs} = useSelector(store => store.job)
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold mb-12">
          <span className="text-sky-500">Latest & Top</span> Job Openings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {allJobs.length<= 0 ? <span>No Job found</span>: allJobs.map((job) => (
           <LatestJobsCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
