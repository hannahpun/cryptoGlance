import { Route, Routes } from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import TransferAsset from "@pages/TransferAsset";
import NotFound from "@pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transfer" element={<TransferAsset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
