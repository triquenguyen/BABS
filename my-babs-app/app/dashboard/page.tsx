"use client"

import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

export default function dashboard() {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/login");
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Hi {JSON.stringify(data.user, null, 2)}</p>
      </div>
    );
  }

  return (
    <div>
      loading...
    </div>
  )
}


// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       user: {
//         name: session.user.name,
//         email: session.user.email,
//       },
//     },
//   };