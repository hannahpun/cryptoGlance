import { useContext } from "react";
import { PieChart } from "react-minimal-pie-chart";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from "@chakra-ui/react";

import { GlobalContext } from "@utils/global-state-management";
import { IAssetBalance } from "@/types/asset.type";

function getRandomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function CoinPieChart({
  assetsBalace,
  totalBalnce,
}: {
  assetsBalace: Array<IAssetBalance>;
  totalBalnce: number;
}) {
  const { assets } = useContext(GlobalContext);

  return (
    <Box display="flex" w="30%">
      <Card>
        <CardHeader>
          <Heading size="md">Asset Value</Heading>
          <Text>
            Breakdown of your total asset value across different
            cryptocurrencies
          </Text>
        </CardHeader>
        <CardBody>
          <PieChart
            data={assetsBalace.map((asset, i) => ({
              color: getRandomHexColor(),
              title: assets[i]?.symbol,
              value: asset?.usdValue / totalBalnce,
            }))}
            viewBoxSize={[130, 130]}
          />
        </CardBody>
      </Card>
    </Box>
  );
}
export default CoinPieChart;
