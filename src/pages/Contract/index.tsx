import React, { useEffect } from 'react';
import PageWrap from 'components/Common/PageWrap';
import useStore from 'hooks/useStore';

const Content = React.lazy(() => import('pages/Contract/Content'));

const Dashboard = () => {
 
  return (
    <PageWrap>
      <Content />
    </PageWrap>
  );
};

export default Dashboard;
