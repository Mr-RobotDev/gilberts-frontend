'use client'
import { RootState } from '@/app/store/store'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useAuthRedirection = () => {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.authReducer)
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/access')
    } else {
      if (pathname === 'settings' || pathname === '/') {
        router.push('/settings')
      } else if (pathname === 'teacher-interface') {
        router.push('/teacher-interface')
      }
    }
  })

  return <></>
}

export default useAuthRedirection