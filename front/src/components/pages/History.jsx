import HistoryTable from "../history/HistoryTable";
import { useState, useEffect } from "react";
import { getOrder } from "../../services/orderService";
function History() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
      getOrder().then(data => setOrders(data))
    }, [])
  return (
    <>
      <HistoryTable orders={orders}  />
    </>
  );
}
export default History;
