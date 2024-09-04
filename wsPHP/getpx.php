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

include ('db2.inc.php'); //MYSQLI ///

$idutente = $_GET['idutente'];

	$pxdisponibili = 0 ;

	$MySql = "SELECT * FROM personaggio
			WHERE  idutente = $idutente ";
	$Result = mysqli_query($db, $MySql);

	$res = mysqli_fetch_array ($Result);

	$px = $res['xp'];
	$pxspesi = $res['xpspesi'];

	if ( $px > 113 ) {
		$pxs = 86 + ($px - 113)/2;
	} elseif ( $px > 32 ) {
		$pxs = 32 + ($px - 32)/ 1.5 ;
	} else {
		$psx = $px;
	}

	$pxdisponibili = floor( $pxs - $pxspesi );

	if ( $pxdisponibili < 0 ) {
		$pxdisponibili = 0 ;
	}




	$out = [
		'pxdisponibili' => $pxdisponibili
	];


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
