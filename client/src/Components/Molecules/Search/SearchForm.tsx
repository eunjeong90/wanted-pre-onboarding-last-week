import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '../../Atoms/Icons';
import Input from '../../Atoms/Input';
import CloseButton from '../Buttons/CloseButton';
import QuestionButton from '../Buttons/QuestionButton';
import { addSearchHistory } from '../../../Redux/Slice/searchSlice';
import { useAppDispatch } from '../../../Redux/store';

interface ISearchForm {
  value: string;
  isFocusRef: boolean;
  onHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetValue: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}
export default function SearchForm({
  value,
  isFocusRef,
  onHandler,
  handleResetValue,
  handleFocus,
  handleBlur,
}: ISearchForm) {
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      dispatch(addSearchHistory(value));
    }
  };
  return (
    <SForm onSubmit={handleSubmit} isOnFocused={isFocusRef}>
      <SLabel>
        <SInputMsgBox isOnFocused={isFocusRef} hasvalue={!!value}>
          <Icon icon="search" size={15} color="#6a737b" viewBox="2 2 20 20" />
          <span>질환명을 입력해 주세요.</span>
        </SInputMsgBox>
        <SInputBox hasvalue={!!value} isOnFocused={isFocusRef}>
          <Input type="text" onChange={onHandler} value={value} onFocus={handleFocus} onBlur={handleBlur} />
          <CloseButton onClick={handleResetValue} />
        </SInputBox>
      </SLabel>
      <QuestionButton onClick={handleSubmit} />
    </SForm>
  );
}
const SForm = styled.form<{ isOnFocused: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 999px;
  background-color: #fff;
  border: ${({ isOnFocused }) => (isOnFocused ? '2px solid #007be9' : '2px solid transparent')};
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
const SInputMsgBox = styled.div<{ isOnFocused: boolean; hasvalue: boolean }>`
  opacity: ${({ isOnFocused }) => (isOnFocused ? '0' : '1')};
  display: flex;
  ${({ hasvalue }) => css`
    > svg,
    span {
      opacity: ${hasvalue ? '0' : '1'};
    }
  `}
  > svg {
    display: inline-block;
    vertical-align: middle;
  }
  > span {
    color: #6a737b;
    margin-left: 10px;
  }
`;
const SInputBox = styled.div<{ hasvalue: boolean; isOnFocused: boolean }>`
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
    opacity: ${({ hasvalue, isOnFocused }) => (hasvalue && isOnFocused ? '1' : '0')};
  }
`;
