import React, { ComponentProps } from 'react';
import styled from 'styled-components';

export interface IButton extends ComponentProps<'button'> {
  size?: 'sm' | 'md';
  bgColor?: string;
}

function Button({ size, children, bgColor, ...props }: IButton) {
  return (
    <SButton size={size || 'md'} bgColor={bgColor} {...props}>
      {children}
    </SButton>
  );
}

export default Button;

export const SButton = styled.button<{ size?: string; bgColor?: string }>`
  ${({ size }) => `
    width: ${size === 'md' ? '48px' : '20px'};
    height: ${size === 'md' ? '48px' : '20px'};
  `}
  background-color: ${({ bgColor }) => bgColor || '#FFFFFF'};
  border: 0;
  border-radius: 100%;
`;
