import styled from "styled-components";

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  width: 100%;
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;
