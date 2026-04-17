import HomeForm from "../home/HomeForm";
import HomeTable from "../home/HomeTable";
import { useState, useEffect } from "react";
import { getOrderItem, createOrderItem, deleteOrderItem } from "../../services/homeService";
import { getProducts } from "../../services/productServices";
import { getCategories } from "../../services/categoryService";
function Home() {
  const [ordersItem, setOrdersItem] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      getOrderItem().then((data) => setOrdersItem(data));
      getProducts().then(setProducts);
      getCategories().then(setCategories);
    }, []);
  
    async function handleDelete(code) {
      try {
        const res = await deleteOrderItem(code);
        alert(JSON.stringify(res));
        const filtered = ordersItem.filter((oi) => oi.code !== code);
        setOrdersItem(filtered);
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
    async function handleAdd(orderItem) {
  try {
    const res = await createOrderItem(orderItem);
    console.log("RESPOSTA:", res);

    const updated = await getOrderItem();
    console.log("ATUALIZADO:", updated);

    setOrdersItem(updated);
  } catch (error) {
    console.error("Erro ao adicionar:", error);
  }
}
  return (
    <div className="container">
      <HomeForm onAdd={handleAdd} products={products} categories={categories}/>
      <HomeTable ordersItem={ordersItem}
        products={products}
        onDelete={handleDelete}
        categories={categories}
        />
    </div>
  );
}
export default Home;
