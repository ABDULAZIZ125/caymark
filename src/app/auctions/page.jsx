import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

const AuctionBrowsePage = () => {
  const [auctions, setAuctions] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('is_auction', true)
      .eq('listing_status', 'active');

    if (error) {
      console.error('Error fetching auctions:', error);
    } else {
      setAuctions(data || []);
    }
  };

  const calculateTimeLeft = (endTime) => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    if (difference <= 0) return 'Auction Ended';

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auctions.length > 0 ? (
          auctions.map((auction) => (
            <div key={auction.id} className="border rounded p-4">
              <img
                src={auction.images && auction.images.length > 0 ? auction.images[0] : 'https://picsum.photos/id/300/400/300'}
                alt={`${auction.vehicle_make} ${auction.vehicle_model}`}
                className="w-full h-48 object-cover mb-2"
              />
              <h2 className="text-xl font-bold">
                {auction.vehicle_make} {auction.vehicle_model}
              </h2>
              <p>Current Bid: ${auction.current_bid}</p>
              <p>Time Left: {calculateTimeLeft(auction.auction_end_time)}</p>
              <Link href={`/auctions/${auction.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 inline-block">
                Place Bid
              </Link>
            </div>
          ))
        ) : (
          <p>No active auctions found.</p>
        )}
      </div>
    </div>
  );
};

export default AuctionBrowsePage;