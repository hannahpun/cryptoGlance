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
function CoinPieChart({ assetsBalace, totalBalnce }) {
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
            // center={[50, 50]}
            data={[
              {
                color: "#E38627",
                title: assets[0]?.symbol,
                value: Math.floor(assetsBalace?.[0]?.value / totalBalnce),
              },
              {
                color: "#C13C37",
                title: assets[1]?.symbol,
                value: Math.floor(assetsBalace?.[1]?.value / totalBalnce),
              },
              {
                color: "#6A2135",
                title: assets[2]?.symbol,
                value: Math.floor(assetsBalace?.[2]?.value / totalBalnce),
              },
            ]}
            viewBoxSize={[130, 130]}
          />
        </CardBody>
      </Card>
    </Box>
  );
}

export default CoinPieChart;
