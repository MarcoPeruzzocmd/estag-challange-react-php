import "./styles/DetailTable.css";
import ProtectedTbody from "../basics/ProtectedTbody";

function DetailTable({ detail }) {
  return (
    <div className="tableBuy">
      <table>
        <thead>
          <tr>
            <th id="line1">Code sale</th>
            <th id="line1">Product</th>
            <th id="line1">Category</th>
            <th id="line1">Amount</th>
            <th id="line1">Unit Price</th>
            <th className="thTax" id="line1">
              Tax
            </th>
            <th className="thTotal" id="line1">
              Total
            </th>
            <th className="thDate" id="line1">
              Date
            </th>
            <th className="thHour" id="line2">
              Hour
            </th>
          </tr>
        </thead>
        <ProtectedTbody id="table">
          {detail.map((item) => (
            <tr key={item.code} className="product1">
              <td>{item.code}</td>
              <td>{item.product_name}</td>
              <td>{item.category_name}</td>
              <td>{item.amount}</td>
              <td>R$ {item.price}</td>
              <td>R$ {item.tax}</td>
              <td>R$ {item.price_total}</td>
              <td>{item.data_compra}</td>
              <td>{item.hora_compra}</td>
            </tr>
          ))}
        </ProtectedTbody>
      </table>
    </div>
  );
}
export default DetailTable;
