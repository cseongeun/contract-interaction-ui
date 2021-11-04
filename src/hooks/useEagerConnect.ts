import { useEffect, useState } from 'react';
import { injected } from 'connectors';
import { isMobile } from 'react-device-detect';
import { useWeb3React } from '@web3-react/core';

function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      }
    });
  }, [activate]);

  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

export default useEagerConnect;
