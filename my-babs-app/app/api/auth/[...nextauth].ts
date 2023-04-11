import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import { NextApiResponse } from 'next';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'me@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        // const res = await axios.post('/api/login', credentials)
        //                       .then((res) => { return res.data; })
        //                       .catch((err) => { return err; });
        // if (res.status === 201) {
        //   return res;
        // } else {
        //   return null;
        // }

        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        if (payload.email !== 'ngngoctridung@gmail.com' || payload.password !== "Trique") {
          throw new Error('Invalid email or password');
        }


        return { id: 1, name: 'Tri Dung', email: 'ngngoctridung@gmail.com' };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },

  session: {
    strategy: 'jwt',
  }
}

export default NextAuth(authOptions);

// const handler: NextApiHandler = (req, res) =>
//   NextAuth(req, res, {
//     providers: [
//       CredentialsProvider({
//         name: 'Credentials',
//         credentials: {
//           email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
//           password: { label: 'Password', type: 'password' },
//         },
//         async authorize(credentials) {
//           const { email, password } = credentials;

//           const user = await prisma.user.findUnique({ where: { email } });

//           if (!user) throw new Error('Invalid email or password');

//           const passwordMatches = await bcrypt.compare(password, user.password);

//           if (!passwordMatches) throw new Error('Invalid email or password');

//           const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//             expiresIn: '15m',
//           });

//           return { id: user.id, name: user.name, email: user.email, token };
//         },
//       }),
//     ],
//     callbacks: {
//       async jwt(token, user) {
//         if (user) {
//           token.id = user.id;
//           token.name = user.name;
//           token.email = user.email;
//           token.token = user.token;
//         }

//         return token;
//       },
//       async session(session, token) {
//         session.user = { id: token.id, name: token.name, email: token.email, token: token.token };

//         return session;
//       },
//     },
//     session: {
//       jwt: true,
//       maxAge: 15 * 60, // 15 minutes
//     },
//   });

// export default handler;
