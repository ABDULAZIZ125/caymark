import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-100">
      {/* Top Header */}
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="text-2xl font-bold text-gray-800">CayMark</div>

        {/* Search Bar */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search for vehicles..."
            className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Login and Register Buttons */}
        <div className="space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Register</button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-blue-800 text-white py-3">
        <div className="container mx-auto px-6">
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-gray-200">Home</a></li>
            <li><a href="#" className="hover:text-gray-200">Auctions</a></li>
            <li><a href="#" className="hover:text-gray-200">Marketplace</a></li>
            <li className="relative">
              <a href="#" className="hover:text-gray-200">How it Works</a>
              {/* Dropdown (example) */}
              {/*
              <ul className="absolute hidden bg-white text-gray-800 shadow-md mt-2 py-2 rounded">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Link 1</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Link 2</a></li>
              </ul>
              */}
            </li>
            <li className="relative">
              <a href="#" className="hover:text-gray-200">Services & Support</a>
              {/* Dropdown (example) */}
              {/*
              <ul className="absolute hidden bg-white text-gray-800 shadow-md mt-2 py-2 rounded">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Support</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">FAQ</a></li>
              </ul>
              */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
