// src/components/Navbar.jsx
import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from "./ui/button";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {
  const history = useHistory();
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800" style={{cursor:'pointer'}} onClick={()=>history.push('/')}>
MINDEASE            </h1>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-6">
            {/* Notification Bell */}

            {/* Profile Section */}
            <div className="flex items-center">
            <div style={{cursor:'pointer'}} 
              onClick={()=>{
                history.push("/task-dash")
            }} className="text-right mr-3">
                TaskEase
              </div>
              <div style={{cursor:'pointer'}} 
              onClick={()=>{
                localStorage.removeItem("token");
                window.location.reload()
                history.push("/login")
            }} className="text-right mr-3">
                Logout
              </div>
              <div className="flex items-center space-x-4">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;