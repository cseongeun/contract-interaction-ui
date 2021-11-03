import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from 'components/Common/Logo';
import Contents from 'components/Common/Header/Content';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  margin: 0 auto;
  box-shadow: inset 0px -1px 0px #e2e2ea;
`;

const LogoWrapper = styled.div`
  margin-left: 25px;
  a {
    text-decoration: none;
  }
`;
const ContentWrapper = styled.div`
  margin-right: 25px;
`;

const logoProps = {
  title: {
    size: 20,
    color: '#44444F',
    text: 'Contract Interaction-UI',
  },
  image: {
    size: 34,
    color: '#0062ff',
  },
};

const Header: React.FC = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Link to='/'>
          <Logo {...logoProps} />
        </Link>
      </LogoWrapper>
      <ContentWrapper>
        <Contents />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Header;
