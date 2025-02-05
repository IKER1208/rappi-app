// src/App.jsx
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderHistory from './components/orderHistory';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <ProductList />
          <Cart userId={user.id} />
          <OrderHistory userId={user.id} />
        </div>
      )}
    </div>
  );
}

export default App;
