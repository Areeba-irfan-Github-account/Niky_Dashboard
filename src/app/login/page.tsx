'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof schema>

export default function LoginForm() {
  const [error, setError] = useState('')
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      router.push('/admin')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">
          Admin Login</h2>
        <div className="mb-4  w-96 p-6">
          <label htmlFor="email" className="block text-lg font-bold text-black mb-2">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-lg  bg-opacity-20 border border-opacity-30 focus:border-black focus:ring-2 focus:ring-black text-black placeholder-white placeholder-opacity-70 transition duration-200"
            placeholder="your@email.com"
          />
          {errors.email && <p className="mt-2 text-sm text-black font-medium">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-bold text-black mb-2">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-black border-opacity-30 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-70 transition duration-200"
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-2 text-sm text-yellow-200 font-medium">{errors.password.message}</p>}
          {error && <p className="text-sm text-yellow-200 font-medium mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-black text-white font-bold rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          >
            Sign In
          </button>
        </div>

      </form>
    </div>
  )
}
