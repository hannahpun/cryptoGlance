import { useAccount } from "wagmi";
import { Box } from "@chakra-ui/react";

import ConnectWallet from "@components/ConnectWallet";
import AssetsContainer from "@components/AssetsContainer";

function Dashboard() {
  const { isConnected } = useAccount();

  return (
    <>
      <Box m="5">
        <ConnectWallet />
        {isConnected && <AssetsContainer />}
      </Box>
    </>
  );
}

export default Dashboard;
