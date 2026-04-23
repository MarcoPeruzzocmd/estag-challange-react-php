import './styles/HistoryTable.css'
import '../basics/styles/ProductTable.css';
import { Link } from "react-router-dom";
import ProtectedTbody from "../basics/ProtectedTbody";

function HistoryTable({ orders }) {
  return (
    <div className="tableHistory">
      <table>
        <thead>
          <tr>
            <th className="thCode">Code</th>
            <th className="thTax" id="line1">Tax</th>
            <th className="thTotal" id="line1">Total</th>
            <th className="thActions" id="line1">Actions</th>
          </tr>
        </thead>
        <ProtectedTbody>
          {orders.map((order) => (
            <tr key={order.code} className="product1">
              <td>{order.code}</td>
              <td>R$ {order.tax}</td>
              <td>R$ {order.total}</td>
              <td className="tdButton1">
                <Link to={`/detail/${order.code}`}>
                <button className="detail1">
                  Detail
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </ProtectedTbody>
      </table>
    </div>
  )
}

export default HistoryTable
