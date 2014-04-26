<?php
require 'script-db-handler.php';
if( isset($_POST['perPage']) ){
    $count = $circuits->count();
    
    echo ceil($count/$_POST['perPage']);
}