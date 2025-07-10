import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    console.log("Query before dispatching:", query); // Debug
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <section className="bg-[#0D1520] text-white py-16 px-4 min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          whileInView={{
            y: [0, -6, 0],
            boxShadow: [
              "0 0 0px rgba(56,189,248,0.0)",
              "0 0 12px rgba(56,189,248,0.5)",
              "0 0 0px rgba(56,189,248,0.0)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-6 px-5 py-2 rounded-full border border-sky-500/80 bg-slate-800/60 font-medium text-sm backdrop-blur text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400"
        >
          <span className="animate-gradient text-[20px]">
            India's Leading Job Search Platform
          </span>
        </motion.span>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-extrabold leading-[2] mb-8"
        >
          <span className="block text-white">Discover. Apply.</span>
          <span className="block text-sky-400">Shape Your Career</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg text-slate-300 mb-10"
        >
          Your dream job is just a search away. Browse top listings, apply with
          ease, and take the next step in your professional journey.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full max-w-2xl items-center overflow-hidden rounded-full bg-slate-800 shadow-xl border border-slate-700"
        >
          <input
            type="text"
            placeholder="Search job titles, keywords..."
            className="flex-1 px-6 py-3 bg-transparent text-white placeholder:text-slate-400 focus:outline-none text-base"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="h-full rounded-none rounded-r-full px-8 py-3 bg-sky-500 hover:bg-sky-600 transition-all flex items-center justify-center"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
