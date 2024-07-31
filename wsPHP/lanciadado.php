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


	include ('./db2.inc.php'); //MYSQLI //

	if ( $_GET['idutente'] != '') {
		$idutente=$_GET['idutente'];
		$Mysql="SELECT nomepg FROM personaggio WHERE idutente=$idutente";
		$res=mysqli_fetch_array(mysqli_query($db, $Mysql));
		$nomepg=mysqli_real_escape_string($db, $res['nomepg']);
	} else {
		$idutente = 0 ;
		$nomepg="NARRAZIONE";
	}


	$tiro=rand(1,5);
	if ( $idutente == 228 && $tiro == 5 ) {
		$tiro=rand(1,5);
	}
	if ( $idutente == 1 && $tiro == 1 ) {
		$tiro=rand(1,5);
	}
	$testo="tira ".$tiro;
	$Mysql="INSERT INTO dadi ( idutente, nomepg, Ora, Testo) VALUES ( $idutente, '$nomepg', NOW(), '$testo' ) ";
	mysqli_query($db, $Mysql);


	$out = "OK";

  header("HTTP/1.1 200 OK");

	echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
