import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SellerDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [listingForm, setListingForm] = useState({
    vehicle_make: '',
    vehicle_model: '',
    year: '',
    vehicle_type: 'Automobile',
    transmission: '',
    fuel_type: '',
    drive_type: '',
    exterior_color: '',
    odometer: '',
    condition: '',
    damage_type: '',
    description: '',
    price: '',
    is_auction: false,
    auction_end_time: '',
    images: [],
  });

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        router.push('/login');
      } else {
        fetchListings(user.id);
      }
    };

    getUserData();
  }, [router, supabase]);

  const fetchListings = async (userId) => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('seller_id', userId);

    if (error) {
      console.error('Error fetching listings:', error);
    } else {
      setListings(data || []);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setListingForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files : value,
    }));
  };

  const handleSubmitListing = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('listings')
        .insert([{
          ...listingForm,
          seller_id: user.id,
        }])
        .select();

      if (error) {
        console.error('Error submitting listing:', error);
        alert(`Error submitting listing: ${error.message}`);
      } else {
        console.log('Listing submitted successfully!');
        alert('Listing submitted successfully!');
        fetchListings(user.id); // Refresh listings
        // Reset the form
        setListingForm({
          vehicle_make: '',
          vehicle_model: '',
          year: '',
          vehicle_type: 'Automobile',
          transmission: '',
          fuel_type: '',
          drive_type: '',
          exterior_color: '',
          odometer: '',
          condition: '',
          damage_type: '',
          description: '',
          price: '',
          is_auction: false,
          auction_end_time: '',
          images: [],
        });
        setActiveTab('myListings'); // Redirect to My Listings
      }
    } catch (err) {
      console.error('Unexpected error submitting listing:', err);
      alert(`Unexpected error submitting listing: ${err.message}`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <p>Overview of active listings, views, etc.</p>;
      case 'submitListing':
        return (
          <form onSubmit={handleSubmitListing} className="max-w-lg">
            <h2 className="text-xl font-bold mb-4">Submit a Listing</h2>
            <div className="mb-4">
              <label htmlFor="vehicle_make" className="block text-gray-700 text-sm font-bold mb-2">Make:</label>
              <input type="text" id="vehicle_make" name="vehicle_make" value={listingForm.vehicle_make} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="vehicle_model" className="block text-gray-700 text-sm font-bold mb-2">Model:</label>
              <input type="text" id="vehicle_model" name="vehicle_model" value={listingForm.vehicle_model} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Year:</label>
              <input type="number" id="year" name="year" value={listingForm.year} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {/* Add more form fields for all other columns */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
              <textarea id="description" name="description" value={listingForm.description} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>

             <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
              <input type="number" id="price" name="price" value={listingForm.price} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-4">
              <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">Images:</label>
              <input type="file" id="images" name="images" onChange={handleInputChange} multiple className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit Listing
            </button>
          </form>
        );
      case 'myListings':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">My Listings</h2>
            {listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="border rounded p-4">
                    <img
                      src={listing.images && listing.images.length > 0 ? listing.images[0] : 'https://picsum.photos/id/237/400/300'}
                      alt={`${listing.vehicle_make} ${listing.vehicle_model}`}
                      className="w-full h-48 object-cover mb-2"
                    />
                    <h3 className="text-lg font-bold">
                      {listing.vehicle_make} {listing.vehicle_model}
                    </h3>
                    <p>Price: ${listing.price}</p>
                    <Link href={`/marketplace/${listing.id}`}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 inline-block">View</Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>No listings found.</p>
            )}
          </div>
        );
      case 'salesHistory':
        return <p>Past sales.</p>;
      case 'accountSettings':
        return <p>Profile, payment methods, subscription details.</p>;
      default:
        return <p>Select a tab.</p>;
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <div className="flex">
        <div className="w-1/4">
          <ul className="space-y-2">
            <li className={`cursor-pointer ${activeTab === 'dashboard' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('dashboard')}>
              Dashboard
            </li>
            <li className={`cursor-pointer ${activeTab === 'submitListing' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('submitListing')}>
              Submit a Listing
            </li>
            <li className={`cursor-pointer ${activeTab === 'myListings' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('myListings')}>
              My Listings
            </li>
            <li className={`cursor-pointer ${activeTab === 'salesHistory' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('salesHistory')}>
              Sales History
            </li>
            <li className={`cursor-pointer ${activeTab === 'accountSettings' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('accountSettings')}>
              Account Settings
            </li>
          </ul>
        </div>
        <div className="w-3/4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;