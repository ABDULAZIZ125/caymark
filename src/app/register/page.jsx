import React, { useState } from 'react';

const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    username: '',
    dateOfBirth: '',
    nationality: '',
    island: '',
    id1: null,
    id2: null,
    role: '',
    package: '',
  });

  const bahamasIslands = [
    'New Providence',
    'Grand Bahama',
    'Abaco',
    'Andros',
    'Eleuthera',
    'Exuma',
    'Long Island',
    'Cat Island',
    'San Salvador',
    'Rum Cay',
    'Acklins',
    'Crooked Island',
    'Inagua',
    'Mayaguana',
    'Ragged Island',
  ];

  const buyerPackages = ['Basic', 'Premium', 'VIP'];
  const sellerPackages = ['Standard', 'Pro', 'Enterprise'];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement submission logic here
    console.log(formData);
  };

  const renderStep1 = () => (
    <div>
      <h2>Personal Information & Verification</h2>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} /><br />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} /><br />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
      <input type="email" name="confirmEmail" placeholder="Confirm Email" onChange={handleChange} /><br />
      <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} /><br />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} /><br />
      <input type="date" name="dateOfBirth" onChange={handleChange} /><br />
      <input type="text" name="nationality" placeholder="Nationality" onChange={handleChange} /><br />
      <select name="island" onChange={handleChange}>
        <option value="">Select Island</option>
        {bahamasIslands.map((island) => (
          <option key={island} value={island}>{island}</option>
        ))}
      </select><br />
      <label>ID Upload 1:
        <input type="file" name="id1" onChange={handleChange} />
      </label><br />
      <label>ID Upload 2:
        <input type="file" name="id2" onChange={handleChange} />
      </label><br />
      <label>
        <input type="checkbox" name="terms" /> Agree to terms and conditions
      </label><br />
      <button onClick={nextStep}>Next</button>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2>Role & Package Selection</h2>
      <label>
        <input type="radio" name="role" value="buyer" onChange={handleChange} /> Buyer
      </label>
      <label>
        <input type="radio" name="role" value="seller" onChange={handleChange} /> Seller
      </label><br />
      {formData.role && (
        <div>
          <h3>Select Package:</h3>
          {formData.role === 'buyer' ? (
            buyerPackages.map((pkg) => (
              <label key={pkg}>
                <input type="radio" name="package" value={pkg} onChange={handleChange} /> {pkg}
              </label>
            ))
          ) : (
            sellerPackages.map((pkg) => (
              <label key={pkg}>
                <input type="radio" name="package" value={pkg} onChange={handleChange} /> {pkg}
              </label>
            ))
          )}
        </div>
      )}<br />
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep} disabled={!formData.role || !formData.package}>Next</button>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2>Payment</h2>
      {/* Placeholder Payment Form */}
      <p>Payment form for {formData.package} package</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      {renderStep()}
    </div>
  );
};

export default RegistrationPage;