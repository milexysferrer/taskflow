import { useId } from "react";
import type { InputHTMLAttributes } from "react";

import { FieldContainer, Label, StyledInput, HelperText } from "./Input.styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  id,
  required,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error || helperText;

  return (
    <FieldContainer>
      <Label htmlFor={inputId}>
        {label}
        {required && " *"}
      </Label>

      <StyledInput
        {...props}
        id={inputId}
        required={required}
        $hasError={Boolean(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
      />

      {message && (
        <HelperText id={messageId} $hasError={Boolean(error)}>
          {message}
        </HelperText>
      )}
    </FieldContainer>
  );
}
