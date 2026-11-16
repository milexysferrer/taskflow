import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  z-index: 100;
`;

export const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: min(480px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  box-sizing: border-box;

  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};

  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.2);
  z-index: 101;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled(Dialog.Title)`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const CloseButton = styled(Dialog.Close)`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: 24px;
  line-height: 1;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;
