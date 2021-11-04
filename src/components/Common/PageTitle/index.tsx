import React from 'react';
import styled from 'styled-components';
import { insertSpace } from 'libs/helpers/format';

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`;

const HeaderTitle = styled.span`
  font-size: 10px;
  letter-spacing: 0.125rem;
  color: #92929d;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
`;

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <HeaderContent>
      <div>
        <HeaderTitle>{insertSpace(title)}</HeaderTitle>
      </div>
    </HeaderContent>
  );
};

export default PageTitle;
