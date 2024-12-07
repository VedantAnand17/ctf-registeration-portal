import React from 'react';
import { Flag } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Flag className="h-8 w-8" />
            <h1 className="text-2xl font-bold">CTF Registration Portal</h1>
          </div>
          <div className="text-sm">
            Capture The Flag 2024
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;