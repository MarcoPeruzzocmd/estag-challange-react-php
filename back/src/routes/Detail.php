<?php
$detailController = new DetailController($myPDO);

switch ($method) {
    case 'GET':
        if (isset($code)) {
            $result = $detailController->viewDetail($code);
            if ($result) {
                echo json_encode($result);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Produto não encontrado']);
            }}
}