import React from 'react';


const MarketplaceFilters = () => {
  return (
    <div className="bg-gray-100 p-4">
      <h3 className="font-bold mb-2">Filters</h3>
      {/* Placeholder filters */}
      <div>
        <label htmlFor="make">Make:</label>
        <select id="make" className="w-full">
          <option value="">All</option>
          <option value="bmw">BMW</option>
          <option value="mercedes">Mercedes-Benz</option>
          <option value="toyota">Toyota</option>
        </select>
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" className="w-full" />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input type="number" id="year" className="w-full" />
      </div>
      {/* Add more filters here based on documentation */}
      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Apply Filters</button>
    </div>
  );
};

export default MarketplaceFilters;
