import React from 'react';
import Button, { IButton } from '../Atoms/Button';
import Icon from '../Atoms/Icons';

export default function QuestionButton({ ...props }: IButton) {
  return (
    <Button size="md" bgColor="#007BE9" {...props}>
      <Icon icon="search" size={20} color="#fff" />
    </Button>
  );
}
