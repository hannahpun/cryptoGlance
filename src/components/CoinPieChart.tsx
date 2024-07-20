import { PieChart } from "react-minimal-pie-chart";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from "@chakra-ui/react";
function CoinPieChart() {
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
                title: "One 10",
                value: 10,
              },
              {
                color: "#C13C37",
                title: "Two",
                value: 15,
              },
              {
                color: "#6A2135",
                title: "Three",
                value: 20,
              },
            ]}
            // labelPosition={50}
            // lengthAngle={360}
            // lineWidth={15}
            // paddingAngle={0}
            // radius={50}
            // rounded
            // startAngle={0}
            viewBoxSize={[130, 130]}
          />
        </CardBody>
      </Card>
    </Box>
  );
}

export default CoinPieChart;
