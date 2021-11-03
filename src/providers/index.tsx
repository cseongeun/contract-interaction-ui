import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Web3Provider from 'providers/Web3Provider';
import ModalProvider from 'contexts/Modal';
import ToastProvider from 'contexts/Toast';
import Web3ReactManager from '../components/Common/Web3ReactManager';

const Providers: React.FC = ({ children }) => {
  return (
    <HelmetProvider>
      <Web3Provider>
        <ModalProvider>
          <ToastProvider>{children}</ToastProvider>
        </ModalProvider>
      </Web3Provider>
    </HelmetProvider>
  );
};

export default Providers;
