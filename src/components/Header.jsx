import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-100">
      {/* Top Header */}
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">CayMark</Link>

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
          <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link>
          <Link href="/register" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Register</Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-blue-800 text-white py-3">
        <div className="container mx-auto px-6">
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-gray-200">Home</Link></li>
            <li><Link href="/auctions" className="hover:text-gray-200">Auctions</Link></li>
            <li><Link href="/marketplace" className="hover:text-gray-200">Marketplace</Link></li>
            <li className="relative">
              <span className="hover:text-gray-200 cursor-pointer">How it Works</span>
              {/* Dropdown (example) */}
              {/*
              <ul className="absolute hidden bg-white text-gray-800 shadow-md mt-2 py-2 rounded">
                <li><Link href="#" className="block px-4 py-2 hover:bg-gray-100">Link 1</Link></li>
                <li><Link href="#" className="block px-4 py-2 hover:bg-gray-100">Link 2</Link></li>
              </ul>
              */}
            </li>
            <li className="relative">
              <span className="hover:text-gray-200 cursor-pointer">Services & Support</span>
              {/* Dropdown (example) */}
              {/*
              <ul className="absolute hidden bg-white text-gray-800 shadow-md mt-2 py-2 rounded">
                <li><Link href="#" className="block px-4 py-2 hover:bg-gray-100">Support</Link></li>
                <li><Link href="#" className="block px-4 py-2 hover:bg-gray-100">FAQ</Link></li>
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
