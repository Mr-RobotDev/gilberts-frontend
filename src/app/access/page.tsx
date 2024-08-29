'use client'
import { Input } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { login } from '../store/slice/authSlice'
import useSessionTimeout from '@/hooks/useSessionTimeout'

const AuthPage = () => {
  const [password, setPassword] = useState('')
  const [displayPassword, setDisplayPassword] = useState('')
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const addToPassword = useCallback((num: string) => {
    setPassword(prevPassword => prevPassword + num)
    setDisplayPassword(prevDisplayPassword => prevDisplayPassword + num)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayPassword('*'.repeat(password.length + 1))
    }, 500)
  }, [password.length])

  const clearPassword = () => {
    setPassword('')
    setDisplayPassword('')
  }

  const handleEnter = useCallback(() => {
    if (password === process.env.NEXT_PUBLIC_SETTINGS_PASSWORD) {
      dispatch(login({ userType: 'Engineer' }));
      router.push('/settings')
    } else if (password === process.env.NEXT_PUBLIC_TEACHER_PASSWORD) {
      dispatch(login({ userType: 'User' }));
      router.push('/teacher-interface')
    } else {
      toast.error('Incorrect password')
    }
  }, [dispatch, password, router])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') {
      addToPassword(e.key);
      setActiveKey(e.key);

      setTimeout(() => {
        setActiveKey(null);
      }, 200); // Reset after 200ms for visual feedback
    } else if (e.key === 'Enter') {
      handleEnter();
    } else if (e.key === 'Backspace') {
      setPassword(prevPassword => prevPassword.slice(0, -1));
      setDisplayPassword(prevDisplayPassword => prevDisplayPassword.slice(0, -1));
    }
  }, [addToPassword, handleEnter])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="py-8">
        <Image src="/gilbert-logo.jpeg" alt="Logo" width={200} height={200} />
      </div>
      <div className='flex justify-center items-center flex-col mt-28'>
        <div className='flex flex-col gap-2'>
          <Input type='text' className='h-16 text-2xl cursor-not-allowed text-center' readOnly value={displayPassword} />
          <div className='flex flex-row gap-2'>
            <div
              onClick={() => addToPassword('1')}
              className={` bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '1' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              1
            </div>
            <div
              onClick={() => addToPassword('2')}
              className={`bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '2' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              2
            </div>
            <div
              onClick={() => addToPassword('3')}
              className={`bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '3' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              3
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div
              onClick={() => addToPassword('4')}
              className={`bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '4' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              4
            </div>
            <div
              onClick={() => addToPassword('5')}
              className={`bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '5' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              5
            </div>
            <div
              onClick={() => addToPassword('6')}
              className={`bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '6' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              6
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div
              onClick={() => addToPassword('7')}
              className={`bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '7' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              7
            </div>
            <div
              onClick={() => addToPassword('8')}
              className={`bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '8' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              8
            </div>
            <div
              onClick={() => addToPassword('9')}
              className={`bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '9' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              9
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div onClick={clearPassword} className='bg-red-200 flex-1 h-16 flex justify-center items-center text-sm cursor-pointer hover:bg-red-300 duration-200 transition-all transform rounded-md'>Clear</div>
            <div
              onClick={() => addToPassword('0')}
              className={`bg-slate-200 flex-1 h-16 flex justify-center items-center text-xl cursor-pointer duration-200 transition-all transform rounded-md ${activeKey === '0' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
              0
            </div>
            <div onClick={handleEnter} className='bg-blue-200 flex-1 h-16 flex justify-center items-center text-sm cursor-pointer hover:bg-blue-300 duration-200 transition-all transform rounded-md'>Enter</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
