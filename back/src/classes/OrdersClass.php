<?php
require_once __DIR__ . '/../connection.php';
class Orders {
    private $myPDO;
    public function __construct($myPDO)
    {
        $this->myPDO = $myPDO;
    }
    public function getOrdersHistory(){
        $sql = "SELECT * FROM orders";
        $statement = $this->myPDO->query($sql);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } 
}
    