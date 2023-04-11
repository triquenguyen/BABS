"use client"

import { FormEventHandler, useState } from "react"
import axios from 'axios'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { NextPage } from "next"

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    // try {
    //   const { token } = await loginUser({ email, password })
    //   localStorage.setItem("token", token)
    //   router.push("/dashboard")
    // } catch (error) {
    //   console.log("Error submitting form", error)
    // }

    await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    }).then((res) => {
      console.log(res)
      if (res?.ok) {
        router.push("/dashboard")
      }
    })
  }

  return (
    <div className="flex flex-col items-center gap-[24px]">
      <h1 className="text-[42px] font-bold text-[#69C9D0] mt-[8px]">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[28px] items-center ">
        <label className="text-[#69C9D0] flex flex-col">
          Email
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[rgba(255,255,255,0.2)] w-[24em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2" />
        </label>

        <label className="text-[#69C9D0] flex flex-col">
          Password
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[rgba(255,255,255,0.2)] w-[24em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2" />
        </label>

        <button type="submit" className="px-3 py-2 bg-[#69C9D0] rounded-md text-white w-[25%]">Login</button>
        <p className="text-white">Don't have an account? <Link href="/signup" className="underline underline-offset-3">Create a new account</Link></p>
      </form>

    </div>
  )
}

export default LogInForm