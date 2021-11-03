import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 250px;
  min-width: 0;
  margin-right: 50px;
  height: 150px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
  box-sizing: border-box;
  justify-content: space-around;
  font-size: 5rem;
  color: #8ca3b1;
  background-color: #fff;
  word-wrap: break-word;
  box-shadow: 10px 10px 10px 4px rgba(0, 0, 0, 0.1);
`;

const ContentWrap = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
`;

const IndicatorCard: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <ContentWrap>{children}</ContentWrap>
    </Wrapper>
  );
};

export default IndicatorCard;
