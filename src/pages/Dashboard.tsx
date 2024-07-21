import { useAccount } from "wagmi";
import { Box } from "@chakra-ui/react";

import ConnectWallet from "@components/ConnectedWallet/ConnectWallet";
import AssetsContainer from "@/components/Assets/AssetsContainer";

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
