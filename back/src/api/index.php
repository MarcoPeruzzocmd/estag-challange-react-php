<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
require_once '../connection.php';
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($uri, '/'));
$resource = $segments[1] ?? null;
$id = $segments[2] ?? null;

switch ($resource) {
    case 'OrderItem';
        require_once 'OrderItem.php';
        break;
    case 'Order';
        require_once 'Order.php';
        break;
    case 'Product';
        require_once 'Product.php';
        break;
    case 'Category';
        require_once 'Category.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Resource not found']);
        exit();
}
