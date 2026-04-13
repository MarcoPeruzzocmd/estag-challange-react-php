<?php
require_once __DIR__ . '/../classes/DetailClass.php';
class DetailController {
    private $detail;
    public function __construct($myPDO){
        $this->detail = new Detail($myPDO);
    }
    public function viewDetail ($code){
        return $this->detail->viewDetail($code);
    }
}