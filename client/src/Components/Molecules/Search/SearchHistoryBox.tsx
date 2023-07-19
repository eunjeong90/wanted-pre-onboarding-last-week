import React from 'react';
import styled from 'styled-components';
import { RootState, useAppSelector } from '../../../Redux/store';
import { ISearchItem } from '../../../Redux/Slice/searchSlice';
import Icon from '../../Atoms/Icons';

const SUGGESTED_SEARCH_WORDS = [
  { id: 0, word: 'B형간염' },
  { id: 1, word: '비만' },
  { id: 2, word: '관절염' },
  { id: 3, word: '우울증' },
  { id: 4, word: '식도염' },
];
interface ISearchHistoryBox {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  searchList: ISearchItem[] | undefined;
  selectedIndex: number;
  handleClickWord: (word: string) => void;
}
export default function SearchHistoryBox({ searchList, value, selectedIndex, handleClickWord }: ISearchHistoryBox) {
  const { addSearchHistory, searchStatus } = useAppSelector((state: RootState) => ({
    addSearchHistory: state.search.history,
    searchStatus: state.search.status,
  }));

  return (
    <SSearchHistoryBox>
      <SInner>
        <STopBox>
          <SListDiv>
            <SSpan>{value && searchList ? '추천 검색어' : '최근 검색어'}</SSpan>
          </SListDiv>
          {searchStatus === 'loading' ? (
            <SListItem>
              <p>로딩 중...</p>
            </SListItem>
          ) : value ? (
            searchList && searchList.length > 0 ? (
              searchList?.map((item, index) => (
                <SListItem
                  key={item.sickCd + index}
                  isKeySelected={index === selectedIndex}
                  onClick={() => handleClickWord(item.sickNm)}
                >
                  <Icon icon="search" size={15} color="#6a737b" viewBox="2 2 20 20" />
                  <p>{item.sickNm}</p>
                </SListItem>
              ))
            ) : (
              <SPara>검색어 없음</SPara>
            )
          ) : (
            <div>
              {addSearchHistory ? (
                addSearchHistory.map((his, index) => (
                  <SListItem key={his + index} onClick={() => handleClickWord(his)}>
                    <Icon icon="search" size={15} color="#6a737b" viewBox="2 2 20 20" />
                    <p>{his}</p>
                  </SListItem>
                ))
              ) : (
                <SPara>검색어가 없습니다</SPara>
              )}
            </div>
          )}
        </STopBox>
        <SBottomBox value={value}>
          <SListDiv>
            <SSpan>추천 검색어로 검색해보세요</SSpan>
            <SSuggestedBox>
              {SUGGESTED_SEARCH_WORDS.map((item, index) => (
                <RoundedWord key={index} onClick={() => handleClickWord(item.word)}>
                  {item.word}
                </RoundedWord>
              ))}
            </SSuggestedBox>
          </SListDiv>
        </SBottomBox>
      </SInner>
    </SSearchHistoryBox>
  );
}

const SSearchHistoryBox = styled.div``;
const SInner = styled.div`
  position: absolute;
  border-radius: 20px;
  background-color: #fff;
  width: 100%;
  max-width: 490px;
  margin-top: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const STopBox = styled.div`
  padding: 20px 0 20px 0;
`;
const SBottomBox = styled.div<{ value: string }>`
  padding: 20px 0;
  display: ${({ value }) => (value ? 'none' : 'block')};
`;
const SListDiv = styled.div<{ row?: boolean }>`
  padding: 10px 20px;
`;
const SListItem = styled(SListDiv)<{ isKeySelected?: boolean }>`
  background-color: ${({ isKeySelected }) => (isKeySelected ? '#eff4f9' : '#fff')};
  padding: 10px 25px;
  display: flex;
  > p {
    margin-left: 10px;
    cursor: pointer;
  }
`;
const SSpan = styled.span`
  color: #6a737b;
  font-size: 13px;
  line-height: 1;
`;
const SPara = styled.p`
  padding: 10px 20px;
`;
const SSuggestedBox = styled.div`
  margin-top: 30px;
`;
const RoundedWord = styled.span`
  padding: 9px 16px;
  border-radius: 20px;
  background-color: #e3f3ff;
  color: #0092ff;
  margin-right: 10px;
  font-size: 15px;
  cursor: pointer;
`;
