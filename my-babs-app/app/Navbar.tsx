import Link from "next/link"

export default function Navbar() {
  return (
    <div className="gap-4 flex">
      <Link href={"/login"} className="px-3 py-2 bg-[#69C9D0] rounded-md text-white">Login</Link>
      <Link href={"/signup"} className="px-3 py-2 bg-[#69C9D0] rounded-md text-white">Sign Up</Link>
    </div>
  )
}