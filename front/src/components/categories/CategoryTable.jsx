import DataTable from "../basics/DataTable";
function CategoryTable({ categories, onDelete }) {
    return(
    <div style={{ flex: 1, borderLeft: '1px solid rgba(0, 0, 0, 0.5)', }}>
        <div className="containerTable">
            <DataTable columns={[
            { key: "display_code", label: "Code", className: "thCode" },
            {
              key: "name",
              label: "Category",
              className: "thCategory",
              id: "line1",
            },
            {
              key: "tax",
              label: "Tax",
              className: "thTax",
              id: "line2",
            },
          ]}
          rows={categories}
          onDelete={onDelete}
        />
        </div>
    </div>
    )
}
export default CategoryTable