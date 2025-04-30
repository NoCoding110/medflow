
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-navy-50 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="none"
              className="h-7 w-7"
            >
              <circle cx="50" cy="50" r="45" fill="#001f2d" />
              <path d="M50 20C40.5 20 33 25 25 35C33 45 40.5 50 50 50C59.5 50 67 45 75 35C67 25 59.5 20 50 20Z" stroke="#9bd1f2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M25 65C33 75 40.5 80 50 80C59.5 80 67 75 75 65L65 50L75 35" stroke="#9bd1f2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="50" cy="50" r="10" stroke="#ffb56b" strokeWidth="5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-semibold text-navy-800">MedFlow Connect</span>
            <span className="text-xs text-navy-600">Advanced Healthcare Platform</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-navy-600 hover:text-navy-800">About</Link>
            <Link to="#" className="text-sm text-navy-600 hover:text-navy-800">Features</Link>
            <Link to="#" className="text-sm text-navy-600 hover:text-navy-800">Contact</Link>
          </div>
        </div>
        <p className="text-center text-sm text-navy-600 md:text-right">
          © {new Date().getFullYear()} MedFlow Health. All rights reserved.
          <br />
          <span className="text-xs text-navy-500">
            This is a demo project. Not for production use.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
