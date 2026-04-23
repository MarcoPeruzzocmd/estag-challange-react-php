<?php
require_once __DIR__ . '/../classes/CategoryClass.php';
class CategoryController
{
    private $category;
    private $myPDO;
    public function __construct($myPDO)
    {
        $this->category = new Category($myPDO);
        $this->myPDO = $myPDO;
    }
    public function indexCategories()
    {
        return $this->category->getCategories();
    }
    public function createCategory($category, $tax)
    {
        if (!preg_match('/^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9\s]*$/', $category)) {
            return ['error' => 'O primeiro caractere precisa obrigatoriamente ser uma letra.'];
        }
        if (empty($category)) {
            return ['error' => 'Preencha o campo de categoria'];
        }
        if ($tax === '' || $tax === null) {
            return ['error' => 'Preencha o campo de taxa'];
        }
        if (!is_numeric($tax) || $tax < 0) {
            return ['error' => 'O campo de imposto deve ser um número positivo'];
        }
        if (strlen($category) > 30) {
            return ['error' => 'O nome da categoria deve ter no máximo 30 caracteres'];
        }
        if ($tax > 100) {
            return ['error' => 'O valor de imposto deve ser de no máximo 100%'];
        }
        if ($this->existCategory($category)) {
            return ['error' => 'Essa categoria já existe'];
        }
        $this->category->createCategory($category, $tax);
        return ['success' => 'Categoria criada com sucesso'];
    }
    public function deleteCategory($code)
    {
        $sql = "SELECT * FROM products WHERE category_code = ?";
        $statement = $this->myPDO->prepare($sql);
        $statement->execute([$code]);
        $products = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($products)) {
            return ['error' => 'Essa categoria não pode ser deletada, pois existem produtos associados a ela.'];
        }
        $this->category->deleteCategory($code);
        return ['success' => 'Categoria deletada'];
    }
    public function existCategory($category)
    {
        $normalized = strtolower(preg_replace('/\s+/', ' ', trim($category)));
        $sql = "SELECT COUNT(*) FROM categories WHERE LOWER(REGEXP_REPLACE(TRIM(name), '\s+', ' ', 'g')) = ?";
        $statement = $this->myPDO->prepare($sql);
        $statement->execute([$normalized]);
        return $statement->fetchColumn() > 0;
    }
}
