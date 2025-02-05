// src/components/Cart.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    fetchCart();
  }, [userId]);

  return (
    <div>
      <h2>Carrito</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.Product.name} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;