import React, { ReactNode } from 'react';
import Wrapper from '../Atoms/Wrapper';

export default function CommonLayout({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}
