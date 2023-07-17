import React from 'react';
import styled, { css } from 'styled-components';

interface IHeading {
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Heading({ size = 'md', children }: IHeading) {
  return <SHeading size={size}>{children}</SHeading>;
}

const getHeadingSize = (size: string) => {
  let fontSize;

  switch (size) {
    case 'md':
      fontSize = '26px';
      break;
    case 'lg':
      fontSize = '34px';
      break;
    default:
      fontSize = '20px';
  }
  return css`
    font-size: ${fontSize};
  `;
};

export const SHeading = styled.h1<{ size: string }>`
  ${({ size }) => getHeadingSize(size)};
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.018em;
  line-height: 1.6;
`;
