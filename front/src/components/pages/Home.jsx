import HomeForm from "../home/HomeForm";
import HomeTable from "../home/HomeTable";
import { useState, useEffect } from "react";
import {
  getOrderItem,
  createOrderItem,
  deleteOrderItem,
  finishOrderItem,
  cancelOrderItem
} from "../../services/homeService";
import { getProducts } from "../../services/productServices";
import { getCategories } from "../../services/categoryService";
function Home() {
  const [ordersItem, setOrdersItem] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const productsInStock = products.filter((p) => p.amount > 0);

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
    const res = await createOrderItem(orderItem)
    if (!res) {
      console.error('PHP retornou null')
      return
    }
    if (res.error) {
      alert(res.error) 
      return
    }
    const updated = await getOrderItem()
    setOrdersItem(updated)
  } catch (error) {
    console.error("Erro ao adicionar:", error)
  }
}
  async function handleFinish() {
      if (window.confirm("Tem certeza que deseja finalizar o pedido?")) {
        await finishOrderItem();
        setOrdersItem([]);
      }
    }
    async function handleCancel() {
      if (window.confirm("Tem certeza que deseja cancelar o pedido?")) {
        await cancelOrderItem()
        setOrdersItem([]);
      }
    }
  return (
    <div className="container">
      <HomeForm onAdd={handleAdd} products={productsInStock} categories={categories} />
      <HomeTable
        ordersItem={ordersItem}
        products={products}
        onDelete={handleDelete}
        categories={categories}
        onFinish={handleFinish}
        onCancel={handleCancel}
      />
    </div>
  );
}
export default Home;
