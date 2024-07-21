import { useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
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
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@utils/global-state-management";
import { IAssetBalance } from "@/types/asset.type";

function Assets({
  assetsBalace,
  totalBalnce,
}: {
  assetsBalace: Array<IAssetBalance>;
  totalBalnce: number;
}) {
  const { assets } = useContext(GlobalContext);
  const navigate = useNavigate();
  console.log("assets: ", assets);
  return (
    <>
      <Card>
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
                  <Th>USD Value</Th>
                  <Th>Percentage</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((asset: any, index) => (
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
                    <Th>{assetsBalace?.[index]?.balance}</Th>
                    <Th>{asset.address}</Th>
                    <Th>{assetsBalace?.[index]?.value}</Th>
                    <Th>
                      {Math.floor(
                        (assetsBalace?.[index]?.value / totalBalnce) * 100
                      )}
                      %
                    </Th>
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
