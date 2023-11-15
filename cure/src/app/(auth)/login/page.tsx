'use client';

import { useLoginMutation } from '@redux/api/auth/auth-api';
import { useLazyGetNothingQuery } from '@redux/api/protected/protected-api';
import { setCredentials } from '@redux/slices/auth/auth-slice';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('bazlov213@gmail.com');
  const [password, setPassword] = useState('Password123!');

  const [login, { isLoading }] = useLoginMutation();
  const [getNothing, { data, error }] = useLazyGetNothingQuery();

  const [user, setUser] = useState();

  const handleLogin = async (payload) => {
    try {
      const tokens = await login(payload).unwrap();
      dispatch(setCredentials({ tokens }));
      console.log('tokenstokenstokenstokenstokenstokenstokenstokenstokens', tokens);
      setUser(tokens);
      console.log('Logged in');
    } catch (err) {
      console.log('Error in handleLogin', err);
    }
  };

  const mockApiRequest = async () => {
    const res = await getNothing();
    console.log('res', res);
  };

  return (
    <div className="bg-white">
      {JSON.stringify(user)}
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
      <div className="border " onClick={mockApiRequest}>
        test request with bearer
      </div>
    </div>
  );
}
