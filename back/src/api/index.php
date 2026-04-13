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
require_once  '../controllers/CategoryController.php';
require_once  '../controllers/ProductController.php';
require_once  '../controllers/DetailController.php';
require_once  '../controllers/OrderItemController.php';
require_once  '../controllers/OrdersController.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($uri, '/'));
$resource = strtolower($segments[2] ?? null);
$code = $segments[3] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
switch ($resource) {
    case 'orderitem':
        require_once '../routes/OrderItem.php';
        break;
    case 'order':
        require_once '../routes/Order.php';
        break;
    case 'product':
        require_once '../routes/Product.php';
        break;
    case 'category':
        require_once __DIR__ . '/../routes/Category.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Resource not found']);
        exit();
}
