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
      await deleteOrderItem(code);
      const filtered = ordersItem.filter((oi) => oi.code !== code);
      setOrdersItem(filtered);
    } catch (error) {
      alert(error.message);
    }
  }
  async function handleAdd(orderItem) {
    try {
      await createOrderItem(orderItem);
      const updated = await getOrderItem();
      setOrdersItem(updated);
    } catch (error) {
      alert(error.message);
    }
  }
  async function handleFinish() {
      if (window.confirm("Tem certeza que deseja finalizar o pedido?")) {
        await finishOrderItem();
        setOrdersItem([]);
        window.location.href = "/history"
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
