<?php
require 'script-db-handler.php';
if( isset($_POST['id']) ){
    $id = $_POST['id'];
    
    $criteria = array('_id' => new MongoId($id));
    $fields = array('json' => 1);
    $cursor = $circuits->find($criteria, $fields)->limit(1);

    $response = array();
    foreach($cursor as $doc){
        array_push($response, $doc);
    }
    echo json_encode($response);
}