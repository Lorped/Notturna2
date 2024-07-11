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

include ('db2.inc.php'); // MYSQL //

$idutente = $_GET['idutente'];

	$MySql="SELECT * FROM logpx WHERE idutente=$idutente ORDER BY data ASC";
	$Result=mysqli_query($db, $MySql);

	$logpx = [];

	while ( $res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {

		$logpx [] = $res ;
	}


header("HTTP/1.1 200 OK");
echo json_encode ($logpx, JSON_UNESCAPED_UNICODE);

?>
