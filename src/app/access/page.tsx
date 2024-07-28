'use client'
import { Input } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { login } from '../store/slice/authSlice'
import useSessionTimeout from '@/hooks/useSessionTimeout'

const AuthPage = () => {
  const [password, setPassword] = useState('')
  const [displayPassword, setDisplayPassword] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const addToPassword = (num: string) => {
    setPassword(prevPassword => prevPassword + num)
    setDisplayPassword(prevDisplayPassword => prevDisplayPassword + num)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayPassword('*'.repeat(password.length + 1))
    }, 500)
  }

  const clearPassword = () => {
    setPassword('')
    setDisplayPassword('')
  }

  const handleEnter = () => {
    if (password === process.env.NEXT_PUBLIC_SETTINGS_PASSWORD) {
      dispatch(login())
      router.push('/settings')
    } else if (password === process.env.NEXT_PUBLIC_TEACHER_PASSWORD) {
      dispatch(login())
      router.push('/teacher-interface')
    } else {
      toast.error('Incorrect password')
    }
  }

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
        <div>
          <Input type='text' className='h-16 text-2xl cursor-not-allowed text-center' readOnly value={displayPassword} />
          <div className='flex flex-row gap-2'>
            <div onClick={() => addToPassword('1')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>1</div>
            <div onClick={() => addToPassword('2')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>2</div>
            <div onClick={() => addToPassword('3')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>3</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div onClick={() => addToPassword('4')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>4</div>
            <div onClick={() => addToPassword('5')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>5</div>
            <div onClick={() => addToPassword('6')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>6</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div onClick={() => addToPassword('7')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>7</div>
            <div onClick={() => addToPassword('8')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>8</div>
            <div onClick={() => addToPassword('9')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>9</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div onClick={clearPassword} className='flex-1 h-16 flex justify-center items-center text-sm cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>Clear</div>
            <div onClick={() => addToPassword('0')} className='flex-1 h-16 flex justify-center items-center text-xl cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>0</div>
            <div onClick={handleEnter} className='flex-1 h-16 flex justify-center items-center text-sm cursor-pointer hover:bg-gray-300 duration-200 transition-all transform rounded-sm'>Enter</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
