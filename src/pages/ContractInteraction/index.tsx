import React from 'react';
import PageWrap from 'components/Common/PageWrap';

const Content = React.lazy(() => import('pages/ContractInteraction/Content'));

const ContractInteraction: React.FC = () => {
  
  return (
    <PageWrap>
      <Content />
    </PageWrap>
  );
};

export default ContractInteraction;
