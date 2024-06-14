import { LoginForm } from "@/features/layout/auth/login-form";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />;
    </Suspense>
  );
};

export default LoginPage;
