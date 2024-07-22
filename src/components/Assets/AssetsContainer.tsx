import { useState, useEffect, useContext } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi, formatUnits } from "viem";
import { Box, Text } from "@chakra-ui/react";

import Assets from "@/components/Assets/Assets";
import CoinPieChart from "@/components/Assets/CoinPieChart";

import { GlobalContext } from "@utils/global-state-management";
import { fetchData } from "@utils/http-management";

import { useTransactionContext } from "@utils/TransactionContext";
import { IAssetBalance } from "@/types/asset.type";

const allowAssetsList = ["wrapped-bitcoin", "usd-coin", "weth"];

function AssetsContainer() {
  const { address } = useAccount();
  const { dispatch, assets } = useContext(GlobalContext);

  const [assetsBalace, setAssetBalace] = useState<Array<IAssetBalance>>([]);
  const [totalBalnce, setTotalBalnce] = useState(0);

  const { isConfirming } = useTransactionContext();

  useEffect(() => {
    // Fetch reelated API and get the data then set it to the global state
    const getFetchData = async () => {
      const coinMarket = await Promise.all(
        allowAssetsList.map((asset) =>
          fetchData({
            url: `/coins/markets?vs_currency=usd&ids=${asset}`,
          })
        )
      );

      const coinAssets = await Promise.all(
        allowAssetsList.map((asset) =>
          fetchData({
            url: `/coins/${asset}`,
          })
        )
      );

      dispatch({
        type: "SET_ASSETS",
        payload: coinMarket.map((coin: any, i: number) => ({
          address: coinAssets?.[i]?.platforms?.ethereum || "0x",
          // address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" || "0x",
          id: coin[0].id,
          image: coin[0].image,
          symbol: coin[0].symbol,
          current_price: coin[0].current_price,
        })),
      });
    };
    getFetchData();
  }, []);

  const { data: balanceData, isSuccess: balanceDataSuccess } = useReadContracts(
    {
      contracts: assets?.map((asset) => ({
        abi: erc20Abi,
        address: asset?.address,
        functionName: "balanceOf",
        args: [address],
      })),
    }
  );

  const { data: decimalsData, isSuccess: decimalsDataSuccess } =
    useReadContracts({
      contracts: assets?.map((asset) => ({
        abi: erc20Abi,
        address: asset?.address,
        functionName: "decimals",
      })),
    });

  useEffect(() => {
    const getAssetsBalance = assets.map((_, index) => {
      const formatBalance = formatUnits(
        (balanceData?.[index]?.result as bigint) ?? 0,
        (decimalsData?.[index]?.result as number) ?? 10
      );
      return {
        balance: formatBalance,
        usdValue:
          Number(formatBalance) * Number(assets?.[index]?.current_price),
      };
    });
    setAssetBalace(getAssetsBalance);

    const getTotalBalance = getAssetsBalance.reduce((acc, cur) => {
      return acc + cur.usdValue;
    }, 0);

    setTotalBalnce(getTotalBalance);
  }, [balanceDataSuccess, decimalsDataSuccess, isConfirming]);

  return (
    <>
      {decimalsDataSuccess && balanceDataSuccess ? (
        <Box gap="5" mt="5" display="flex">
          <Assets assetsBalace={assetsBalace} totalBalnce={totalBalnce} />
          <CoinPieChart assetsBalace={assetsBalace} totalBalnce={totalBalnce} />
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}

export default AssetsContainer;
