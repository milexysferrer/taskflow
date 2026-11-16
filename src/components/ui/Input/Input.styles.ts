import styled from "styled-components";

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.danger : theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const HelperText = styled.span<{ $hasError: boolean }>`
  font-size: 12px;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.danger : theme.colors.textSecondary};
`;
