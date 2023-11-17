'use client';
import { useLazyGetUserQuery } from '@redux/services/protected/protected-api';
import { useEffect } from 'react';

const useCognito = () => {
  const [getUser, { data, error }] = useLazyGetUserQuery();

  const getCredentials = async () => {
    const data = await getUser();
  };

  useEffect(() => {
    getCredentials();
  }, []);
};

export default useCognito;
