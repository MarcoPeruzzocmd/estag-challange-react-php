import HistoryTable from "../history/HistoryTable";
import { useState } from "react";
function History() {
  const [details, setDetails] = useState([
    { code: 1, tax: 10, total: 100 },
    { code: 2, tax: 5, total: 50 },
    { code: 3, tax: 20, total: 200 },
  ]);

  function viewDetail(code) {
    const filtered = details.filter((d) => d.code !== code);
    setDetails(filtered);
  }
  return (
    <>
      <HistoryTable details={details} onDetail={viewDetail} />
    </>
  );
}
export default History;
