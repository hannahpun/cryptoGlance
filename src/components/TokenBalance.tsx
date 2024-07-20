import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi, formatUnits } from "viem";

const wagmiContract = {
  abi: erc20Abi,
} as const;

function TokenBalance({ contrast }: { contrast: string }) {
  const { address } = useAccount();
  const { data } = useReadContracts({
    contracts: [
      {
        ...wagmiContract,
        address: contrast,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...wagmiContract,
        address: contrast,
        functionName: "decimals",
      },
    ],
  });
  const balanceData = data?.[0].result;
  const decimals = data?.[1].result;

  const uniBalance =
    balanceData && decimals ? formatUnits(balanceData, decimals) : 0;

  return uniBalance;
}

export default TokenBalance;
