import React, { MutableRefObject } from 'react';
import styled, { css } from 'styled-components';
import Icon from '../../Atoms/Icons';
import Input from '../../Atoms/Input';
import CloseButton from '../Buttons/CloseButton';
import QuestionButton from '../Buttons/QuestionButton';

interface ISearchForm {
  value: string;
  isFocusRef: MutableRefObject<boolean>;
  inputRef: React.RefObject<HTMLInputElement>;
  onHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetValue: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}
export default function SearchForm({
  value,
  isFocusRef,
  inputRef,
  onHandler,
  handleResetValue,
  handleFocus,
  handleBlur,
}: ISearchForm) {
  return (
    <SForm onSubmit={(e: React.FormEvent) => e.preventDefault()} isOnFocused={isFocusRef.current}>
      <SLabel>
        <SInputMsgBox isOnFocused={isFocusRef.current} hasvalue={!!value}>
          <Icon icon="search" size={15} color="#6a737b" viewBox="2 2 20 20" />
          <span>질환명을 입력해 주세요.</span>
        </SInputMsgBox>
        <SInputBox hasvalue={!!value} isOnFocused={isFocusRef.current}>
          <Input
            type="text"
            onChange={onHandler}
            value={value}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <CloseButton onClick={handleResetValue} />
        </SInputBox>
      </SLabel>
      <QuestionButton />
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
