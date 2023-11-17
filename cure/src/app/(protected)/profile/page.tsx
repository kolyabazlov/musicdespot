'use client';

import { useGetUserQuery } from '@redux/services/protected/protected-api';

export default function Page() {
  const { data, isLoading, error } = useGetUserQuery();

  return <div>Hello, {data?.Username}!</div>;
}
