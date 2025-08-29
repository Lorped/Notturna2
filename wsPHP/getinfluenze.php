<?php

//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests333
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	exit(0);
}

include ('db2.inc.php'); //MYSQL//

$idutente = $_GET['idutente'];


$MySql = "SELECT idclan from personaggio where idutente = $idutente";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_array ($Result);
$idclan = $res['idclan'];

	if ( $idclan == 3 ) {   // NOSFERATU

		$MySql = "SELECT influenze_main.idinfluenza, nomeinfluenza, livello
		FROM influenze_main
		LEFT JOIN influenze ON influenze_main.idinfluenza = influenze.idinfluenza AND idutente = $idutente";

	} else {
		$MySql = "SELECT influenze_main.idinfluenza, nomeinfluenza, livello
		FROM influenze_main
		LEFT JOIN influenze ON influenze_main.idinfluenza = influenze.idinfluenza AND idutente = $idutente
		WHERE influenze_main.idinfluenza != 10 ";
	}




	$Result = mysqli_query($db, $MySql);

	$back = [];
	while ( $res = mysqli_fetch_array ($Result) ) {
		$back[] = $res;
	}

	$out = [
		'influenze' => $back
	];


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
