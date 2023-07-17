import React from 'react';
import { styled } from 'styled-components';

interface ISection {
  bgColor?: 'common' | string;
  children: React.ReactNode;
}
export default function Section({ bgColor = 'common', children }: ISection) {
  return <SSection bgColor={bgColor}>{children}</SSection>;
}

const SSection = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => (bgColor === 'common' ? 'transparent' : 'custom' && bgColor)};
  padding: 80px 0 160px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
`;
