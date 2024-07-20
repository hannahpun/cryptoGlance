import { useAccount } from "wagmi";
import { Box } from "@chakra-ui/react";

import ConnectWallet from "@components/ConnectWallet";
import Assets from "@components/Assets";
import CoinPieChart from "@components/CoinPieChart";

function Dashboard() {
  const { isConnected } = useAccount();
  return (
    <>
      <Box m="5">
        <ConnectWallet />
        {isConnected && (
          <Box gap="5" mt="5" display="flex">
            <Assets />
            <CoinPieChart />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Dashboard;
