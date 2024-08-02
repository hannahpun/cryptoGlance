import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WagmiProvider } from "wagmi";
import { BrowserRouter } from "react-router-dom";

import { config } from "@/wagmi.ts";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "@components/Error/ErrorBoundary";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={new QueryClient()}>
        <ChakraProvider>
          <BrowserRouter>
            <ErrorBoundary errorComponent={<>Some error hhappen</>}>
              {children}
            </ErrorBoundary>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
