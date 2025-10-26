import React, { useState } from 'react';
--- a/src/pages/MarketplacePage.js
+++ b/src/pages/MarketplacePage.js
@@ -1,18 +1,29 @@
-import React, { useState } from 'react';
+import React, { useState, useEffect } from 'react';
import MarketplaceFilters from '../components/MarketplaceFilters';
+import { supabase } from '../../lib/supabaseClient';

const MarketplacePage = () => {
  const [view, setView] = useState('grid'); // 'grid' or 'list'






-  const [vehicles, setVehicles] = useState([
-    { id: 1, image: 'https://picsum.photos/id/1075/400/300', make: 'BMW', model: 'M5', year: 2022, price: 85000 },
-    { id: 2, image: 'https://picsum.photos/id/1025/400/300', make: 'Mercedes-Benz', model: 'C-Class', year: 2021, price: 60000 },
-    { id: 3, image: 'https://picsum.photos/id/1069/400/300', make: 'Toyota', model: 'Camry', year: 2023, price: 30000 },
-  ); // Placeholder vehicle data
+  const [vehicles, setVehicles] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6;
+  const [filters, setFilters] = useState({
+    make: '',
+    model: '',
+    year: '',
+  });
+
+  useEffect(() => {
+    fetchVehicles();
+  }, [filters]);
+
+  const fetchVehicles = async () => {
+    let query = supabase.from('vehicles').select('*');

  const toggleView = () => {
    setView(prevView => (prevView === 'grid' ? 'list' : 'grid'));
+    if (filters.make) {
+      query = query.eq('make', filters.make);
+    }
  };

  // Placeholder pagination




@@ -23,6 +34,26 @@
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

+    if (filters.model) {
+      query = query.ilike('model', `%${filters.model}%`); // Case-insensitive search
+    }
+    if (filters.year) {
+      query = query.eq('year', filters.year);
+    }
+
+    const { data, error } = await query;
+
+    if (error) {
+      console.error('Error fetching vehicles:', error);
+    } else {
+      setVehicles(data || []);
+    }
+  };
+
+  const toggleView = () => {
+    setView(prevView => (prevView === 'grid' ? 'list' : 'grid'));
+  };
+
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
























@@ -57,6 +88,15 @@
              ))}
            </div>









         </div>
+  const handleFilterChange = (e) => {
+    const { name, value } = e.target;
+    setFilters(prevFilters => ({
+      ...prevFilters,
+      [name]: value,
+    }));
+    setCurrentPage(1); // Reset to first page on filter change
+  };
+
          </div>
        </div>


  );




