import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);

    // Calculate total price
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, []);

  const handleRemove = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    // Update total after removing item
    const newTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  const handleCheckout = async () => {
    try {
      // Using axios for checkout API call
      const response = await axios.post("http://localhost:3500/api/v1/checkout", { cartItems });
      const result = response.data;

      // Navigate to success or failure page based on the result
      if (result.success) {
        navigate("/payment-success");
      } else {
        navigate("/payment-failure");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      navigate("/payment-failure");
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-2xl mt-10 mb-4 flex justify-center font-semibold font-mono">
        Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="flex justify-center mt-32 text-2xl text-red-600">
          Your cart is empty!
        </p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center justify-between mb-4 mt-10 mx-24 border p-6 px-20 rounded-lg border-black"
            >
              <div>
                <h3 className="text-lg font-mono text-sky-600">{item.name}</h3>
                <p>₹{item.price}</p>
                <p className="text-red-600">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:scale-105"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between mt-10 mx-24">
            <h3 className="text-lg font-semibold">Total: ₹{total}</h3>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
