<?php
$detailController = new DetailController($myPDO);

switch ($method) {
    case 'GET':
        if (!isset($code)) {
            http_response_code(400);
            echo json_encode(['error' => 'Code is required']);
            break;
        }
        $result = $detailController->viewDetail($code);
        if ($result) {
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Order not found']);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
