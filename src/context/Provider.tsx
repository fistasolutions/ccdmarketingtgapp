import { DataProvider } from '@/context/ContextData';
import React from 'react'
import { UserProvider } from './CurrentUser';

export default function Provider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <DataProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </DataProvider>
  )
}
