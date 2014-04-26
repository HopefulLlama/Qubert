<?php
require 'script-db-handler.php';
if( isset($_POST['page']) && isset($_POST['perPage']) ){
    $page = $_POST['page'];
    $perPage = $_POST['perPage'];
    $skip = (($page-1)*$perPage);
    $criteria = array();
    $fields = array('json' => 0);
    $cursor = $circuits->find($criteria, $fields)->skip($skip)->limit($perPage)->sort(array('name' => 1));
    
    $response = array();
    foreach($cursor as $doc){
        array_push($response, $doc);
    }
    echo json_encode($response);
}