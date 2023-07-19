import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAppDispatch } from '../../Redux/store';
import { ISearchItem, addSearchHistory, getSearchQuery } from '../../Redux/Slice/searchSlice';
import useDebounce from '../../Hooks/useDebounce';
import useInput from '../../Hooks/useInput';
import SearchHistoryBox from '../Molecules/Search/SearchHistoryBox';
import SearchForm from '../Molecules/Search/SearchForm';
import { useKeyboardNavigation } from '../../Hooks/useKeyboardNavigate';

export default function SearchArea() {
  const dispatch = useAppDispatch();
  const [value, setValue, onHandler] = useInput('');
  const [searchList, setSearchList] = useState<ISearchItem[] | undefined>([]);
  const [isFocusRef, setIsFocusRef] = useState(false);
  const [isResultSelected, setIsResultSelected] = useState(false);

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

  const handleFocus = () => {
    setIsFocusRef(true);
  };
  const handleBlur = () => {
    if (isResultSelected) {
      setIsFocusRef(false);
    }
  };
  const handleResetValue = () => {
    setIsFocusRef(true);
    setValue('');
  };
  const handleClickWord = (word: string) => {
    setIsResultSelected(true);
    setValue(word);
    dispatch(addSearchHistory(word));
  };

  useEffect(() => {
    if (isResultSelected) {
      setIsResultSelected(false);
      setIsFocusRef(false);
    }
  }, [isResultSelected]);

  const handleEnter = (index: number) => {
    if (isFocusRef && searchList) {
      if (index >= 0 && index < searchList.length) {
        handleClickWord(searchList[index].sickNm);
      }
    }
  };

  const { selectedIndex } = useKeyboardNavigation(searchList, handleEnter);

  return (
    <SSearchArea>
      <SearchForm
        value={value}
        onHandler={onHandler}
        isFocusRef={isFocusRef}
        handleResetValue={handleResetValue}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
      {isFocusRef && (
        <SearchHistoryBox
          value={value}
          setValue={setValue}
          searchList={searchList}
          selectedIndex={selectedIndex}
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
