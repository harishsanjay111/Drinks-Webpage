'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './register.css';
import { signIn } from 'next-auth/react';
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [LastName, SetLastName] = useState('');
  const [error, setError] = useState('');
  const [creatingUser, SetcreatingUser] = useState(true)
  const [Usercreated,SetcreatedUser] = useState(false)
 

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    SetcreatingUser(true)
    SetcreatedUser(false)

    // Client-side password validation
    if (email.length === 0,password.length === 0) {
      setError('Both fields are empty');
      return;
    }
    if (email.length === 0) {
      setError('Email is empty');
      return;
    }
    if (password.length === 0) {
      setError('Password is empty');
      return;
    }
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Duplicate key error on email
      throw new Error("Already have an account, please login"); // Custom error
    }
    
    
    // https://drinksapp-90ea4-default-rtdb.firebaseio.com/drinks.json
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        
        body: JSON.stringify({ email, password,name,LastName }),  
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setError(''); // Clear any previous error messages
      console.log('User registered successfully!');
      
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Already have an account please login');
    }
    SetcreatingUser(false)
    SetcreatedUser(true)
    
  }

  return (
    <div>

   
      <h1 className="Register text-center text-4xl">Register</h1>
      {
        Usercreated && <div className='text-center mt-7'>
        User created.<br/>please<Link href={"login"} className='underline'>Login &raquo;</Link>
        </div>
      }
      <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
        {error && <div className="error-message text-red-500">{error}</div>}
        <input
        className="block w-full my-4 rounded-xl p-4 border border-gray-300 bg-gray-200"
        type="text"
        placeholder="First name"
        name="firstname"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <input
          className="block w-full my-4 rounded-xl p-4 border border-gray-300 bg-gray-200"
          type="text"
          placeholder="Last name"
          name="lastname"
          value={LastName}
          onChange={(ev) => SetLastName(ev.target.value)}
        />
        <input
          className="block w-full my-4 rounded-xl p-4 border border-gray-300 bg-gray-200"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          className="block w-full my-4 rounded-xl p-4 border border-gray-300 bg-gray-200"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          className="register-btn block w-full font-semibold border rounded-xl px-6 py-2"
          type="submit"
        >
          Register
        </button>
        
      </form>
      <div className='max-w-xl mx-auto'>
      <button onClick={() => signIn('google',{callbackUrl: "/"})} className="mt-4 flex gap-4 w-full font-semibold border rounded-xl px-4 py-2 justify-center">
          <img src={'./Google.png'} alt="Google logo" width={23} height={32} />
          Login with Google
        </button>
        </div>
        <div className='text-center my-4 text-gray-400'>
        Existing account?{' '}
        <Link className='underline' href={'login'}>Login here &raquo;</Link>
        
        </div>
    </div>
  );
};
 
export default RegisterPage;
