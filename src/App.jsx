import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { CartProvider } from './context/CartContext';
import Testing from "./pages/Testing";

function App() {
  return (
    <BrowserRouter>
          <CartProvider>

      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Layout wrapper */}
        <Route element={<Layout />}>
          {/* Nested routes */}
          <Route path="home" element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductDetailsPage />} />
                    <Route path="testing" element={<Testing />} />

        </Route>
      </Routes>
          </CartProvider>
    </BrowserRouter>
  );
}

export default App;
