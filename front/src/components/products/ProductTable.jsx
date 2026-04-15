import DataTable from "../basics/DataTable";

function ProductTable({ products, onDelete }) {
  return (
    <div style={{ flex: 1, borderLeft: '1px solid rgba(0, 0, 0, 0.5)', }}>
      <div className="containerTable">
        <DataTable
          columns={[
            { key: "code",     label: "Code",     className: "thCode" },
            { key: "name",     label: "Product",  className: "thProduct", id: "line1" },
            { key: "amount",   label: "Amount",   className: "thAmount",  id: "line1" },
            { key: "price",    label: "Price",    className: "thPrice",   id: "line1" },
            { key: "category", label: "Category", className: "thCategory",id: "line2" },
          ]}
          rows={products}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default ProductTable;