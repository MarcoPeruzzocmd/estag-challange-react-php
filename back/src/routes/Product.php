<?php
$productController = new ProductController($myPDO);

switch ($method) {
    case 'GET':
        if (isset($code)) {
            $product = $productController->getProductByCode($code);
            if ($product) {
                echo json_encode($product);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Produto não encontrado']);
            }
        } else {
            $products = $productController->indexProducts();
            echo json_encode($products);
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $productController->createProduct(
            $data['name'] ?? '',
            $data['amount'] ?? '',
            $data['price'] ?? '',
            $data['category_code'] ?? ''
        );
        if (isset($result['error'])) {
            http_response_code(400);
        } else {
            http_response_code(201);
        }
        echo json_encode($result);
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $code = $data['code'] ?? null;
        if (!isset($code)) {
            http_response_code(400);
            echo json_encode(['error' => 'Código obrigatório']);
            break;
        }
        $result = $productController->deleteProduct($code);
        if (isset($result['error'])) {
            http_response_code(400);
        }
        echo json_encode($result);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
}
