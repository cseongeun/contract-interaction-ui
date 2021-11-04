import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Web3Provider from 'providers/Web3Provider';
import ModalProvider from 'contexts/Modal';
import ToastProvider from 'contexts/Toast';
import BroadcastProvider from 'contexts/Broadcast';

const Providers: React.FC = ({ children }) => {
  return (
    <HelmetProvider>
      <Web3Provider>
        <ModalProvider>
          <ToastProvider>
            <BroadcastProvider>
              {children}
            </BroadcastProvider>
          </ToastProvider>
        </ModalProvider>
      </Web3Provider>
    </HelmetProvider>
  );
};

export default Providers;
