import React, { ComponentProps, ForwardedRef, forwardRef } from 'react';
import { styled } from 'styled-components';

// interface IInput extends ComponentProps<'input'> {}

const Input = forwardRef((props: ComponentProps<'input'>, ref: ForwardedRef<HTMLInputElement>) => {
  return <SInput ref={ref} {...props} />;
});
export default Input;

const SInput = styled.input`
  width: 100%;
  font-size: 100%;
  margin: 0;
  padding: 0;
  border: none;
`;
