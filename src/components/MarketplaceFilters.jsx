import React from 'react';

const MarketplaceFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-gray-100 p-4">
      <h3 className="font-bold mb-2">Filters</h3>
      <div>
        <label htmlFor="make">Make:</label>
        <select id="make" name="vehicle_make" className="w-full" value={filters.vehicle_make || ''} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="bmw">BMW</option>
          <option value="mercedes">Mercedes-Benz</option>
          <option value="toyota">Toyota</option>
        </select>
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" name="vehicle_model" className="w-full" value={filters.vehicle_model || ''} onChange={onFilterChange} />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input type="number" id="year" name="year" className="w-full" value={filters.year || ''} onChange={onFilterChange} />
      </div>
      <div>
        <label htmlFor="odometer">Odometer:</label>
        <input type="number" id="odometer" name="odometer" className="w-full" value={filters.odometer || ''} onChange={onFilterChange} />
      </div>
      <div>
        <label htmlFor="transmission">Transmission:</label>
        <select id="transmission" name="transmission" className="w-full" value={filters.transmission || ''} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>
      <div>
        <label htmlFor="fuel_type">Fuel Type:</label>
        <select id="fuel_type" name="fuel_type" className="w-full" value={filters.fuel_type || ''} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="gasoline">Gasoline</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>
      </div>
      <div>
        <label htmlFor="damage_type">Damage Type:</label>
        <select id="damage_type" name="damage_type" className="w-full" value={filters.damage_type || ''} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="none">None</option>
          <option value="minor">Minor</option>
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
        </select>
      </div>
      <div>
        <label htmlFor="drive_type">Drive Type:</label>
        <select id="drive_type" name="drive_type" className="w-full" value={filters.drive_type || ''} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="fwd">FWD</option>
          <option value="rwd">RWD</option>
          <option value="awd">AWD</option>
          <option value="4wd">4WD</option>
        </select>
      </div>
      <div>
        <label htmlFor="exterior_color">Exterior Color:</label>
        <input type="text" id="exterior_color" name="exterior_color" className="w-full" value={filters.exterior_color || ''} onChange={onFilterChange} />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" className="w-full" value={filters.location || ''} onChange={onFilterChange} />
      </div>
      <div>
        <label htmlFor="vehicle_type">Vehicle Type:</label>
        <select id="vehicle_type" name="vehicle_type" className="w-full" value={filters.vehicle_type || ''} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="automobile">Automobile</option>
          <option value="boat">Boat</option>
          {/* Add other vehicle types here */}
        </select>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
