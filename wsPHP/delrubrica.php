<?php

//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	exit(0);
}

include ('db2.inc.php'); //MYSQLI//

$idrubrica = $_GET['idrubrica'];
if ($idrubrica!="")  {
	$MySql = "DELETE FROM rubrica WHERE idrubrica=$idrubrica";
	$Result = mysqli_query($db, $MySql);
	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $Mysql );

}


header("HTTP/1.1 200 OK");
$out = "OK";
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
