<?php
$orderItemController = new OrderItemController($myPDO);
$orderController = new OrdersController($myPDO);

switch ($method) {
    case 'POST':
        $result = $orderItemController->finishOrder();
        if (isset($result['error'])) {
            http_response_code(400);
        } else {
            http_response_code(201);
        }
        echo json_encode($result);
        break;
    case 'GET':
        echo json_encode($orderController->indexOrdersHistory());
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
