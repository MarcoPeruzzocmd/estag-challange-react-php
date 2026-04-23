import DataTable from "../basics/DataTable";
import './styles/HomeTable.css'
function HomeTable({ ordersItem, products, onDelete, categories, onFinish, onCancel }) {
  const ordersWithProducts = ordersItem.map((oi) => {
    const product = products.find((p) => p.code === Number(oi.product_code));
    return {
      ...oi,
      name: product ? product.name : "—",
    };
  });
  const totalTax = ordersItem.reduce((acc, oi) => acc + Number(oi.tax), 0)
  const totalPrice = ordersItem.reduce((acc, oi) => acc + Number(oi.total), 0)
  return (
    <div style={{ flex: 1, borderLeft: "1px solid rgba(0, 0, 0, 0.5)" }}>
      <div className="containerTable">
        <DataTable
          columns={[
            { key: "display_code",   label: "Code",    className: "thCode" },
            { key: "name",   label: "Product", className: "thProduct", id: "line1" },
            { key: "price",  label: "Price",   className: "thPrice",   id: "line1" },
            { key: "amount", label: "Amount",  className: "thAmount",  id: "line1" },
            { key: "tax",    label: "Tax",     className: "thTax",     id: "line1" },
            { key: "total",  label: "Total",   className: "thTotal",   id: "line2" },
          ]}
          rows={ordersWithProducts}
          onDelete={onDelete}
        />
      </div>
      <div className="finalCart">
        <div className="bottomCart">
          <div className="pTax">
            <h5 style={{ fontSize: '17px' }}>Tax:</h5>
            <p id="textTotalTax" style={{ fontSize: '15px' }}>R$ {totalTax.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="pTotal">
            <h5 style={{ fontSize: '17px' }}>Total:</h5>
            <p id="textTotal" style={{ fontSize: '15px' }}>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="buttonsCart">
          <button onClick={onCancel} className="cancel">Cancel</button>
          <button onClick={onFinish} className="finish">Finish</button>
        </div>
      </div>
    </div>
  );
}

export default HomeTable;