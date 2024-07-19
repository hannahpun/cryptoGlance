import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi } from "viem";

import { formatUnits } from "viem";

const wagmiContract = {
  address: import.meta.env.VITE_ADDRESS,
  abi: erc20Abi,
} as const;

function Assets() {
  const { address } = useAccount();
  if (!address) return;

  const { data } = useReadContracts({
    contracts: [
      {
        ...wagmiContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...wagmiContract,
        functionName: "decimals",
      },
    ],
  });

  const balanceData = data?.[0].result;
  const decimals = data?.[1].result;

  const uniBalance =
    balanceData && decimals ? formatUnits(balanceData, decimals) : undefined;

  return (
    <>{balanceData !== undefined && <div>WETH Balance: {uniBalance}</div>}</>
  );
}

export default Assets;
