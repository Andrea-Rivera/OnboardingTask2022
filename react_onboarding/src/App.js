import { Navbar } from "./components/Navbar";
import { Customer } from "./components/Customers/CustomerIndex";
import { Products } from "./components/Products/ProductsIndex";
import { Stores } from "./components/Stores/StoresIndex";
import { Sales } from "./components/Sales/SalesIndex";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/customers" element={<Customer />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </Router>
  );
}

export default App;
