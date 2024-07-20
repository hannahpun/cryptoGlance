import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { config } from "./wagmi.ts";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "@components/ErrorBoundary";
import "./index.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <BrowserRouter>
            <ErrorBoundary errorComponent={<>Some error hhappen</>}>
              <App />
            </ErrorBoundary>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
