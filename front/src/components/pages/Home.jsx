import HomeForm from "../home/HomeForm";
import HomeTable from "../home/HomeTable";
import { useState } from "react";
function Home() {
  const [orders, setOrders] = useState([]);

  function handleDelete(code) {
    const filtered = orders.filter((o) => o.code !== code);
    setOrders(filtered);
  }
  return (
    <div className="container">
      <HomeForm />
      <HomeTable orders={orders} onDelete={handleDelete} />
    </div>
  );
}
export default Home;
