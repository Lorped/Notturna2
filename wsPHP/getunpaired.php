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




  include ('db2.inc.php'); //MYSQL//


	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$idoggetto = $request -> idoggetto;

	$unpaired = [];


	$MySql = "SELECT COUNT(*) as paired_count FROM paired WHERE IDoggetto1 = $idoggetto OR IDoggetto2 = $idoggetto " ;

	$Result = mysqli_query($db, $MySql);
	$res = mysqli_fetch_array($Result,MYSQLI_ASSOC);
	$paired_count = $res['paired_count'];

	if ( $paired_count == 0 ) {


		$MySql = "SELECT idoggetto, nomeoggetto FROM oggetti WHERE idoggetto != $idoggetto  AND
			idoggetto NOT IN (SELECT IDoggetto1 FROM paired ) AND
			idoggetto NOT IN (SELECT IDoggetto2 FROM paired ) 	" ;

		$Result = mysqli_query($db, $MySql);
		while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
			$unpaired[] =  $res;
		}

	} 

  

	$output = [
		"unpaired" => $unpaired
  	];

	header("HTTP/1.1 200 OK");

  	$out = json_encode ($output, JSON_UNESCAPED_UNICODE);
	echo $out;




?>
