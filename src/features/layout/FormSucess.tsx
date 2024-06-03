import React from "react";
import { CheckCircleIcon } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  if (message) {
    return (
      <div className="flex items-center gap-x-2 text-sm text-emerald-500 bg-emerald-500/15 p-3 rounded-md">
        <CheckCircleIcon className="w-5 h-5" />
        <p className="pt-1">{message}</p>
      </div>
    );
  }
};
