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

//global $par_DbHost
include 'db2.inc.php';  //MYSQLI//




$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$nome = $request->nome;
$password = $request->password;

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;

$nome = mysqli_real_escape_string($db, $nome);
$password = mysqli_real_escape_string($db, $password);




if (isset($postdata) && $nome != "" && $password != "" ) {

	$MySql = "SELECT * FROM utente WHERE nome = '$nome' AND password = '$password' ";
	$Result = mysqli_query($db, $MySql);


	if ( $res = mysqli_fetch_array($Result)   ) {

		$idutente = $res['idutente'];
		$admin = $res['admin'];

		$mysql = "SELECT count(*) as x from personaggio where idutente = '$idutente' ";
		$result = mysqli_query($db, $mysql);
		$res = mysqli_fetch_array($result);

		$scheda = $res['x'];


		$out = [
			'idutente' => $idutente,
			'admin' => $admin ,
			'scheda' => $scheda
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
