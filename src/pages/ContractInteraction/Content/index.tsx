import React from 'react';
import styled from 'styled-components';
import ErrorBoundary from 'components/Common/ErrorBoundary';
import PageTitle from 'components/Common/PageTitle';
import Setting from 'pages/ContractInteraction/Content/Setting';
import FunctionTable from 'pages/ContractInteraction/Content/FunctionTable';
import { Box } from '@material-ui/core';

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
          <Box m={3}>          
            <FunctionTable/>
          </Box>
      </ErrorBoundary>
    </Wrapper>
  );
};

export default Content;
