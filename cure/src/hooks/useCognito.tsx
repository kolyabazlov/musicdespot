'use client';
import { useLazyGetUserQuery, useGetUserQuery } from '@redux/services/protected/protected-api';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

// need to understand is useGetUserQuery don't make excessive requests
// and that refresh token updates
const useCognito = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetUserQuery();

  if (!data) {
    router.push('/login');
  }

  console.log('data', data);
};

export default useCognito;
