import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../Redux/store';
import { ISearchItem, getSearchQuery } from '../../Redux/Slice/searchSlice';
import useDebounce from '../../Hooks/useDebounce';
import useInput from '../../Hooks/useInput';
import { styled } from 'styled-components';
import SearchHistoryBox from '../Molecules/Search/SearchHistoryBox';
import SearchForm from '../Molecules/Search/SearchForm';
import useKeyboardNavigation from '../../Hooks/useKeyboardNavigate';

export default function SearchArea() {
  const dispatch = useAppDispatch();
  const [value, onHandler] = useInput('');
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

  const searchDebounce = useDebounce(getSearchList, 300);

  useEffect(() => {
    searchDebounce();
  }, [searchDebounce, value]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isOnFocused, setIsOnFocused] = useState(false);
  useEffect(() => {
    const handleFocus = () => setIsOnFocused(true);
    const handleBlur = () => setIsOnFocused(false);

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  const getKeyword = (index: number) => (searchList && searchList[index]?.sickNm) || '';
  const maxIndex = searchList?.length || 0;

  const { focusIndex, isAutoSearch } = useKeyboardNavigation({
    maxIndex,
    // onEnter,
    getKeyword,
  });

  return (
    <SSearchArea>
      <SearchForm value={value} isOnFocused={isOnFocused} onHandler={onHandler} inputRef={inputRef} />
      <SearchHistoryBox
        value={value}
        isOnFocused={isOnFocused}
        searchList={searchList}
        isKeySelected={isAutoSearch}
        selectedIndex={focusIndex}
      />
    </SSearchArea>
  );
}

const SSearchArea = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 490px;
`;
