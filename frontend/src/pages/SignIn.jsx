// src/components/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { auth, googleProvider,  signInWithEmailAndPassword ,signInWithPopup } from '../firebase' ;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]= useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      navigate('/'); 
    } catch (err) {
      
      setError(err.message);
      
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
              to="/signup"
            >
              register for a new account
            </Link>
          </p>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 dark:ring-1 dark:ring-gray-700">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <div className="grid grid-cols-1 gap-3 mb-6">
                <button type="button" className="btn btn-outline bg-white " onClick={() => handleSocialSignIn(googleProvider)}>
                  <FaGoogle className="h-5 w-5 " />
                  Google
                </button>
                
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                Email address
              </label>
              <div className="mt-1">
                <input
                  autoComplete="email"
                  className="input input-bordered w-full"
                  id="email"
                  name="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                Password
              </label>
              <div className="mt-1">
                <input
                  autoComplete="current-password"
                  className="input input-bordered w-full"
                  id="password"
                  name="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
                  to="#"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Sign in
              </button>
            </div>
          </form>
          <div className='flex justify-center items-center mt-4'>
            <p className='text-red-600 font-semibold'>{error}</p>
            
            {setTimeout(()=>{
              setError("")
            },10000)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
