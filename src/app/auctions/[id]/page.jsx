import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const AuctionDetailPage = async ({ params }) => {
  const { id } = params;
  const [timeLeft, setTimeLeft] = useState('');
  const supabase = createClientComponentClient();

  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching listing:', error);
    return <p>Error loading listing.</p>;
  }

  if (!listing) {
    return <p>Listing not found.</p>;
  }

  const calculateTimeLeft = (endTime) => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    if (difference <= 0) {
        setTimeLeft('Auction Ended');
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    if(listing.auction_end_time) {
      const intervalId = setInterval(() => {
        calculateTimeLeft(listing.auction_end_time);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [listing.auction_end_time]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {listing.vehicle_make} {listing.vehicle_model} {listing.year}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {listing.images && listing.images.length > 0 ? (
            <img src={listing.images[0]} alt={`${listing.vehicle_make} ${listing.vehicle_model}`} className="w-full h-96 object-cover" />
          ) : (
            <img src="https://picsum.photos/id/1075/600/400" alt="Placeholder" className="w-full h-96 object-cover" />
          )}
        </div>
        <div>
          <p>Current Bid: ${listing.current_bid}</p>
          <p>Time Left: {timeLeft}</p>
          <p>Odometer: {listing.odometer}</p>
          <p>Transmission: {listing.transmission}</p>
          <p>Fuel Type: {listing.fuel_type}</p>
          <p>Exterior Color: {listing.exterior_color}</p>
          <p>Description: {listing.description}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailPage;