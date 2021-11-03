import React from 'react';
import styled from 'styled-components';
import Header from 'components/Common/Header';
import Sidebar from 'components/Common/Sidebar';
import ErrorBoundary from 'components/Common/ErrorBoundary';

const MainWrapper = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
  @media (max-width: 450px) {
    padding: 10px;
  }
`;

const PageWrap: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <MainWrapper>
        <Sidebar />
        <ErrorBoundary>
          <React.Suspense fallback={null}>
            <Wrapper>{children}</Wrapper>
          </React.Suspense>
        </ErrorBoundary>
      </MainWrapper>
    </>
  );
};

export default PageWrap;
