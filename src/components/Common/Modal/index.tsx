import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from 'contexts/Modal';
import Close from 'components/Common/Icons/Common/Close';

const variables = {
  colorGray: '#92929d',
  colorRed: '#fc5a5a',
  colorWhite: '#ffffff',
  colorBlue: '#38388a',
};

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  min-width: 300px;
  max-width: 7000px;
  padding: 20px 30px;
  position: relative;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.7;
  z-index: 9999;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${variables.colorBlue};
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  height: 70px;
  border-bottom: 1px solid #e2e2ea;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background-color: ${variables.colorWhite};
  border: none;
  outline: none;
  cursor: pointer;
  svg {
    fill: ${variables.colorGray};
    :hover {
      fill: #0062ff;
    }
  }
`;

interface ModalProps {
  onDismiss?: () => void;
  title?: any;
}

const Modal: React.FC<ModalProps> = ({ title, children }) => {
  const { onDismiss } = useContext(ModalContext);

  return (
    <Wrapper>
      <Header>
        <span>{title}</span>
        <CloseButton onClick={onDismiss}>
          <Close />
        </CloseButton>
      </Header>
      {children}
    </Wrapper>
  );
};

export default Modal;
