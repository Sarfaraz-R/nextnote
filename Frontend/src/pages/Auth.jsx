import React from 'react';
import { Outlet } from 'react-router-dom';


const Auth = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9] grid grid-cols-1 md:grid-cols-2">
      {/* Left Branding Panel */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-white border-r border-[#E5E5E5]">
        <h1 className="text-3xl font-semibold text-[#0D0D0D]">
          Welcome to Nextnote
        </h1>
        <p className="mt-4 text-gray-500">
          AI-powered notes and quizzes to accelerate your learning.
        </p>
      </div>

      {/* Right Form Panel */}
      <div className="flex items-center justify-center px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
