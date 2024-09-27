import { Button } from "./button";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  text?: string;
  className?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  text,
  className,
  ...props
}) => {
  return (
    <Button
      type="submit"
      {...props}
      className={`${className} bg-gradient-to-r hover:to-[#BF29F0] text-base drop-shadow-md from-indigo-700 to-purple-700 text-white flex gap-1`}
    >
      {children}
      {text}
    </Button>
  );
};
