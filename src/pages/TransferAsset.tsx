import { FormEvent, useEffect } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Box,
  Text,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";

import { useTransactionContext } from "@utils/TransactionContext";
import { Link } from "react-router-dom";
import { Hex, parseEther } from "viem";

function TransferAsset() {
  const { sendTransaction, isPending } = useTransactionContext();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as Hex;
    const value = formData.get("value") as string;

    sendTransaction({
      to,
      value: parseEther(value),
    });
  }

  return (
    <Box m="10">
      <Link to="/">
        <Text mb="5" color="teal">
          Back to Dashboard
        </Text>
      </Link>
      <Heading size="md" mb="2">
        Transaction Asset
      </Heading>

      <form onSubmit={submit}>
        <Flex w="500px" alignItems="end" gap="3">
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input name="address" placeholder="Address" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Amount (ETH)</FormLabel>
            <Input
              type="number"
              step="0.000000001"
              name="value"
              placeholder="Amount (ETH)"
            />
          </FormControl>
          <Button disabled={isPending} type="submit">
            {isPending ? "Confirming..." : "Send"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default TransferAsset;
