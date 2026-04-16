import './styles/DetailTable.css'
function DetailTable () {
    return(
        <div className="tableBuy">
            <table>
                <tr>
                    <th id="line1">Code sale</th>
                    <th id="line1">Product</th>
                    <th id="line1">Category</th>
                    <th id="line1">Amount</th>
                    <th id="line1">Unit Price</th>
                    <th className="thTax" id="line1">Tax</th>
                    <th className="thTotal" id="line1">Total</th>
                    <th className="thDate" id="line1">Date</th>
                    <th className="thHour" id="line2">Hour</th>
                </tr>
                <tbody id="table"></tbody>
            </table>
        </div>
    )
}
export default DetailTable