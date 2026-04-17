<?php

$categoryController = new CategoryController($myPDO);

switch ($method) {
    case 'GET':
        echo json_encode($categoryController->indexCategories());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $categoryController->createCategory(
            $data['name'] ?? '',
            $data['tax'] ?? ''
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
        $categoryController->deleteCategory($code);
        echo json_encode(['success' => 'Categoria deletada']);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
}
