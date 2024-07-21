import { useState, useEffect, useContext } from "react";

import { Box } from "@chakra-ui/react";
import Assets from "@components/Assets";
import CoinPieChart from "@components/CoinPieChart";

import { GlobalContext } from "@utils/global-state-management";
import { fetchData } from "@utils/http-management";
import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi, formatUnits } from "viem";

const allowAssetsList = ["bitcoin", "usd-coin", "weth"];
const wagmiContract = {
  abi: erc20Abi,
} as const;

function AssetsContainer() {
  const { address } = useAccount();
  const { dispatch, assets } = useContext(GlobalContext);
  const [assetsBalace, setAssetBalace] = useState<Array<IAssetBalance>>([]);
  const [totalBalnce, setTotalBalnce] = useState(0);

  useEffect(() => {
    const getFetchData = async () => {
      const params = {
        vs_currency: "usd",
        ids: allowAssetsList.join(","),
      };

      const searchParams = new URLSearchParams(params);

      const coinMarket = await fetchData({
        url: `/coins/markets?${searchParams.toString()}`,
      });

      const coinAssets = await Promise.all(
        allowAssetsList.map((asset) =>
          fetchData({
            url: `/coins/${asset}`,
          })
        )
      );

      dispatch({
        type: "SET_ASSETS",
        payload: coinMarket.map((coin, i) => ({
          address:
            coinAssets?.[i]?.platforms?.ethereum ||
            "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
          id: coin.id,
          image: coin.image,
          symbol: coin.symbol,
          current_price: coin.current_price,
        })),
      });
    };
    getFetchData();
  }, []);

  const { data: balanceData } = useReadContracts({
    contracts: assets?.map((asset) => ({
      ...wagmiContract,
      address: asset?.address,
      functionName: "balanceOf",
      args: [address],
    })),
  });

  const { data: decimalsData } = useReadContracts({
    contracts: assets?.map((asset) => ({
      ...wagmiContract,
      address: asset?.address,
      functionName: "decimals",
    })),
  });

  useEffect(() => {
    setAssetBalace(
      assets.map((_, index) => ({
        balance: formatUnits(
          (balanceData?.[index]?.result as bigint) ?? 0,
          (decimalsData?.[index]?.result as number) ?? 10
        ),
        value:
          Number(
            formatUnits(
              (balanceData?.[index]?.result as bigint) ?? 0,
              (decimalsData?.[index]?.result as number) ?? 10
            )
          ) * Number(assets?.[index]?.current_price),
      }))
    );
  }, [balanceData, decimalsData, assets]);

  useEffect(() => {
    const totalAge = assetsBalace.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);

    setTotalBalnce(totalAge);
  }, [assetsBalace]);

  return (
    <>
      <Box gap="5" mt="5" display="flex">
        <Assets assetsBalace={assetsBalace} totalBalnce={totalBalnce} />
        <CoinPieChart assetsBalace={assetsBalace} totalBalnce={totalBalnce} />
      </Box>
    </>
  );
}

export default AssetsContainer;
