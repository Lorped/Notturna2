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

include ('db2.inc.php'); // MYSQLI//

$idutente = $_GET['idutente'];


	$MySql = "SELECT personaggio.idstatus , status , fdvmax, bloodp, bloodpmax , sete , attivazione, personaggio.generazione , addbp, fdvbase, bgbase FROM personaggio
		LEFT JOIN statuscama on statuscama.idstatus = personaggio.idstatus
		LEFT JOIN generazione on generazione.generazione = personaggio.generazione
			WHERE  idutente = $idutente ";
	$Result = mysqli_query($db, $MySql);
	$res = mysqli_fetch_array ($Result,MYSQLI_ASSOC);

	$oldstatus = $res['idstatus'];

	$val_old = $res;


	$MySql = "SELECT * FROM statuscama  WHERE idstatus = $oldstatus + 1 ";
	$Result = mysqli_query($db, $MySql);
	$res = mysqli_fetch_array ($Result,MYSQLI_ASSOC);

	$val_new = $res;

	$out = [
		'val_old' => $val_old,
		'val_new' => $val_new
	];


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
