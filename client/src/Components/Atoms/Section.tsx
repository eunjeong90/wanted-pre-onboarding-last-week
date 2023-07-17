import React from 'react';
import { styled } from 'styled-components';

interface ISection {
  bgcolor?: 'common' | string;
  children: React.ReactNode;
}
export default function Section({ bgcolor = 'common', children }: ISection) {
  return <SSection bgcolor={bgcolor}>{children}</SSection>;
}

const SSection = styled.div<{ bgcolor: string }>`
  background-color: ${({ bgcolor }) => (bgcolor === 'common' ? 'transparent' : 'custom' && bgcolor)};
  padding: 80px 0 160px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
`;
