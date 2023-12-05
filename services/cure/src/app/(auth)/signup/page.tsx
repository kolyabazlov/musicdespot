'use client';

import { Amplify, Auth } from 'aws-amplify';

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (values: { username: string; email: string; password: string }) => {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((res) => console.log('res', res))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="bg-white">
      {' '}
      SIGN UP PAGE
      <form>
        <input type="email" name="email" value={email} placeholder="email to register" onChange={(e) => setEmail(e.target.value)}></input>
        <input type="text" name="username" value={username} placeholder="username " onChange={(e) => setUsername(e.target.value)}></input>
        <input
          type="text"
          name="password"
          value={password}
          placeholder="test password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={() => handleSignUp({ email, username, password })} type="button">
          submit
        </button>
      </form>
    </div>
  );
}
