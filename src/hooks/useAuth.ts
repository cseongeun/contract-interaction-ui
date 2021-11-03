import { useCallback, useEffect } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { connectorsByName, ConnectorNames } from "connectors";
import { setupNetwork } from "connectors/metamask";
import useToast from "hooks/useToast";
import { ConnectorKey } from "config/lsKey";

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();
  const { toast } = useToast();

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork(null);
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(ConnectorKey);
            if (error instanceof NoEthereumProviderError) {
              toast({
                description: "Provider Error, No provider was found",
                type: "error",
              });
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              toast({
                description:
                  "Authorization Error, Please authorize to access your account",
                type: "error",
              });
            } else {
              toast({
                description: `${error.name}, ${error.message}`,
                type: "error",
              });
            }
          }
        });
      } else {
        toast({
          description:
            "Unable to find connector, The connector config is wrong",
          type: "error",
        });
      }
    },
    [activate, toast]
  );

  const logout = useCallback(() => {
    deactivate();
    if (window.localStorage.getItem("walletconnect")) {
      connectorsByName.WalletConnect.close();
      connectorsByName.WalletConnect.walletConnectProvider = null;
    }
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
