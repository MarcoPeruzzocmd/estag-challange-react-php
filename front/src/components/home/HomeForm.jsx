import './styles/HomeForm.css'
function HomeForm(){
    return(
        <>
        <form action="" method="post" class="fProduct">
        <div class="inputCima">
          <select id="select" placeholder="Product">
            <option value="" id="selecione">Selecione...</option>
          </select>
        </div>
        <div class="inputBaixo">
          <input type="number" name="" id="amount" placeholder="Amount" class="amountInput" />
          <input type="text" name="" id="tax" disabled placeholder="Tax value" class="taxInput"/>
          <input type="text" name="" id="price" disabled placeholder="Price" class="priceInput"
          />
        </div>

        <button type="submit" onclick="validateProduct()">Add product</button>
      </form>
        </>
    )
}
export default HomeForm