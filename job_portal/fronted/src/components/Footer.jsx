import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-700 shadow-[0_0_20px_rgba(0,0,0,0.3)] text-white py-12 rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        
        {/* Branding Section */}
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-2xl font-bold tracking-tight">
            JobHunt<span className="text-sky-500">.</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Helping you land your dream job with ease.
          </p>
          <p className="text-xs text-gray-500">© 2025 JobHunt. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 text-sm font-medium">
          <a href="#" className="text-gray-300 hover:text-sky-400 transition">About</a>
          <a href="#" className="text-gray-300 hover:text-sky-400 transition">Contact</a>
          <a href="#" className="text-gray-300 hover:text-sky-400 transition">Privacy</a>
          <a href="#" className="text-gray-300 hover:text-sky-400 transition">Terms</a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-5">
          <a href="#" aria-label="Facebook" className="group">
            <div className="p-2 rounded-full bg-white/5 backdrop-blur-md hover:bg-sky-600 transition transform hover:scale-110 shadow-md group-hover:shadow-sky-500/40">
              <Facebook className="w-5 h-5 text-white" />
            </div>
          </a>
          <a href="#" aria-label="Twitter" className="group">
            <div className="p-2 rounded-full bg-white/5 backdrop-blur-md hover:bg-sky-500 transition transform hover:scale-110 shadow-md group-hover:shadow-sky-400/40">
              <Twitter className="w-5 h-5 text-white" />
            </div>
          </a>
          <a href="#" aria-label="LinkedIn" className="group">
            <div className="p-2 rounded-full bg-white/5 backdrop-blur-md hover:bg-sky-400 transition transform hover:scale-110 shadow-md group-hover:shadow-sky-300/40">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
