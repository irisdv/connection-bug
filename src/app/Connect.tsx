"use client";

import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import { useStarknetkitConnectModal } from "starknetkit";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { availableConnectors } from "./provider";

const Connect: FunctionComponent = () => {
  const { connectAsync } = useConnect();
  const { account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: availableConnectors,
  });

  // Autoconnect
  useEffect(() => {
    const connectToStarknet = async () => {
      if (!localStorage.getItem("TEST-connectedWallet")) return;
      const connectordId = localStorage.getItem("TEST-connectedWallet");
      const connector = availableConnectors.find(
        (item) => item.id === connectordId
      );
      await connectAsync({ connector });
    };
    connectToStarknet();
  }, []);

  const connectWallet = async () => {
    const { connector } = await starknetkitConnectModal();
    if (!connector) {
      return;
    }
    await connectAsync({ connector });
    localStorage.setItem("starkurabu-connectedWallet", connector.id);
  };

  const disconnectWallet = async () => {
    disconnect();
    localStorage.removeItem("TEST-connectedWallet");
  };

  return (
    <>
      <div>
        {!isConnected ? (
          <button onClick={connectWallet}>Connect</button>
        ) : (
          <button onClick={disconnectWallet}>Disconnect</button>
        )}
        Connected with : {account?.address}
      </div>
    </>
  );
};

export default Connect;
