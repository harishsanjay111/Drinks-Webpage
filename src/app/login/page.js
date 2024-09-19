'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './login.css';
import { signIn } from 'next-auth/react';


const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginProcess,SetloginProcess] = useState(false)
  
 async function handleFormSubmit (ev)  {
  ev.preventDefault();
  SetloginProcess(true);
 await signIn('credentials', {email, password , callbackUrl: "/"});
SetloginProcess(false);


}

  

  return (
    <div>

   
      <h1 className="Register text-center text-4xl">Login</h1>
     
      <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
        
        <input
          className="block w-full my-4 rounded-xl p-4 border border-gray-300 bg-gray-200"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          disabled = {loginProcess}
          
          />
        <input
          className="block w-full my-4 rounded-xl p-4 border border-gray-300 bg-gray-200"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          disabled ={loginProcess}

          
        />
        <button
          className="register-btn block w-full font-semibold border rounded-xl px-6 py-2"
          type="submit"
          disabled={loginProcess}
        >
          Login
        </button>
        <button type='button' onClick={() => signIn('google',{callbackUrl: "/"})} className="mt-4 flex gap-4 w-full font-semibold border rounded-xl px-6 py-2 justify-center">
          <img src={'./Google.png'} alt="Google logo" width={23} height={32} />
          Login with Google
        </button>
        <div className='text-center my-4 text-gray-400'>
        Existing account?{' '}
        <Link className='underline' href={'/login'}>Login here &raquo;</Link>
        
        </div>
      </form>
    </div>
  );
};
 
export default RegisterPage;
