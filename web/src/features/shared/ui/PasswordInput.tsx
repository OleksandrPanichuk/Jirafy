'use client'
import { useState } from 'react'
import { Input, InputProps } from './Input'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { cn } from '@/lib'

export const PasswordInput = (props: Omit<InputProps, 'type'>) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        {...props}
        className={cn(props.className, 'pr-10')}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
      >
        {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
      </button>
    </div>
  )
}