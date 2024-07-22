import { createContext, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useWaitForTransactionReceipt, useSendTransaction } from "wagmi";

const TransactionContext = createContext<any>(null);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const toast = useToast();
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: "Success",
        description: "Transaction confirmed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    if (isConfirming) {
      toast({
        title: "Pending",
        description: "Waiting for confirmation...",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isConfirmed, isPending, error]);

  return (
    <TransactionContext.Provider
      value={{ sendTransaction, isPending, isConfirming }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => useContext(TransactionContext);
