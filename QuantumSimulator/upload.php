<?php
require 'script-db-handler.php';
if( isset($_POST['name']) && isset($_POST['json']) ){
    $name = $_POST['name'];
    $json = $_POST['json'];
    
    $document = array('name' => $name, 'json' => $json);
    $circuits->insert($document);
    
    echo var_dump($document);
}