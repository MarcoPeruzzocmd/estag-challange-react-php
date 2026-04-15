import DataTable from "../basics/DataTable";
function ProductTable({ products, onDelete }) {
  return (
    <div className="containerTable">

        <DataTable
          columns={[
            { key: "code", label: "Code", className: "thCode" },
            {
              key: "name",
              label: "Product",
              className: "thProduct",
              id: "line1",
            },
            {
              key: "amount",
              label: "Amount",
              className: "thAmount",
              id: "line1",
            },
            { key: "price", label: "Price", className: "thPrice", id: "line1" },
            {
              key: "category",
              label: "Category",
              className: "thCategory",
              id: "line2",
            },
          ]}
          rows={products}
          onDelete={onDelete}
        />
    </div>
  );
}
export default ProductTable;
