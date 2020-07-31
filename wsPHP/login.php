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


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$nome = $request->nome;
$password = $request->password;

// $email = "julien@home.com";
// $password = "kli0loth";

$nome=mysql_real_escape_string($nome);
$password=mysql_real_escape_string($password);


if (isset($postdata) && $nome != "" && $password !="" ) {

	$MySql = "SELECT * FROM utenti WHERE nome='$nome' AND password='$password' ";
	$Result = mysql_query($MySql);


	if ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
		$idutente = $res['idutente'];
		$admin = $res['admin'];

		$vampiro = 0 ;
		$hunter = 0
		$MySql = "SELECT * FROM personaggio WHERE idutente = $idutente";
		$Results2 = mysql_query ($MySql);
		if ( $res2 = mysql_fetch_array($Result2,MYSQL_ASSOC)   ) {
			$vampiro = 1 ;
		}
		$MySql = "SELECT * FROM HUNTERpersonaggio WHERE idutente = $idutente";
		$Results2 = mysql_query ($MySql);
		if ( $res2 = mysql_fetch_array($Result2,MYSQL_ASSOC)   ) {
			$hunter = 1 ;
		}

		$out = [
			'idutente' => $idutente,
			'admin' => $admin ,
			'vampiro' => $vampiro,
			'hunter' => $at$huntertr,
		];

		echo json_encode ($out, JSON_UNESCAPED_UNICODE);

		//
		//	Do a lot of other stuff !!
		//


		// FINE OPERAZIONI LOGIN

	} else {
		header("HTTP/1.1 401 Unauthorized");
	}

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
