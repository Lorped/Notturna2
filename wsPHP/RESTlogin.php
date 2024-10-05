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


include 'db2.inc.php';  //MYSQLI//




$login = @$_GET['login']; 
$password = @$_GET['password']; 


$login = mysqli_real_escape_string($db, $login);
$password = mysqli_real_escape_string($db, $password);




if ($login != "" && $password != "" ) {

	$MySql = "SELECT idutente FROM utente WHERE nome = '$login' AND password = '$password' ";

	$Result = mysqli_query($db, $MySql);


	if ( $res = mysqli_fetch_array($Result)   ) {

		$idutente = $res['idutente'];
		$out = [
			'idutente' => $idutente
		];

		echo json_encode ($out, JSON_UNESCAPED_UNICODE);


		// FINE OPERAZIONI LOGIN

	} else {
		$out = [
			'idutente' => -2
		];
		echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	}

} else {
	$out = [
		'idutente' => -1
	];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
}


?>
