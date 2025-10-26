import React from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const HomePage = async () => {
  const supabase = createClientComponentClient();

  const { data: auctionListings, error: auctionError } = await supabase
    .from('listings')
    .select('*')
    .eq('is_auction', true)
    .eq('listing_status', 'active')
    .limit(3);

  if (auctionError) {
    console.error('Error fetching auction listings:', auctionError);
  }

  const { data: marketplaceListings, error: marketplaceError } = await supabase
    .from('listings')
    .select('*')
    .eq('is_auction', false)
    .eq('listing_status', 'active')
    .limit(3);

  if (marketplaceError) {
    console.error('Error fetching marketplace listings:', marketplaceError);
  }

  return (
    <div className="container mx-auto">
      {/* Rotating Banner Placeholder */}
      <div className="h-96 bg-gray-200 mb-8">Rotating Banner</div>

      {/* Popular Car Auctions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Car Auctions</h2>
        <div className="flex overflow-x-auto space-x-4">
          {auctionListings && auctionListings.length > 0 ? (
            auctionListings.map((listing) => (
              <div key={listing.id} className="w-64 h-48 bg-gray-300 relative">
                <img src={listing.images && listing.images.length > 0 ? listing.images[0] : 'https://picsum.photos/id/237/400/300'} alt={`${listing.vehicle_make} ${listing.vehicle_model}`} className="w-full h-32 object-cover"/>
                <div className="p-2">
                  <h3 className="text-lg font-bold">{listing.vehicle_make} {listing.vehicle_model}</h3>
                  <p>Current Bid: ${listing.current_bid}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No active auctions found.</p>
          )}
        </div>
      </section>

      {/* Popular Cars For Sale */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Cars For Sale</h2>
        <div className="flex overflow-x-auto space-x-4">
          {marketplaceListings && marketplaceListings.length > 0 ? (
            marketplaceListings.map((listing) => (
              <div key={listing.id} className="w-64 h-48 bg-gray-300 relative">
               <img src={listing.images && listing.images.length > 0 ? listing.images[0] : 'https://picsum.photos/id/237/400/300'} alt={`${listing.vehicle_make} ${listing.vehicle_model}`} className="w-full h-32 object-cover"/>
                <div className="p-2">
                  <h3 className="text-lg font-bold">{listing.vehicle_make} {listing.vehicle_model}</h3>
                  <p>Price: ${listing.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No cars for sale found.</p>
          )}
        </div>
      </section>

      {/* Vehicle Finder */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Vehicle Finder</h2>
        <div className="bg-gray-100 p-4">
          {/* Placeholder Vehicle Finder Form */}
          <input type="text" placeholder="Make" className="mb-2" /><br />
          <input type="text" placeholder="Model" className="mb-2" /><br />
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Search</button>
        </div>
      </section>

      {/* Mini Registration Form */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Register Now</h2>
        <div className="bg-gray-100 p-4">
          {/* Placeholder Registration Form */}
          <input type="email" placeholder="Email" className="mb-2" /><br />
          <button className="bg-green-500 text-white py-2 px-4 rounded">Sign Up</button>
        </div>
      </section>

      {/* 4 Photo Highlights */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Photo Highlights</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-48 bg-gray-300">Highlight 1</div>
          <div className="h-48 bg-gray-300">Highlight 2</div>
          <div className="h-48 bg-gray-300">Highlight 3</div>
          <div className="h-48 bg-gray-300">Highlight 4</div>
        </div>
      </section>

      {/* What is CayMark? */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What is CayMark?</h2>
        <p>CayMark is The Bahamas' premier online marketplace for buying and selling vehicles. We connect buyers and sellers, offering a wide selection of cars, trucks, boats, and more. Whether you're looking for a reliable family car or a luxurious yacht, CayMark is your one-stop destination.</p>
      </section>

      {/* Newsletter Signup */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Sign Up for Our Newsletter</h2>
        <div className="bg-gray-100 p-4">
          <input type="email" placeholder="Your Email" className="mb-2" /><br />
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Subscribe</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
