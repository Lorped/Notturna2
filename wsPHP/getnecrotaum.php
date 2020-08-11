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

include ('db.inc.php');

$idutente = $_GET['idutente'];

	$MySql="SELECT * FROM taumaturgie_main
		WHERE idtaum NOT IN ( select idtaum from taumaturgie where idutente=$idutente )";
	$Result=mysql_query($MySql);

	$taumaturgie = [];

	while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {

		$taumaturgie [] = $res ;
	}


	$MySql="SELECT * FROM necromanzie_main
		WHERE idnecro NOT IN ( select idnecro from necromanzie where idutente=$idutente )";
	$Result=mysql_query($MySql);

	$necromanzie = [];

	while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {

		$necromanzie [] = $res ;
	}

	$out = [
		'taumaturgie' => $taumaturgie,
		'necromanzie' => $necromanzie
	];


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
