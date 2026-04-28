<?php
require_once __DIR__ . '/../classes/OrdersClass.php';
class OrdersController{
    private $orders;
    public function __construct($myPDO)
    {
        $this->orders = new Orders($myPDO);
    }
    public function indexOrdersHistory(){
        return $this->orders->getOrdersHistory();}
}