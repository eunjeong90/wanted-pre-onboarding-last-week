import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useAppDispatch } from '../../Redux/store';
import { ISearchItem, getSearchQuery } from '../../Redux/Slice/searchSlice';
import useDebounce from '../../Hooks/useDebounce';
import useInput from '../../Hooks/useInput';
import useKeyboardNavigation from '../../Hooks/useKeyboardNavigate';
import SearchHistoryBox from '../Molecules/Search/SearchHistoryBox';
import SearchForm from '../Molecules/Search/SearchForm';

export default function SearchArea() {
  const dispatch = useAppDispatch();
  const [value, setValue, onHandler] = useInput('');
  const [searchList, setSearchList] = useState<ISearchItem[] | undefined>([]);

  const getSearchList = () => {
    if (value !== '') {
      const fetchData = async () => {
        try {
          const result = await dispatch(getSearchQuery(value)).unwrap();
          setSearchList(result);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
      fetchData();
    }
  };

  const searchDebounce = useDebounce(getSearchList, 500);

  useEffect(() => {
    searchDebounce();
  }, [value]);

  const inputRef = useRef<HTMLInputElement>(null);
  const isFocusRef = useRef(false);

  const handleFocus = () => {
    isFocusRef.current = true;
    inputRef.current?.focus();
  };
  const handleBlur = () => {
    isFocusRef.current = false;
    inputRef.current?.blur();
  };
  const handleResetValue = () => {
    setValue('');
    isFocusRef.current = true;
    inputRef.current?.focus();
  };
  const handleClickWord = (word: string) => {
    isFocusRef.current = true;
    setValue(word);
  };
  const getKeyword = (index: number) => (searchList && searchList[index]?.sickNm) || '';
  const maxIndex = searchList?.length || 0;
  const { focusIndex } = useKeyboardNavigation({
    maxIndex,
    getKeyword,
  });

  return (
    <SSearchArea>
      <SearchForm
        value={value}
        onHandler={onHandler}
        inputRef={inputRef}
        isFocusRef={isFocusRef}
        handleResetValue={handleResetValue}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
      {isFocusRef.current && (
        <SearchHistoryBox
          value={value}
          setValue={setValue}
          searchList={searchList}
          selectedIndex={focusIndex}
          handleClickWord={handleClickWord}
        />
      )}
    </SSearchArea>
  );
}

const SSearchArea = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 490px;
`;
