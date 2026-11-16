import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger";

interface StyledButtonProps {
  $variant: ButtonVariant;
  $loading: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  transition: background-color 0.2s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ theme, $variant }) => {
    switch ($variant) {
      case "primary":
        return css`
          background: ${theme.colors.primary};
          color: white;
          border: 1px solid ${theme.colors.primary};

          &:hover:not(:disabled) {
            background: ${theme.colors.primaryHover};
          }
        `;

      case "secondary":
        return css`
          background: ${theme.colors.surface};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};

          &:hover:not(:disabled) {
            background: ${theme.colors.background};
          }
        `;

      case "danger":
        return css`
          background: ${theme.colors.danger};
          color: white;
          border: 1px solid ${theme.colors.danger};
        `;
    }
  }}

  ${({ $loading }) =>
    $loading &&
    css`
      cursor: wait;
    `}
`;
