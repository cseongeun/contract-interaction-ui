import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  height: 48px;
  width: 343px;
  line-height: 46px;
  text-align: center;
`;

const RowWrap: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default RowWrap;
