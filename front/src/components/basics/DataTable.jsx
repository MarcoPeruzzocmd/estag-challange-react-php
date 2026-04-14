import "./styles/ProductTable.css";
function DataTable({ columns, rows, onDelete }) {
  return (
      <form action="" className="product-table-form" >
        <div className="containerTable">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={col.className} id={col.id}>
                    {col.label}
                  </th>
                ))}
                <th className="thActions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.code} className="product1">
                  {columns.map((col) => (
                    <td key={col.key} className={`td${col.key}`}>
                      {row[col.key]}
                    </td>
                  ))}
                  <td className="tdButton1">
                    <button
                      className="delete1"
                      onClick={() => {
                        if (window.confirm("Tem certeza que deseja excluir?")) {
                          onDelete(row.code);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
  );
}

export default DataTable;
