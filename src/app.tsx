import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/client/Homepage";
import KitchenAdmin from "./pages/admin/KitchenAdmin";

const App: React.FC = () => {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<KitchenAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;