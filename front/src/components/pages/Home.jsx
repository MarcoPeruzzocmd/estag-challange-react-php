import HomeForm from "../home/HomeForm";
import HomeTable from "../home/HomeTable";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {
  getOrderItem,
  createOrderItem,
  deleteOrderItem,
  finishOrderItem,
  cancelOrderItem
} from "../../services/homeService";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
function Home() {
  const [ordersItem, setOrdersItem] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const productsInStock = products.filter((p) => p.amount > 0);

  useEffect(() => {
    Promise.all([getOrderItem(), getProducts(), getCategories()])
      .then(([orderData, productsData, categoriesData]) => {
        setOrdersItem(orderData);
        setProducts(productsData);
        setCategories(categoriesData);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
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
        try {
          await finishOrderItem();
          setOrdersItem([]);
          navigate('/history');
        } catch (error) {
          alert(error.message);
        }
      }
    }
    async function handleCancel() {
      if (window.confirm("Tem certeza que deseja cancelar o pedido?")) {
        try {
          await cancelOrderItem();
          setOrdersItem([]);
        } catch (error) {
          alert(error.message);
        }
      }
    }
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
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
