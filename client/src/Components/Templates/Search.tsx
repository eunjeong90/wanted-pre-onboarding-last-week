import React from 'react';
import Section from '../Atoms/Section';
import SearchArea from '../Organisms/SearchArea';
import styled from 'styled-components';
import { SHeading } from '../Atoms/Heading';

export default function Search() {
  return (
    <Section bgcolor="#CAE9FF">
      <H1 size="lg">
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </H1>
      <SearchArea />
    </Section>
  );
}

const H1 = styled(SHeading)`
  margin-bottom: 36px;
`;
