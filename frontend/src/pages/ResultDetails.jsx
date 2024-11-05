// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Rating from "../components/Rating";

// const ResultDetails = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3500/api/v1/product/${productId}`
//         );
//         setProduct(response.data);
//       } catch (err) {
//         setError("Failed to fetch product details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [productId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-ring loading-lg bg-sky-600"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <section className="container  p-4">
//       {product && (
//         <>
//           <div className="flex flex-col md:flex-row items-center md:items-start">
//               <div className="w-6/12 ms-10 mt-6">
//                 <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box h-96">
//                   <div className="carousel-item">
//                     <img
//                       key={0}
//                       src={`http://localhost:3500/images/${product.images[0].image}`}
//                       alt={product.name}
//                       className="rounded-box"
//                     />
//                   </div>

//                   <div className="carousel-item">
//                     <img
//                       key={1}
//                       src={`http://localhost:3500/images/${product.images[1].image}`}
//                       alt={product.name}
//                       className="rounded-box"
//                     />
//                   </div>
//                   <div className="carousel-item">
//                     <img
//                       key={1}
//                       src={`http://localhost:3500/images/${product.images[2].image}`}
//                       alt={product.name}
//                       className="rounded-box"
//                     />
//                   </div>
//                   <div className="carousel-item">
//                     <img
//                       key={1}
//                       src={`http://localhost:3500/images/${product.images[3].image}`}
//                       alt={product.name}
//                       className="rounded-box"
//                     />
//                   </div>
//                 </div>

//               </div>

//             <div className="md:ml-4 w-6/12  my-20 px-20">
//               <h2 className="text-2xl font-semibold font-mono ">{product.name}</h2>
//               <p className="mt-6 text-gray-600">{product.description}</p>
//               <Rating rating={product.ratings} numOfReviews={product.numOfReviews} />
//               {product.stock>0?<p className="mt-3 text-lg font-bold font-mono text-green-600">Stock Available For Shipping</p>:<p className="mt-3 text-lg font-bold font-mono text-red-600">Out Of Stock</p>}

//               <p className="mt-3 text-lg font-bold">₹{product.price}</p>
//               <button className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg ${product.stock>0?null:"cursor-not-allowed opacity-50"}`}>
//                 Add to Cart
//               </button>
//               <div className="flex gap-6 mt-5">
//                 <p className="mt-3 text-md font-bold font-mono text-sky-600">Category : {product.category}</p>
//                 <p className="mt-3 text-ms font-bold font-mono text-red-600">Seller :{product.seller}</p>
//               </div>

//             </div>
//           </div>
//           {/* <div className="mt-8">
//             <h3 className="text-xl font-semibold">Customer Reviews</h3>
//             {product.reviews.map((review, index) => (
//               <div key={index} className="mt-4 p-4 border rounded-lg shadow-sm">
//                 <p className="text-gray-800">{review.comment}</p>
//                 <p className="text-gray-600">- {review.author}</p>
//               </div>
//             ))}
//           </div> */}
//         </>
//       )}
//     </section>
//   );
// };

// export default ResultDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../components/Rating";

const ResultDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/api/v1/product/${productId}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000); // Alert visible for 3 seconds
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg bg-sky-600"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="container p-4">
      {product && (
        <>
          {alertVisible && (
            <div className="alert alert-success fixed shadow-lg z-50 w-3/12 top-20 right-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Item added to cart!</span>
              </div>
            </div>
          )}
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-6/12 ms-10 mt-6">
              <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box h-96">
                {product.images.map((image, index) => (
                  <div className="carousel-item" key={index}>
                    <img
                      src={`http://localhost:3500/images/${image.image}`}
                      alt={product.name}
                      className="rounded-box"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:ml-4 w-6/12 my-20 px-20">
              <h2 className="text-2xl font-semibold font-mono ">
                {product.name}
              </h2>
              <p className="mt-6 text-gray-600">{product.description}</p>
              <Rating
                rating={product.ratings}
                numOfReviews={product.numOfReviews}
              />
              {product.stock > 0 ? (
                <p className="mt-3 text-lg font-bold font-mono text-green-600">
                  Stock Available For Shipping
                </p>
              ) : (
                <p className="mt-3 text-lg font-bold font-mono text-red-600">
                  Out Of Stock
                </p>
              )}

              <p className="mt-3 text-lg font-bold">₹{product.price}</p>
              <button
                onClick={addToCart}
                className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg ${
                  product.stock > 0 ? null : "cursor-not-allowed opacity-50"
                } hover:scale-105`}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <div className="flex gap-6 mt-5">
                <p className="mt-3 text-md font-bold font-mono text-sky-600">
                  Category: {product.category}
                </p>
                <p className="mt-3 text-ms font-bold font-mono text-red-600">
                  Seller: {product.seller}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ResultDetails;
