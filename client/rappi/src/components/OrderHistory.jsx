// src/components/OrderHistory.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/order/history/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error al obtener el historial de pedidos:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h2>Historial de Pedidos</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Pedido #{order.id} - Total: ${order.totalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;