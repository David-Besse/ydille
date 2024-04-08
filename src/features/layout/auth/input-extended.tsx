import * as React from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputExtendedProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
}

export const InputExtended = React.forwardRef<
  HTMLInputElement,
  InputExtendedProps
>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Input
      type={showPassword ? "text" : "password"}
      className={className}
      suffix={
        showPassword ? (
          <EyeIcon onClick={() => setShowPassword(!showPassword)} />
        ) : (
          <EyeOffIcon onClick={() => setShowPassword(!showPassword)} />
        )
      }
      ref={ref}
      {...props}
    />
  );
});
InputExtended.displayName = "InputExtended";
