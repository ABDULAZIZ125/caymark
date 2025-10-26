import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const BuyerDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        router.push('/login');
      }
    };

    getUserData();
  }, [router, supabase]);

  if (!user) {
    return <p>Loading...</p>; // Or a more informative loading state
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <p>Overview of saved items, active bids.</p>;
      case 'myBids':
        return <p>Current and past bids with status.</p>;
      case 'purchaseHistory':
        return <p>Completed purchases.</p>;
      case 'savedListings':
        return <p>Vehicles they're interested in.</p>;
      case 'accountSettings':
        return <p>Profile, payment methods.</p>;
      default:
        return <p>Select a tab.</p>;
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>
      <div className="flex">
        <div className="w-1/4">
          <ul className="space-y-2">
            <li className={`cursor-pointer ${activeTab === 'dashboard' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('dashboard')}>
              Dashboard
            </li>
            <li className={`cursor-pointer ${activeTab === 'myBids' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('myBids')}>
              My Bids
            </li>
            <li className={`cursor-pointer ${activeTab === 'purchaseHistory' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('purchaseHistory')}>
              Purchase History
            </li>
            <li className={`cursor-pointer ${activeTab === 'savedListings' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('savedListings')}>
              Saved Listings
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

export default BuyerDashboardPage;