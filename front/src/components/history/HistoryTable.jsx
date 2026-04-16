import './styles/HistoryTable.css'
import '../basics/styles/ProductTable.css';
import { Link } from "react-router-dom";

function HistoryTable({ details, onDetail }) {
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
        <tbody>
          {details.map((order) => (
            <tr key={order.code} className="product1">
              <td>{order.code}</td>
              <td>R$ {order.tax}</td>
              <td>R$ {order.total}</td>
              <td className="tdButton1">
                <Link to="/detail">
                <button className="detail1" onClick={() => onDetail(order.code)}>
                  Detail
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoryTable