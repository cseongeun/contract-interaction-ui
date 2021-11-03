import React, { createContext, useCallback, useState } from 'react';
import styled from 'styled-components';

const StyledModalWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
`;

const StyledModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

interface ModalProps {
  content?: React.ReactNode;
  isOpen?: boolean;
  onPresent: (content: React.ReactNode, key?: string) => void;
  onDismiss: () => void;
}

const ModalContext = createContext<ModalProps>({
  onPresent: () => {},
  onDismiss: () => {},
});

const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>();
  const [modalKey, setModalKey] = useState<string>();

  const handlePresent = useCallback(
    (modalContent: React.ReactNode, key?: string) => {
      setModalKey(key);
      setContent(modalContent);
      setIsOpen(true);
    },
    [setContent, setIsOpen, setModalKey]
  );

  const handleDismiss = useCallback(() => {
    setContent(undefined);
    setIsOpen(false);
  }, [setContent, setIsOpen, modalKey]);

  return (
    <ModalContext.Provider
      value={{
        content,
        isOpen,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {isOpen && (
        <StyledModalWrapper>
          <StyledModalBackdrop onClick={handleDismiss} />
          {React.isValidElement(content) &&
            React.cloneElement(content, {
              onDismiss: handleDismiss,
            })}
        </StyledModalWrapper>
      )}
    </ModalContext.Provider>
  );
};

export { ModalContext };
export default ModalProvider;
