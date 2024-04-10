"use client";

import { useEffect, useCallback, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { SyncLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "../../../../actions/new-verification";
import { FormError } from "@/features/layout/form-error";
import { FormSuccess } from "@/features/layout/form-sucess";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Token manquant");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Une erreur est survenue");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirmation en cours"
      backButtonLabel="Retour"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <div className="flex items-center justify-center">
        {!success && !error && <SyncLoader color="#e2321f" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
