'use client'
import useAuthRedirection from '@/hooks/useAuthRedirection';
import { Metadata } from 'next';

function AuthRedirectionComponent() {
  useAuthRedirection();
  return null;
}

export default function Home() {
  return <>
    <AuthRedirectionComponent />
  </>;
}
