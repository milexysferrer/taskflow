import styled from "styled-components";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export const Overlay = styled(AlertDialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 23, 42, 0.6);
`;

export const Content = styled(AlertDialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 201;
  width: min(420px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  box-sizing: border-box;

  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.2);
`;

export const Title = styled(AlertDialog.Title)`
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled(AlertDialog.Description)`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;
