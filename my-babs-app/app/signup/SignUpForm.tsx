"use client"

import { useEffect, useState } from "react"
import axios from 'axios'
import Link from "next/link"

interface FormProps {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
}

const initialForm: FormProps = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
}

export default function SignUpForm() {
  const [form, setForm] = useState<FormProps>(initialForm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(form => ({ ...form, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.post('/api/signup', form)
        .then((res) => {
          console.log(res)
        })
      console.log("Form submitted", form)
      setForm(initialForm)
    } catch (error) {
      console.log("Error submitting form", error)
    }
  }

  return (
    <div className="flex flex-col items-center gap-[16px] w-full">
      <h1 className="md:text-[36px] lg:text-[42px] font-bold text-[#69C9D0]">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[12px] items-center ">
        <div className="flex gap-[20px]">
          <label className="text-[#69C9D0] flex flex-col">
            First Name
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="bg-[rgba(255,255,255,0.2)] w-[170px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2" />
          </label>

          <label className="text-[#69C9D0] flex flex-col">
            Last Name
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="bg-[rgba(255,255,255,0.2)] w-[170px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block md:p-2 mt-2" />
          </label>
        </div>

        <label className="text-[#69C9D0] flex flex-col">
          Phone
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="bg-[rgba(255,255,255,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block md:p-2 mt-2" />
        </label>

        <label className="text-[#69C9D0] flex flex-col">
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} className="bg-[rgba(255,255,255,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block md:p-2 mt-2" />
        </label>

        <label className="text-[#69C9D0] flex flex-col">
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} className="bg-[rgba(255,255,255,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block md:p-2 mt-2" />
        </label>
        <button type="submit" className="px-3 py-2 bg-[#69C9D0] rounded-md text-white w-[25%]">Sign Up</button>
        <p className="text-white">Already have an account? <Link href="/login" className="underline underline-offset-2">Login Here</Link></p>
      </form>

    </div>
  )
}

