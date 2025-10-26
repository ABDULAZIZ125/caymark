--- a/src/RegistrationPage.js
+++ b/src/RegistrationPage.js
@@ -1,5 +1,7 @@
-import React, { useState } from 'react';
+import React, { useState } from 'react';
+import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
+import { useRouter } from 'next/navigation';

const RegistrationPage = () => {
  const [step, setStep] = useState(1);
@@ -20,8 +22,7 @@
     island: '',
    id1: null,
    id2: null,
-    role: '',
-    package: '',
+    subscription_plan: 'guest',
  });

  const bahamasIslands = [
@@ -41,11 +42,19 @@
    'Ragged Island',
  ];

-  const buyerPackages = ['Basic', 'Premium', 'VIP'];
-  const sellerPackages = ['Standard', 'Pro', 'Enterprise'];
+  const packages = {
+    buyer: {
+      basic_buyer: 'Basic Buyer',
+      premium_buyer: 'Premium Buyer',
+    },
+    seller: {
+      casual_seller: 'Casual Seller',
+      standard_seller: 'Standard Seller',
+      advanced_seller: 'Advanced Seller',
+    },
+  };

  const handleChange = (e) => {
-    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
@@ -53,16 +62,12 @@
   };
  const nextStep = () => {
+    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
-  };
-
-  const handleSubmit = (e) => {
-    e.preventDefault();
-    // Implement submission logic here
    console.log(formData);
  };

@@ -89,6 +94,22 @@
        <input type="file" name="id2" onChange={handleChange} />
      </label><br />
      <label>
+import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
+import { useRouter } from 'next/navigation';
+
+const RegistrationPage = () => {
+  const [step, setStep] = useState(1);
+  const [formData, setFormData] = useState({
+    firstName: '',
+    lastName: '',
+    email: '',
+    confirmEmail: '',
+    phoneNumber: '',
+    password: '',
+    confirmPassword: '',
+    username: '',
+    dateOfBirth: '',
+    nationality: '',
        <input type="checkbox" name="terms" /> Agree to terms and conditions
      </label><br />
      <button onClick={nextStep}>Next</button>
@@ -127,6 +148,67 @@
     console.log(formData);
   };

+
+    const router = useRouter();
+  const supabase = createClientComponentClient();
+
+  const handleChange = (e) => {
+    const { name, value, type, files, checked } = e.target;
+    setFormData((prevData) => ({
+      ...prevData,
+      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
+    }));
+  };
+
+  const nextStep = () => {
+    if (step === 1 && !validateStep1()) return;
+    setStep(step + 1);
+  };
+
+  const prevStep = () => {
+    setStep(step - 1);
+  };
+
+  const validateStep1 = () => {
+    // Add validation logic here (e.g., check required fields, email format, password match)
+    if (!formData.firstName || !formData.lastName || !formData.email || formData.email !== formData.confirmEmail || !formData.password || formData.password !== formData.confirmPassword || !formData.username || !formData.dateOfBirth || !formData.nationality || !formData.island || !formData.terms) {
+      alert('Please fill in all required fields and ensure email and password match.');
+      return false;
+    }
+    return true;
+  };
+
+  const handleSubmit = async (e) => {
+    e.preventDefault();
+    if (step === 3) {
+      // Process registration here
+      try {
+        const { data: authData, error: authError } = await supabase.auth.signUp({
+          email: formData.email,
+          password: formData.password,
+          options: {
+            data: {
+              full_name: `${formData.firstName} ${formData.lastName}`,
+              username: formData.username,
+              role: formData.role,
+              phone_number: formData.phoneNumber,
+              nationality: formData.nationality,
+              island: formData.island,
+              date_of_birth: formData.dateOfBirth,
+              subscription_plan: formData.subscription_plan,
+            },
+          },
+        });
+
+        if (authError) {
+          console.error('Error signing up:', authError);
+          alert(`Error signing up: ${authError.message}`);
+        } else {
+          // Create user profile in the profiles table
+          const { error: profileError } = await supabase
+            .from('profiles')
+            .insert([{
+              id: authData.user.id,
   const renderStep1 = () => (
    <div>
       <h2>Personal Information & Verification</h2>
@@ -161,6 +243,67 @@
        </div>
  );

+              updated_at: new Date(),
+              username: formData.username,
+              full_name: `${formData.firstName} ${formData.lastName}`,
+              role: formData.role,
+              phone_number: formData.phoneNumber,
+              nationality: formData.nationality,
+              island: formData.island,
+              date_of_birth: formData.dateOfBirth,
+              subscription_plan: formData.subscription_plan,
+            }]);
+
+          if (profileError) {
+            console.error('Error creating profile:', profileError);
+            alert(`Error creating profile: ${profileError.message}`);
+          } else {
+            console.log('Registration successful!');
+            alert('Registration successful!');
+            router.push('/login');
+          }
+        }
+      } catch (error) {
+        console.error('Unexpected error:', error);
+        alert(`Unexpected error: ${error.message}`);
+      }
+    }
+  };
+
+  const renderStep1 = () => (
+    <div>
+      <h2>Personal Information & Verification</h2>
+      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} /><br />
+      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} /><br />
+      <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
+      <input type="email" name="confirmEmail" placeholder="Confirm Email" onChange={handleChange} /><br />
+      <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} /><br />
+      <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
+      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} /><br />
+      <input type="text" name="username" placeholder="Username" onChange={handleChange} /><br />
+      <input type="date" name="dateOfBirth" onChange={handleChange} /><br />
+      <input type="text" name="nationality" placeholder="Nationality" onChange={handleChange} /><br />
+      <select name="island" onChange={handleChange}>
+        <option value="">Select Island</option>
+        {bahamasIslands.map((island) => (
+          <option key={island} value={island}>{island}</option>
+        ))}
+      </select><br />
+      <label>ID Upload 1:
+        <input type="file" name="id1" onChange={handleChange} />
+      </label><br />
+      <label>ID Upload 2:
+        <input type="file" name="id2" onChange={handleChange} />
+      </label><br />
+      <label>
+        <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} /> Agree to terms and conditions
+      </label><br />
+      <button onClick={nextStep}>Next</button>
+    </div>
+  );
+
+  const renderStep2 = () => {
+    const handleRoleChange = (e) => {
+  const renderStep2 = () => (
    <div>
       <h2>Role & Package Selection</h2>
       <label>
@@ -188,6 +331,31 @@
    </div>
       )}<br />
       <button onClick={prevStep}>Previous</button>
+      handleChange(e);
+      // Reset subscription plan when role changes
+      setFormData(prevData => ({ ...prevData, subscription_plan: 'guest' }));
+    };
+
+    return (
+      <div>
+        <h2>Role & Package Selection</h2>
+        <label>
+          <input type="radio" name="role" value="buyer" onChange={handleRoleChange} /> Buyer
+        </label>
+        <label>
+          <input type="radio" name="role" value="seller" onChange={handleRoleChange} /> Seller
+        </label><br />
+        {formData.role && (
+          <div>
+            <h3>Select Package:</h3>
+            {Object.entries(packages[formData.role]).map(([key, value]) => (
+              <label key={key}>
+                <input type="radio" name="subscription_plan" value={key} onChange={handleChange} /> {value}
+              </label>
+            ))}
+          </div>
+        )}<br />
+      <button onClick={prevStep}>Previous</button>
       <button onClick={nextStep} disabled={!formData.role || !formData.package}>Next</button>
     </div>
  );
@@ -230,6 +398,6 @@
     }
};

+
   return (
     <div>
       <h1>Registration</h1>
