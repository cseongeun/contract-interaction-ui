import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from 'components/Common/Avatar';
import Chip from '@material-ui/core/Chip';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import { useWeb3React } from '@web3-react/core';
import { ChainId } from '../../../../../connectors/constants';
import { isNull } from '../../../../../libs/helpers/type';

const variables = {
  size: 12,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  @media (max-width: 620px) {
    display: none;
  }
`;



const Network = () => {
  const [networkName, setNetworkName] = useState<string>(null)
  
  const { chainId } = useWeb3React();

  useEffect(()=> {
    if (chainId) {
      setNetworkName(ChainId[chainId])
    } else {
      setNetworkName(null)
    }
  }, [chainId])



  return (
    <Wrapper>
      <>
      <Chip
        icon={<RssFeedIcon />}
        label={networkName}
        color={isNull(networkName) ? 'secondary' : "primary"}
        variant="outlined"
      />
      </>
    </Wrapper>
  );
};

export default Network;
