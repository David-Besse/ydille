import React from "react";
import { AlertTriangleIcon } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  if (message) {
    return (
      <div className="flex items-center gap-x-2 text-sm text-destructive bg-destructive/15 p-3 rounded-md">
        <AlertTriangleIcon className="w-5 h-5" />
        <p className="pt-1">{message}</p>
      </div>
    );
  }
};
