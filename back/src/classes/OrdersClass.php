<?php
class Orders {
    private $myPDO;
    public function __construct($myPDO)
    {
        $this->myPDO = $myPDO;
    }
    public function getOrdersHistory(){
        $sql = "SELECT * FROM orders ORDER BY code DESC";
        $statement = $this->myPDO->query($sql);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } 
}
    