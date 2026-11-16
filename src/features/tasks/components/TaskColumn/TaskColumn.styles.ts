import styled from "styled-components";

export const Column = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};

  background: #f1f5f9;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  min-width: 280px;
  min-height: 350px;
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ColumnTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const TaskCount = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const EmptyMessage = styled.p`
  font-size: 13px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
