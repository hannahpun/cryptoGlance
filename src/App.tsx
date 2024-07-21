import { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import TransferAsset from "@pages/TransferAsset";
import NotFound from "@pages/NotFound";
// import { ToastProvider } from "@utils/ToastContext";
import { TransactionProvider } from "@utils/TransactionContext";
import { GlobalContext, reducer } from "@utils/global-state-management";
function App() {
  const [{ assets }, dispatch] = useReducer(reducer, { assets: [] });
  return (
    <GlobalContext.Provider value={{ assets, dispatch }}>
      <TransactionProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transfer" element={<TransferAsset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TransactionProvider>
    </GlobalContext.Provider>
  );
}

export default App;
