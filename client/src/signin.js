import React, { useState } from 'react';
import firebase from './firebaseApp';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
    <center>
        <br/>
        <form onSubmit={handleSignIn}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  class="bg-gray-200 mx-1 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 text-gray-700 leading-tight" placeholder="Email"/>
        <br/>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="bg-gray-200 mx-1 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 my-2 text-gray-700 leading-tight" placeholder="Password"/>
        <br/><button type="submit">Sign In</button>
        </form>
      </center>
    </div>
  );
};

export default SignIn;
