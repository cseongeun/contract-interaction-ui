import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from 'connectors';
import Web3ReactManager from '../../components/Common/Web3ReactManager';
import useEagerConnect from '../../hooks/useEagerConnect';

const Web3Providers: React.FC = ({ children }) => {
  const eager = useEagerConnect()
  
  return <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>;
};

export default Web3Providers;
