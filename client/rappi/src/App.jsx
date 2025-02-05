import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProductList from "./components/Pedidos";
import Cart from "./components/Cart";
import OrderHistory from "./components/orderHistory";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path="*" element={<LoginForm onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/productos" element={<ProductList />} />
            <Route path="/carrito" element={<Cart userId={user.id} />} />
            <Route path="/historial" element={<OrderHistory userId={user.id} />} />
            <Route path="*" element={<Navigate to="/productos" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
