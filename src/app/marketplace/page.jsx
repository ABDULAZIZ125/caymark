import React, { useState, useEffect } from 'react';
import MarketplaceFilters from '../components/MarketplaceFilters';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const MarketplacePage = () => {
  const [view, setView] = useState('grid');
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6;
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [filters, setFilters] = useState({
    vehicle_make: '',
    vehicle_model: '',
    year: '',
    odometer: '',
    transmission: '',
    fuel_type: '',
    damage_type: '',
    drive_type: '',
    exterior_color: '',
    location: '',
    vehicle_type: 'automobile',
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchVehicles();
  }, [filters, currentPage]);

  const fetchVehicles = async () => {
    let query = supabase
      .from('listings')
      .select('*, count(*, { estimate: 'exact' })', { count: 'exact' })
      .eq('is_auction', false)
      .eq('listing_status', 'active');

    // Apply filters
    for (const key in filters) {
      if (filters[key] !== '') {
        if (key === 'vehicle_model') {
          query = query.ilike(key, `%${filters[key]}%`);
        } else {
          query = query.eq(key, filters[key]);
        }
      }
    }

    // Pagination
    const startIndex = (currentPage - 1) * vehiclesPerPage;
    query = query.range(startIndex, startIndex + vehiclesPerPage - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching vehicles:', error);
    } else {
      setVehicles(data || []);
      setTotalVehicles(count || 0);
    }
  };

  const toggleView = () => {
    setView((prevView) => (prevView === 'grid' ? 'list' : 'grid'));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(totalVehicles / vehiclesPerPage);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      <div className="flex">
        <div className="w-1/4">
          <MarketplaceFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={toggleView} className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded">
              Toggle View
            </button>
          </div>
          {vehicles.length > 0 ? (
            <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col space-y-4'}>
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className={view === 'grid' ? 'border rounded p-4' : 'border rounded p-4 flex items-center'}>
                  <img
                    src={vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : 'https://picsum.photos/id/237/400/300'}
                    alt={`${vehicle.vehicle_make} ${vehicle.vehicle_model}`}
                    className={view === 'grid' ? 'w-full h-48 object-cover mb-2' : 'w-48 h-32 object-cover mr-4'}
                  />
                  <div>
                    <h2 className="text-xl font-bold">
                      {vehicle.vehicle_make} {vehicle.vehicle_model}
                    </h2>
                    <p>Year: {vehicle.year}</p>
                    <p>Price: ${vehicle.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No items found.</p>
          )}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={
                  `bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2` + (currentPage === index + 1 ? ' font-bold' : '')
                }
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
