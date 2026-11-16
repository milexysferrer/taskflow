import styled from "styled-components";

export const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  }
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  line-height: 1.5;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PriorityBadge = styled.span<{
  $priority: "low" | "medium" | "high";
}>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;

  background: ${({ $priority }) =>
    ({
      low: "#DCFCE7",
      medium: "#FEF3C7",
      high: "#FEE2E2",
    })[$priority]};

  color: ${({ $priority }) =>
    ({
      low: "#166534",
      medium: "#92400E",
      high: "#991B1B",
    })[$priority]};
`;

export const DueDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
