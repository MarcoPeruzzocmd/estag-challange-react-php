<?php
require_once __DIR__ . '/../connection.php';
require_once __DIR__ . '/../classes/OrderItemClass.php';
require_once __DIR__ . '/../controllers/ProductController.php';
class OrderItemController
{
    private $OrderItem;
    private $productController;
    public function __construct($myPDO)
    {
        $this->OrderItem = new OrderItem($myPDO);
        $this->productController = new ProductController($myPDO);
    }
    public function getPDO()
    {
        return $this->OrderItem->getPDO();
    }
    public function indexOrderItem()
    {
        return $this->OrderItem->getOrders();
    }
    public function existingOrderItem($productCode)
    {
        $sql = "SELECT * FROM order_item WHERE product_code = ? AND order_code IS NULL";
        $statement = $this->OrderItem->getPDO()->prepare($sql);
        $statement->execute([$productCode]);
        $existingOrderItem = $statement->fetch(PDO::FETCH_ASSOC);
        return $existingOrderItem;
    }
    public function createOrderItem($productCode, $amount)
    {
        if (empty($productCode) || empty($amount)) {
            return ['error' => 'Preencha todos os campos antes de adicionar ao carrinho.'];
        }
        $existingOrderItem = $this->existingOrderItem($productCode);
        $product = $this->productController->getProductByCode($productCode);
        $taxPercent = $this->productController->getTaxByProductCode($productCode);
        $price = $product['price'];
        $tax = $price * ($taxPercent / 100);

        if ($existingOrderItem) {
            if ($product['amount'] < $amount) {
                return ['error' => "Estoque insuficiente. Disponível: {$product['amount']}."];
            }
            $pdo = $this->OrderItem->getPDO();
            $pdo->beginTransaction();
            try {
                $newAmount = $existingOrderItem['amount'] + $amount;
                $newPrice = $existingOrderItem['price'] + ($price * $amount);
                $newTax = $existingOrderItem['tax'] + ($tax * $amount);

                $sql = "UPDATE order_item SET amount = ?, price = ?, tax = ? WHERE code = ?";
                $pdo->prepare($sql)->execute([$newAmount, $newPrice, $newTax, $existingOrderItem['code']]);

                $sql = "UPDATE products SET amount = amount - ? WHERE code = ?";
                $pdo->prepare($sql)->execute([$amount, $productCode]);

                $pdo->commit();
                return ['success' => true];
            } catch (\Throwable $e) {
                $pdo->rollBack();
                throw $e;
            }
        }

        $result = $this->OrderItem->createOrder($productCode, $amount);
        if (isset($result['error'])) {
            return $result;
        }
        return ['success' => true];
    }
    public function deleteOrderItem($code)
    {
        return $this->OrderItem->deleteOrderItem($code);
    }
    public function finishOrder()
    {
        return $this->OrderItem->finishOrder();
    }
    public function calculateTotalAndTax()
    {
        return $this->OrderItem->calculateTotalAndTax();
    }
    public function cancelOrder()
    {
        return $this->OrderItem->cancelOrder();
    }
}
