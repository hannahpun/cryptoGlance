import { useEffect } from "react";
import { Button, Text, Heading, Box } from "@chakra-ui/react";
import { useSwitchChain, useChainId } from "wagmi";

function SwitchChain() {
  const chainId = useChainId();
  const { chains, switchChain, error } = useSwitchChain();

  return (
    <Box m="5">
      <Heading size="sm" mb="2">
        Switch Network
      </Heading>
      {chains.map((chain) => (
        <Button
          colorScheme="teal"
          variant="outline"
          isDisabled={chainId === chain.id}
          key={chain.id}
          mr="2"
          onClick={() => switchChain({ chainId: chain.id })}
        >
          {chain.name}
        </Button>
      ))}

      <Text>{error?.message}</Text>
    </Box>
  );
}

export default SwitchChain;
