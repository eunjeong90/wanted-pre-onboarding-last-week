import React from 'react';
import Button, { IButton } from '../../Atoms/Button';
import Icon from '../../Atoms/Icons';

export default function CloseButton({ size, ...props }: IButton) {
  return (
    <Button size="sm" bgcolor="#A6AFB7" {...props}>
      <Icon icon="close" size={15} color="#fff" viewBox="1.5 -0.5 20 20" />
    </Button>
  );
}
