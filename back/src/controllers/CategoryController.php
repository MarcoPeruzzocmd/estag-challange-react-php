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
            return ['error' => 'The first character must be a letter.'];
        }
        if (empty($category)) {
            return ['error' => 'Please fill in the category field'];
        }
        if ($tax === '' || $tax === null) {
            return ['error' => 'Please fill in the tax field'];
        }
        if (!is_numeric($tax) || $tax < 0) {
            return ['error' => 'The tax field must be a positive number'];
        }
        if (strlen($category) > 30) {
            return ['error' => 'Category name must be at most 30 characters'];
        }
        if ($tax > 100) {
            return ['error' => 'Tax value must be at most 100%'];
        }
        if ($this->existCategory($category)) {
            return ['error' => 'This category already exists'];
        }
        $this->category->createCategory($category, $tax);
        return ['success' => 'Category created successfully'];
    }
    public function deleteCategory($code)
    {
        $sql = "SELECT * FROM products WHERE category_code = ?";
        $statement = $this->myPDO->prepare($sql);
        $statement->execute([$code]);
        $products = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($products)) {
            return ['error' => 'This category cannot be deleted because it has associated products.'];
        }
        $this->category->deleteCategory($code);
        return ['success' => 'Category deleted'];
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
