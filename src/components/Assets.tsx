import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import { useAccount, useReadContracts } from "wagmi";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { fetchData } from "@utils/http-management";
import TokenBalance from "@components/TokenBalance";

interface IAssets {
  id: string;
  image: string;
  symbol: string;
  current_price: string;
}
interface ITokenContrast {
  id: string;
  address: string;
}

interface IReadContracts {
  address: string;
  balance: string;
}

interface IAssetsDetail extends IAssets, ITokenContrast {}

const allowAssetsList = ["bitcoin", "usd-coin", "weth"];

function Assets() {
  const { address } = useAccount();
  if (!address) return;

  const navigate = useNavigate();
  const [assetsData, setAssetData] = useState<Array<IAssetsDetail>>([]);

  const params = {
    vs_currency: "usd",
    ids: allowAssetsList.join(","),
  };

  const searchParams = new URLSearchParams(params);

  useEffect(() => {
    // get market price
    const getFetchData = async () => {
      const coinMarket = await fetchData({
        url: `/coins/markets?${searchParams.toString()}`,
      });
      const coinDetail = await Promise.all(
        allowAssetsList.map((asset) =>
          fetchData({
            url: `/coins/${asset}`,
          })
        )
      );

      // console.log("data: ", data);
      const getAssetsDetail: Array<IAssetsDetail> = coinMarket.map(
        (asset: IAssets, index: number) => ({
          id: asset.id,
          image: asset.image,
          symbol: asset.symbol,
          current_price: asset.current_price,
          // address: coinDetail[index]?.platforms?.ethereum || "",
          address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" || "",
        })
      );
      setAssetData(getAssetsDetail);
    };
    getFetchData();
  }, []);

  return (
    <>
      {/* {JSON.stringify(assetsData)} */}
      <Card>
        {/* {balanceData !== undefined && <div>WETH Balance: {uniBalance}</div>} */}
        <CardHeader>
          <Heading size="md">Asset List</Heading>
          <Text>View your cryptocurrency assets and their current value.</Text>
          <Button
            mt="3"
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              navigate("/transfer");
            }}
          >
            Transaction Asset
          </Button>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Asset</Th>
                  <Th>Amount</Th>
                  <Th>Address</Th>
                  <Th>Value</Th>
                  <Th>Percentage</Th>
                  {/* <Th isNumeric>Value</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {assetsData.map((asset: IAssetsDetail) => (
                  <Tr key={asset.id}>
                    <Th>
                      <Box display="flex" alignItems="center">
                        <Image
                          mr="2"
                          boxSize="30px"
                          src={asset.image}
                          alt={asset.symbol}
                        />
                        {asset.symbol}
                      </Box>
                    </Th>
                    <Th>Amount: {<TokenBalance contrast={asset.address} />}</Th>
                    <Th>{asset.address}</Th>
                    <Th>{asset.current_price}</Th>
                    <Th>Percentage</Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
}

export default Assets;
