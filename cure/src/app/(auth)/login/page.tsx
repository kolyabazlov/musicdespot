'use client';

import { useLoginMutation } from '@redux/api/auth';

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const [user, setUser] = useState();

  const handleLogin = async (payload) => {
    try {
      const user = await login(payload).unwrap();
      // dispatch(setCredentials({ access_token: '', refresh_token: '' }));
      setUser(user.access_token);
      console.log('Logged in');
    } catch (err) {
      console.log('Error in handleLogin', err);
    }
  };

  const testRequest = () => {};

  return (
    <div className="bg-white">
      {user}
      LOGIN PAGE
      <form>
        <input type="text" name="username" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
        <input
          type="text"
          name="password"
          value={password}
          placeholder="test password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={() => handleLogin({ username, password })} type="button">
          submit
        </button>
      </form>
      <div className="border " onClick={testRequest}>
        test request with bearer
      </div>
    </div>
  );
}
