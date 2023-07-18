import React from 'react';
import styled from 'styled-components';
import { ISearchItem } from '../../../Redux/Slice/searchSlice';

interface ISearchHistoryBox {
  value: string;
  isOnFocused: boolean;
  searchList: ISearchItem[] | undefined;
}
export default function SearchHistoryBox({ searchList, value, isOnFocused }: ISearchHistoryBox) {
  return (
    <SSearchHistoryBox className={isOnFocused ? '' : 'a11y-hidden'}>
      <SInner>
        <STopBox>
          <SSpan>{value && searchList ? '추천 검색어' : '최근 검색어'}</SSpan>
          {value ? (
            searchList && searchList.length > 0 ? (
              searchList.map((item, index) => <p key={item.sickCd + index}>{item.sickNm}</p>)
            ) : (
              <SPara>검색어 없음</SPara>
            )
          ) : (
            <SPara>검색어가 없습니다</SPara>
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
  padding: 20px 25px;
  border-radius: 20px;
  background-color: #fff;
  width: 100%;
  max-width: 490px;
  margin-top: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const STopBox = styled.div`
  padding-bottom: 20px;
`;
const SBottomBox = styled.div<{ value: string }>`
  padding-top: 20px;
  display: ${({ value }) => (value ? 'none' : 'block')};
`;
const SSpan = styled.span`
  color: #6a737b;
  font-size: 13px;
  line-height: 1;
`;
const SPara = styled.p`
  margin: 10px 0;
`;
