import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
          </button>
          <Link href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" /><span className="ml-2 text-gray-700 text-sm">Remember me</span>
          </label>
        </div>
        <div className="mt-8 text-center">
          <Link href="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
