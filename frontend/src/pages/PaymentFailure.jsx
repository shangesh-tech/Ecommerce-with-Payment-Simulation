import React from "react";

const PaymentFailure = () => {
  return (
    <div className="container p-4 text-center">
      <h2 className="text-3xl font-bold text-red-600 mt-10">Payment Failed</h2>
      <p className="mt-4 text-lg">Unfortunately, there was an issue with your payment. Please try again.</p>
      <button
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:scale-105"
        onClick={() => window.location.href = "/cart"} // Redirect back to cart
      >
        Go Back to Cart
      </button>
    </div>
  );
};

export default PaymentFailure;
