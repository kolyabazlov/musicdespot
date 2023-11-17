'use client';

import useCognito from '@hooks/useCognito';

export default function Layout({ children }: { children: React.ReactNode }) {
  useCognito();

  return <>{children}</>;
}
