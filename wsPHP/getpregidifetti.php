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

	$pregi_f= [];
	$difetti_f= [];

	$MySql="SELECT * FROM pregidifetti_main
			WHERE idpregio NOT IN ( select idpregio from pregidifetti where idutente=$idutente )
			AND classe = 'F' ORDER BY abs(valore) ";
	$Result=mysql_query($MySql);

	while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
		if ( $res['valore'] <0 ) {
			$difetti_f [] = $res;
		} else {
			$pregi_f [] = $res;
		}
	}


	$pregi_m= [];
	$difetti_m= [];

	$MySql="SELECT * FROM pregidifetti_main
			WHERE idpregio NOT IN ( select idpregio from pregidifetti where idutente=$idutente )
			AND classe = 'M' ORDER BY abs(valore) ";
	$Result=mysql_query($MySql);

	while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
		if ( $res['valore'] <0 ) {
			$difetti_m [] = $res;
		} else {
			$pregi_m [] = $res;
		}
	}



	$pregi_s= [];
	$difetti_s= [];

	$MySql="SELECT * FROM pregidifetti_main
			WHERE idpregio NOT IN ( select idpregio from pregidifetti where idutente=$idutente )
			AND classe = 'S' ORDER BY abs(valore) ";
	$Result=mysql_query($MySql);

	while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
		if ( $res['valore'] <0 ) {
			$difetti_s [] = $res;
		} else {
			$pregi_s [] = $res;
		}
	}



	$pregi_x= [];
	$difetti_x= [];

	$MySql="SELECT * FROM pregidifetti_main
			WHERE idpregio NOT IN ( select idpregio from pregidifetti where idutente=$idutente )
			AND classe = 'X' ORDER BY abs(valore) ";
	$Result=mysql_query($MySql);

	while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
		if ( $res['valore'] <0 ) {
			$difetti_x [] = $res;
		} else {
			$pregi_x [] = $res;
		}
	}

	$out = [
		'pregi_f' => $pregi_f,
		'pregi_s' => $pregi_s,
		'pregi_m' => $pregi_m,
		'pregi_x' => $pregi_x,
		'difetti_f' => $difetti_f,
		'difetti_s' => $difetti_s,
		'difetti_m' => $difetti_m,
		'difetti_x' => $difetti_x
	];


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
