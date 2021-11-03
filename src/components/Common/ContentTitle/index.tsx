import React from 'react';
import styled from 'styled-components';
import { insertSpace } from 'helpers/format';

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
  margin-bottom: 10px;
`;

const HeaderTitle = styled.span`
  font-size: 8px;
  letter-spacing: 0.03rem;
  color: #92929d;
  text-transform: lowercase;
  font-family: 'Roboto', sans-serif;
`;

interface ContentTitleProps {
  title: string;
}

const ContentTitle: React.FC<ContentTitleProps> = ({ title }) => {
  return (
    <HeaderContent>
      <div>
        <HeaderTitle>{insertSpace(title)}</HeaderTitle>
      </div>
    </HeaderContent>
  );
};

export default ContentTitle;
