import './styles/CategoryForm.css'
function CategoryForm() {
  return (
    <>
      <form id="form" className="fProduct">
        <div className="addProduct" id="addProduct">
          <input maxLength="30" className="categoriesInput" placeholder="Categories" type="text" name="category" id="category"/>
          <input className="taxInput" placeholder="Tax" type="number" name="tax" id="tax"/>
        </div>
        <button type="submit" id="add"> Add Category </button>
      </form>
    </>
  );
}
export default CategoryForm;