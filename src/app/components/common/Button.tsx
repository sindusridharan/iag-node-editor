import React from "react";
import { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: LucideIcon;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed",
  secondary:
    "border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
  ghost: "hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
};

export const Button = React.memo<ButtonProps>(function Button({
  variant = "secondary",
  icon: Icon,
  children,
  className = "",
  disabled,
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded flex items-center gap-2 transition-colors ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
});

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: ButtonVariant;
}

export const IconButton = React.memo<IconButtonProps>(function IconButton({
  icon: Icon,
  variant = "ghost",
  className = "",
  disabled,
  ...props
}) {
  return (
    <button
      className={`p-2 rounded flex items-center justify-center transition-colors ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
});
