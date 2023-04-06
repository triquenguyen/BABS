"use client"

import { useState } from "react"
import axios from 'axios'
import Link from "next/link"

interface FormProps {
  email: string
  password: string
}

const initialForm: FormProps = {
  email: '',
  password: ''
}

export default function LogInForm() {
  const [form, setForm] = useState<FormProps>(initialForm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login', form)
      console.log("Form submitted", res)
    } catch (error) {
      console.log("Error submitting form", error)
    }
    setForm(initialForm)
  }

  return (
    <div className="flex flex-col items-center gap-[24px] w-[80%]">
      <h1 className="text-[42px] font-bold text-[#69C9D0] mt-[8px]">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[28px] items-center ">
        <label className="text-[#69C9D0] flex flex-col">
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} className="bg-[rgba(255,255,255,0.2)] w-[24em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"/>
        </label>
        
        <label className="text-[#69C9D0] flex flex-col">
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} className="bg-[rgba(255,255,255,0.2)] w-[24em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"/>
        </label>
        <button type="submit" className="px-3 py-2 bg-[#69C9D0] rounded-md text-white w-[25%]">Login</button>
        <p className="text-white">Don't have an account? <Link href="/signup" className="underline underline-offset-2">Create a new account</Link></p>
      </form>
      
    </div>
  )
}

