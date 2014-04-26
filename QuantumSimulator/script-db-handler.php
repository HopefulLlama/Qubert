<?php
/*
	Code adapted from http://www.php.net/manual/en/mongo.connecting.auth.php (accessed 11/04/2014)
*/
$m = new MongoClient("mongodb://".$username.":".$password."@mongo.cms.gre.ac.uk/mdb_lj048");
$circuits = $m->selectCollection("mdb_lj048", "circuits");
?>
