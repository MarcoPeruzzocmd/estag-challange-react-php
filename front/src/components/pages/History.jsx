import HistoryTable from "../history/HistoryTable";
import { useState, useEffect } from "react";
import { getOrder } from "../../services/orderService";
function History() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrder()
      .then(data => setOrders(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [])

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  return (
    <>
      <HistoryTable orders={orders}  />
    </>
  );
}
export default History;
