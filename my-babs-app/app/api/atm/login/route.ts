import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body = await req.json();
    console.log(body);
    return new Response('Hello, Next.js!', {
        status: 200
      });
}