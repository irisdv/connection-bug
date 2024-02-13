"use client";

import React from "react";

import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { Chain, mainnet } from "@starknet-react/chains";
import {
  Connector,
  StarknetConfig,
  jsonRpcProvider,
} from "@starknet-react/core";

export const availableConnectors = [
  new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
  new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
  new InjectedConnector({ options: { id: "okxwallet", name: "OKX" } }),
  new WebWalletConnector({ url: "https://web.argent.xyz" }),
  new ArgentMobileConnector(),
];

export function Providers({ children }: any) {
  const chains = [mainnet];
  const provider = jsonRpcProvider({
    rpc: (_chain: Chain) => ({
      nodeUrl: process.env.NEXT_PUBLIC_RPC_URL as string,
    }),
  });
  return (
    <StarknetConfig
      chains={chains}
      provider={provider}
      connectors={availableConnectors as Connector[]}
    >
      {children}
    </StarknetConfig>
  );
}
