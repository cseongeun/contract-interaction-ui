import React from 'react';
import styled from 'styled-components';
import ErrorBoundary from 'components/Common/ErrorBoundary';
import PageTitle from 'components/Common/PageTitle';
import Setting from 'pages/Contract/Content/Setting';
import FunctionTable from 'pages/Contract/Content/FunctionTable';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 95%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
  @media (max-width: 450px) {
    padding: 10px;
  }
`;

const Content: React.FC = () => {
  return (
    <Wrapper>
      <PageTitle title='Contract' />
      <ErrorBoundary>
          <Setting/>
          <FunctionTable/>
      </ErrorBoundary>
    </Wrapper>
  );
};

export default Content;
