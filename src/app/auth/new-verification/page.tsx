import { NewVerificationForm } from "@/features/layout/auth/new-verification-form";
import React, { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
