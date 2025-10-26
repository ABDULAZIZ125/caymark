import React, { useState } from 'react';
import MarketplaceFilters from '../components/MarketplaceFilters';

const MarketplacePage = () => {
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [vehicles, setVehicles] = useState([
    { id: 1, image: 'https://picsum.photos/id/1075/400/300', make: 'BMW', model: 'M5', year: 2022, price: 85000 },
    { id: 2, image: 'https://picsum.photos/id/1025/400/300', make: 'Mercedes-Benz', model: 'C-Class', year: 2021, price: 60000 },
    { id: 3, image: 'https://picsum.photos/id/1069/400/300', make: 'Toyota', model: 'Camry', year: 2023, price: 30000 },
  ]); // Placeholder vehicle data
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6;

  const toggleView = () => {
    setView(prevView => (prevView === 'grid' ? 'list' : 'grid'));
  };

  // Placeholder pagination
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      <div className="flex">
        {/* Filters Sidebar */}
        <div className="w-1/4">
          <MarketplaceFilters />
        </div>

        {/* Vehicle Listings */}
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={toggleView} className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded">Toggle View</button>
          </div>

          {/* Vehicle Grid/List */}
          {vehicles.length > 0 ? (
            <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col space-y-4'}>
              {currentVehicles.map(vehicle => (
                <div key={vehicle.id} className={view === 'grid' ? 'border rounded p-4' : 'border rounded p-4 flex items-center'}>
                  <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className={view === 'grid' ? 'w-full h-48 object-cover mb-2' : 'w-48 h-32 object-cover mr-4'} />
                  <div>
                    <h2 className="text-xl font-bold">{vehicle.make} {vehicle.model}</h2>
                    <p>Year: {vehicle.year}</p>
                    <p>Price: ${vehicle.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No results found.</p>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(vehicles.length / vehiclesPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2">{index + 1}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
