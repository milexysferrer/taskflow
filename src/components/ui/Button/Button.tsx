import type { ButtonHTMLAttributes, ReactNode } from "react";
import { StyledButton } from "./Button.styles";
import type { ButtonVariant } from "./Button.styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $loading={loading}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </StyledButton>
  );
}
