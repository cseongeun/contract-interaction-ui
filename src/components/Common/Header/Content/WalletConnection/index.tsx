import React from 'react';
import styled, { css } from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import Modal from 'components/Common/Modal';
import useAuth from 'hooks/useAuth';
import useModal from 'hooks/useModal';
import { connectors } from 'connectors';
import { ConnectorKey } from 'config/lsKey';
import { shortenAddress } from 'libs/helpers/format';

const variables = {
  color: '#0062ff',
  crossSize: 18,
  colorWhite: '#fff',
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${variables.color};
  border-radius: 10px;
  width: 110px;
  height: 38px;
  border: none;
  outline: none;
  color: ${variables.colorWhite};
  font-size: 14px;
  cursor: pointer;
  :hover {
    background-color: ${variables.colorWhite};
    border: 1px solid ${variables.color};
    color: ${variables.color};
  }
  @media (max-width: 450px) {
    display: none;
  }
  * {
    font-family: 'Titillium Web', sans-serif;
  }
`;

const WalletCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    margin-bottom: 10px;
    &: last-child {
      margin-bottom: 0;
    }
  }
`;

const WalletCard = styled.button`
  position: relative;
  height: 48px;
  width: 343px;
  line-height: 46px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #0f1e92;
  outline: none;
  color: #0f1e92;
  box-sizing: border-box;
  &:hover {
    &:not([disabled]) {
      cursor: pointer;
      background: rgba(180, 172, 160, 0.5);
    }
  }
  ${props =>
    props.disabled &&
    css`
      background: #ffffff;
      border: 1px solid rgba(68, 51, 17, 0.35);
      color: rgba(68, 51, 17, 0.35);
    `}: img {
    width: 32px;
    height: 32px;
  }
  img {
    position: absolute;
    top: 7px;
    left: 12px;
    width: 32px;
    height: 32px;
  }
`;

interface WalletCardModalProps {
  login: any;
  onDismiss?: () => void;
}

const WalletCardModal: React.FC<WalletCardModalProps> = ({ login, onDismiss = () => null }) => {
  return (
    <Modal title='Connect to a wallet'>
      <WalletCardWrapper>
        {connectors.map((entry: any, key: any) => {
          return (
            <WalletCard
              key={key}
              onClick={() => {
                login(entry.connectorId);
                window.localStorage.setItem(ConnectorKey, entry.connectorId);
                onDismiss();
              }}
            >
              <img src={entry.icon} alt='' />
              {entry.title}
            </WalletCard>
          );
        })}
      </WalletCardWrapper>
    </Modal>
  );
};

const WalletConnection: React.FC = () => {
  const { login } = useAuth();
  const { account } = useWeb3React();

  const [walletCardPresent] = useModal(<WalletCardModal login={login} />);
  const [accountDetailPresent] = useModal(<div>hello</div>);

  return <Wrapper onClick={!account ? walletCardPresent : accountDetailPresent}>{!account ? 'Connect' : shortenAddress(account)}</Wrapper>;
};

export default WalletConnection;
