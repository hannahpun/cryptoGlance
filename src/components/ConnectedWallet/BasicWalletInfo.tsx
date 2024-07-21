import { memo } from "react";
import { Text, Box, Heading } from "@chakra-ui/react";

import { useAccount, useBalance } from "wagmi";

function BasicWalletInfo() {
  const { address, chainId } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  return (
    <Box m="5">
      <Heading size="sm" mb="2">
        Wallet Info
      </Heading>
      <Text>Address: {JSON.stringify(address)}</Text>
      <Text>chain: {chainId}</Text>
      <Text>
        {balance?.symbol}: {balance?.formatted}
      </Text>
    </Box>
  );
}

export default memo(BasicWalletInfo);
