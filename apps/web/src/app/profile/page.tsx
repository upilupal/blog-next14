'use client';

import AuthGuard from "@/hoc/AuthGuard";

const Profile = () => {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-4xl font-extrabold text-center">PROFILE PAGE</h1>
    </main>
  );
};

export default AuthGuard(Profile);
