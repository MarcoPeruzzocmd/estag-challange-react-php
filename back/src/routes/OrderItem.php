<?php
$orderItemController = new OrderItemController($myPDO);

switch ($method) {
    case 'GET':
        echo json_encode($orderItemController->indexOrderItem());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $orderItemController->createOrderItem(
            $data['product_code'] ?? '',
            $data['amount'] ?? ''
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
        if (isset($code)) {
            $result = $orderItemController->deleteOrderItem($code);
        } else {
            $result = $orderItemController->cancelOrder();
        }
        if (isset($result['error'])) {
            http_response_code(400);
        }
        echo json_encode($result);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
