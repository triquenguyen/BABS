import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/prisma';

interface UserReq {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const reqData = await req.json() as UserReq;

  const user = await prisma.user.findUnique({
    where: {
      email: reqData.email,
    },
  });

  if (!user) {
    return {
      status: 400,
      body: {
        message: "User not found",
      },
    };
  }

  const validPassword = await bcrypt.compare(reqData.password, user.password);
  if (!validPassword) {
    return {
      status: 400,
      body: {
        message: "Invalid password",
      },
    };
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 900,
  });

  return {
    status: 201,
    body: {
      message: "User logged in",
      token,
    },
  };
}