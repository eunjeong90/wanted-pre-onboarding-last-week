import React, { ComponentProps } from 'react';
import { styled } from 'styled-components';

// interface IInput extends ComponentProps<'input'> {}

const Input = (props: ComponentProps<'input'>) => {
  return <SInput {...props} />;
};
export default Input;

const SInput = styled.input`
  width: 100%;
  font-size: 100%;
  margin: 0;
  padding: 0;
  border: none;
`;
