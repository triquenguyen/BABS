"use client"

import { useState } from "react"
import axios from 'axios'
import Link from "next/link"

interface FormProps {
  pincode: string
}

const initialForm: FormProps = {
  pincode: ''
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
      const res = await axios.post('/api/atm/pincode', form)
      console.log("Form submitted", res)
    } catch (error) {
      console.log("Error submitting form", error)
    }
    setForm(initialForm)
  }

  return (
    <div className="flex flex-col items-center gap-[24px] w-[80%]">
      <h1 className="text-[42px] font-bold text-[#69C9D0] mt-[8px]">PIN Code</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[28px] items-center ">
        <label className="text-[#69C9D0] flex flex-col">
          PIN
          <input type="pincode" name="pincode" value={form.pincode} onChange={handleChange} className="bg-[rgba(255,255,255,0.2)] w-[24em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"/>
        </label>
        <button type="submit" className="px-3 py-2 bg-[#69C9D0] rounded-md text-white w-[25%]">Submit</button>
      </form>
    </div>
  )
}

