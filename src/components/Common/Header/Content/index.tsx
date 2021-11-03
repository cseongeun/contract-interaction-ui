import React from 'react';
import styled from 'styled-components';
import WalletConnection from 'components/Common/Header/Content/WalletConnection';
import Network from 'components/Common/Header/Content/Network';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 620px) {
    grid-template-columns: 10px;
    justify-items: end;
  }
`;

const Content = () => {
  return (
    <Wrapper>
      <Network />
      <WalletConnection />
    </Wrapper>
  );
};

export default Content;
