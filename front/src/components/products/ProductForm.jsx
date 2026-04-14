import './styles/ProductForm.css'
function ProductForm(){
    return(
        <>
            <form action="" method="post" className="fProduct" >
                <div className="inputCima">
                    <input maxlength="30" placeholder="Product name" type="text" name="product" id="product" />
                </div>
                <div className="inputBaixo">
                    <input placeholder="Amount" type="number" name="amount" id="amount" className="amountInput" />
                    <input placeholder="Price" step="0.01" type="number" name="price" id="price" className="priceInput" />
                    <select name="category" id="select" className="categoryInput"></select>
                </div>
                <button type="submit" name="add" id="addBtn">Add Product</button>
            </form>
        </>
    )
}
export default ProductForm