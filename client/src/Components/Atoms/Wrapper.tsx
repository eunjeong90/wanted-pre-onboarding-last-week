import React from 'react';
import { styled } from 'styled-components';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <SWrapper>{children}</SWrapper>;
}

const SWrapper = styled.div`
  height: 100%;
`;
