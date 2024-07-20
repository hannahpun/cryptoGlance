import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import BasicWalletInfo from "./BasicWalletInfo";
import SwitchChain from "./SwitchChain";

function ConnectWallet() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">Connect Wallet</Heading>
          <Text>
            Connect vour cryptocurrency wallet to view your asset portfolio.
          </Text>
        </CardHeader>
        <CardBody>
          {account.isConnected ? (
            <>
              <Button onClick={() => disconnect()}>Disconnect</Button>
              <Flex mx="-5" my="5">
                <BasicWalletInfo />
                <SwitchChain />
              </Flex>
            </>
          ) : (
            connectors.map((connector) => (
              <Button
                colorScheme="teal"
                variant="solid"
                key={connector.uid}
                mr="2"
                onClick={() => connect({ connector })}
                type="button"
              >
                {connector.name}
              </Button>
            ))
          )}
          <Text color="tomato">{error?.message}</Text>
        </CardBody>
      </Card>
    </>
  );
}

export default ConnectWallet;
