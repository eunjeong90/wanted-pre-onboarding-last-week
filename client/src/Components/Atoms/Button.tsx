import React, { ComponentProps } from 'react';
import styled from 'styled-components';

export interface IButton extends ComponentProps<'button'> {
  size?: 'sm' | 'md';
  bgcolor?: string;
}

function Button({ size, children, bgcolor, ...props }: IButton) {
  return (
    <SButton size={size || 'md'} bgcolor={bgcolor} {...props}>
      {children}
    </SButton>
  );
}

export default Button;

export const SButton = styled.button<{ size?: string; bgcolor?: string }>`
  ${({ size }) => `
    width: ${size === 'md' ? '48px' : '20px'};
    height: ${size === 'md' ? '48px' : '20px'};
  `}
  background-color: ${({ bgcolor }) => bgcolor || '#FFFFFF'};
  border: 0;
  border-radius: 100%;
`;
