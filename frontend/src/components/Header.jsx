import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSuggestions, clearSuggestions } from "../app/slices/productSlice.js";
import { RiBtcLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { TbViewfinder } from "react-icons/tb";
import { auth, onAuthStateChanged, signOut } from "../firebase.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const dispatch = useDispatch();
  const suggestions = useSelector((state) => state.products.suggestionList);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      dispatch(searchSuggestions(searchTerm));
    } else {
      dispatch(clearSuggestions());
    }
  }, [searchTerm, dispatch]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("Logout successful");
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  const showModal = () => {
    document.getElementById("my_modal_3").showModal();
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data[0];
      if (data.Status === "Success") {
        setAddress(`${data.PostOffice[0].Name}, ${data.PostOffice[0].District}, ${data.PostOffice[0].State}`);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  const handleApplyPincode = () => {
    if (pincode) {
      fetchAddress();
    } else {
      setAddress("Please enter a valid pincode");
    }
  };

  const detectLocation = () => {
    setLoading(true);
    setGeoError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=0917d6efd6ba4ab8b8e29fa8c2ac6db8`
          );
          const locationData = response.data.results[0];
          setAddress(locationData.formatted);
          const postalCode = locationData.components.postcode;
          setPincode(postalCode);
        } catch (error) {
          console.error("Error detecting location:", error);
          setAddress("Error detecting location");
        } finally {
          setLoading(false);
        }
      }, (error) => {
        setLoading(false);
        setGeoError("Geolocation is not supported by this browser.");
        setAddress("Geolocation is not supported by this browser.");
      });
    } else {
      setLoading(false);
      setGeoError("Geolocation is not supported by this browser.");
      setAddress("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/result/${searchTerm}`);
      dispatch(clearSuggestions());
    }
  };

  return (
    <section>
      <header className="bg-[#0078AD]">
        <div className="mx-5 lg:mx-16 flex justify-between items-center py-3 lg:py-0">
          <div className="flex gap-1 justify-center items-center">
            <Link to="/">
              <RiBtcLine className="text-4xl text-white" />
            </Link>
            <h2 className="text-white font-bold font-mono text-2xl">ReactMart</h2>
          </div>
          <div className="items-center justify-center gap-3 hidden lg:flex">
            {address ? (
              <button
                className="flex gap-1 border rounded-3xl items-center justify-center text-white font-semibold px-5"
                onClick={showModal}
              >
                <FaLocationDot className="text-white text-md" /> {pincode}
              </button>
            ) : (
              <button
                className="flex gap-1 border rounded-3xl items-center justify-center text-white font-semibold px-5"
                onClick={showModal}
              >
                <FaLocationDot className="text-white text-md" /> Select Location
              </button>
            )}

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box bg-gray-200">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Select the Location</h3>
                <div className="flex justify-center items-center gap-4">
                  <h2 className="py-2 text-md font-semibold flex gap-2 justify-center items-center">
                    <IoLocationSharp /> Enter the pincode
                  </h2>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode"
                    className="input input-bordered"
                  />
                  <button
                    onClick={handleApplyPincode}
                    className="text-white bg-sky-600 p-2 border rounded-lg"
                  >
                    Apply
                  </button>
                </div>
                <div className="divider divider-info">Or</div>
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={detectLocation}
                    className="py-2 text-md font-semibold flex gap-2 justify-center items-center border p-2 rounded-full"
                  >
                    <TbViewfinder /> Detect My Location
                  </button>
                  {loading ? (
                    <span className="loading loading-ring loading-md bg-sky-600"></span>
                  ) : (
                    ""
                  )}
                </div>
                {geoError && (
                  <div className="mt-4 text-red-600">
                    <p>{geoError}</p>
                  </div>
                )}
                {address && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Address:</h3>
                    <p>{address}</p>
                  </div>
                )}
              </div>
            </dialog>

            <div>
              <label className="input flex items-center gap-2 bg-slate-800 focus-within:border-white border rounded-full my-3">
                <input
                  type="text"
                  className="grow text-white"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <div>
                {suggestions && (
                  <ul className="absolute bg-slate-500 mt-1 rounded-lg w-60 z-10 transition-all">
                    {suggestions.map((suggestion, index) => (
                      <a
                        key={index}
                        onClick={() => {
                          setSearchTerm(suggestion);
                        }}
                        className="cursor-pointer font-semibold text-white hover:bg-gray-200 hover:text-sky-600 p-2 flex flex-col text-center"
                      >
                        {suggestion}
                      </a>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            {currentUser ? (
              <Link to="/profile">
                <h2 className="text-white font-semibold px-5 py-2 border rounded-full hidden lg:block">Profile</h2>
              </Link>
            ) : (
              <Link to="/signin">
                <h2 className="text-white font-semibold px-3 py-2 border rounded-full">Sign In</h2>
              </Link>
            )}
            <Link to="/cart">
              <h2 className="flex items-center justify-center text-white font-semibold px-5 py-2 border rounded-full">
                <RiShoppingCart2Fill /> Cart
              </h2>
            </Link>
            {currentUser && (
              <h2
                onClick={handleLogout}
                className="cursor-pointer text-red-700 font-semibold px-5 py-2 gap-1 border rounded-full flex justify-center items-center"
              >
                <FaSignInAlt /> <p>Sign Out</p>
              </h2>
            )}
          </div>
        </div>
      </header>
      <div>
        {currentUser ? (
          <h2 className="flex justify-center items-end my-4 font-mono font-semibold text-xl">
            Hello {currentUser.displayName}...
          </h2>
        ) : (
          <h2 className="flex justify-center items-end my-4 font-mono font-semibold text-xl">
            Hello User...
          </h2>
        )}
      </div>
    </section>
  );
};

export default Header;
