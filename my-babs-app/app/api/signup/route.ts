import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client'

interface UserReq {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {

  const reqData = await req.json() as UserReq;

  if (!reqData.firstName || !reqData.lastName || !reqData.phone || !reqData.email || !reqData.password) {
    return new Response('Missing required fields', { status: 400 });
  }

  // use `prisma` in your application to read and write data in your DB

  const userExists = await prisma.user.findUnique({
    where: {
      email: reqData.email,
    },
  });

  if (userExists) {
    return new Response('User already exists', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(reqData.password, 10);

  const userData: Prisma.UserCreateInput = {
    firstName: reqData.firstName,
    lastName: reqData.lastName,
    email: reqData.email,
    password: hashedPassword,
  };

  try {
    await prisma.user.create({ data: userData });

    return new Response('User is created', { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }

}
