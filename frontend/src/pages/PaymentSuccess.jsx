import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="container p-4 text-center">
      <h2 className="text-3xl font-bold text-green-600 mt-10">Payment Successful!</h2>
      <p className="mt-4 text-lg">Thank you for your purchase. Your order has been processed successfully.</p>
      <button
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:scale-105"
        onClick={() => window.location.href = "/"} // Redirect to homepage
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default PaymentSuccess;
