import { Route, Routes } from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import TransferAsset from "@pages/TransferAsset";
import NotFound from "@pages/NotFound";
// import { ToastProvider } from "@utils/ToastContext";
import { TransactionProvider } from "@utils/TransactionContext";

function App() {
  return (
    <TransactionProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transfer" element={<TransferAsset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TransactionProvider>
  );
}

export default App;
