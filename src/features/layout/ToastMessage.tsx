import { AlertTriangleIcon, CheckCircleIcon } from "lucide-react";

interface ToastMessageProps {
  message: { success?: string | undefined; error?: string | undefined };
}

export const ToastMessage = ({ message }: ToastMessageProps) => {
  if (!message) {
    return null;
  }

  if (message) {
    {
      message.success && (
        <div className="flex items-center gap-x-2 text-sm text-emerald-500 bg-emerald-500/15 p-3 rounded-md">
          <CheckCircleIcon className="w-5 h-5" />
          <p className="pt-1">{message.success}</p>
        </div>
      );
    }
    {
      message.error && (
        <div className="flex items-center gap-x-2 text-sm text-destructive bg-destructive/15 p-3 rounded-md">
          <AlertTriangleIcon className="w-5 h-5" />
          <p className="pt-1">{message.error}</p>
        </div>
      );
    }
  }
};
