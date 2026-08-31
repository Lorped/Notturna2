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

require_once __DIR__ . '/db2.inc.php'; //MYSQL //

$idutente = $_GET['idutente'];

	$MySql="SELECT * FROM discipline_main
		WHERE iddisciplina NOT IN ( select iddisciplina from discipline where idutente=$idutente )";
	$Result=mysqli_query($db, $MySql);

	$otherdisc = [];

	while ( $res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
		$otherdisc [] = $res ;
	}

	$MySql="SELECT * FROM taumaturgie_main
		WHERE idtaum NOT IN ( select idtaum from taumaturgie where idutente=$idutente ) and clanesclusivo !=99";
	$Result=mysqli_query($db, $MySql);

	$othertaum = [];

	while ( $res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
		$othertaum [] = $res ;
	}

	$MySql="SELECT * FROM necromanzie_main
		WHERE idnecro NOT IN ( select idnecro from necromanzie where idutente=$idutente ) and clanesclusivo !=99";
	$Result=mysqli_query($db, $MySql);

	$othernecro = [];

	while ( $res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
		$othernecro [] = $res ;
	}



	$out = [
		'otherdisc' => $otherdisc,
		'othertaum' => $othertaum,
		'othernecro' => $othernecro
	];


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
