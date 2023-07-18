import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../Redux/store';
import { ISearchItem } from '../../../Redux/Slice/searchSlice';
import Icon from '../../Atoms/Icons';

interface ISearchHistoryBox {
  value: string;
  isOnFocused: boolean;
  searchList: ISearchItem[] | undefined;
  selectedIndex: number;
}
export default function SearchHistoryBox({ searchList, value, isOnFocused, selectedIndex }: ISearchHistoryBox) {
  const searchHistory = useSelector((state: RootState) => state.search.history);
  return (
    <SSearchHistoryBox className={isOnFocused ? '' : 'a11y-hidden'}>
      <SInner>
        <STopBox>
          <SListDiv>
            <SSpan>{value && searchList ? '추천 검색어' : '최근 검색어'}</SSpan>
          </SListDiv>
          {value ? (
            searchList && searchList.length > 0 ? (
              searchList?.map((item, index) => (
                <SListItem key={item.sickCd + index} isKeySelected={index === selectedIndex}>
                  <Icon icon="search" size={15} color="#6a737b" viewBox="2 2 20 20" />
                  <p>{item.sickNm}</p>
                </SListItem>
              ))
            ) : (
              <SPara>검색어 없음</SPara>
            )
          ) : (
            <div>
              {searchHistory ? (
                searchHistory.map((his, index) => (
                  <SListItem key={his + index}>
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
          <SSpan>추천 검색어로 검색해보세요</SSpan>
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
  padding: 20px;

  display: ${({ value }) => (value ? 'none' : 'block')};
`;
const SListDiv = styled.div`
  display: flex;
  padding: 10px 20px;
`;
const SListItem = styled(SListDiv)<{ isKeySelected?: boolean }>`
  background-color: ${({ isKeySelected }) => (isKeySelected ? '#dbe4eb' : '#fff')};
  padding: 10px 25px;
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
