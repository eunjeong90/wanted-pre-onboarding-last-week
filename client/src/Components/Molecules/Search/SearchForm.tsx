import React from 'react';
import styled from 'styled-components';
import Input from '../../Atoms/Input';
import CloseButton from '../Buttons/CloseButton';
import QuestionButton from '../Buttons/QuestionButton';
import Icon from '../../Atoms/Icons';

interface ISearchForm {
  value: string;
  isOnFocused: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchForm({ value, isOnFocused, inputRef, onHandler }: ISearchForm) {
  return (
    <SForm onSubmit={(e: React.FormEvent) => e.preventDefault()} focused={isOnFocused}>
      <SLabel>
        <SInputMsgBox focused={isOnFocused} hasvalue={!!value}>
          <Icon icon="search" size={15} color="#6a737b" viewBox="2 2 20 20" />
          <span>질환명을 입력해 주세요.</span>
        </SInputMsgBox>
        <SInputBox hasvalue={!!value}>
          <Input type="text" onChange={onHandler} value={value} ref={inputRef} />
          <CloseButton />
        </SInputBox>
      </SLabel>
      <QuestionButton />
    </SForm>
  );
}
const SForm = styled.form<{ focused: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 999px;
  background-color: #fff;
  border: ${({ focused }) => (focused ? '2px solid #007be9' : '2px solid transparent')};
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
`;
const SLabel = styled.label`
  display: flex;
  flex: 1 1 0%;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 12px;
  align-items: center;
  position: relative;
`;
const SInputMsgBox = styled.div<{ focused: boolean; hasvalue: boolean }>`
  opacity: ${({ focused }) => (focused ? '0' : '1')};
  display: flex;
  > svg {
    display: inline-block;
    vertical-align: middle;
  }
  > span {
    opacity: ${({ hasvalue }) => (hasvalue ? '0' : '1')};
    color: #6a737b;
    margin-left: 10px;
  }
`;
const SInputBox = styled.div<{ hasvalue: boolean }>`
  position: absolute;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 2.25rem;
  > input {
    font-size: 1.125rem;
    line-height: 1.75rem;
    background-color: transparent;
  }
  > button {
    opacity: ${({ hasvalue }) => (hasvalue ? '1' : '0')};
  }
`;
