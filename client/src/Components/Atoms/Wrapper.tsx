import React, { ReactNode } from 'react';
import { styled } from 'styled-components';

export default function Wrapper({ children }: { children: ReactNode }) {
  return <SWrapper>{children}</SWrapper>;
}

const SWrapper = styled.div`
  height: 100%;
`;
