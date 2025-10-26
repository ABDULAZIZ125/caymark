import React from 'react';

const MessagingPage = ({ params }) => {
  const { transactionId } = params;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Messaging</h1>
      <p>Messaging portal will open here after a successful purchase for transaction ID: {transactionId}</p>
    </div>
  );
};

export default MessagingPage;