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

include ('db2.inc.php'); //MYSQL //

$idutente = $_GET['idutente'];

//$idutente = 133;

$now = time(); // or your date as well

$saldo = 0 ;

$lista = [];

	$MySql = "SELECT * FROM risorse WHERE idutente = $idutente order by dataspesa desc";

	$Result = mysqli_query($db, $MySql);

	while ( $res = mysqli_fetch_array ($Result) ) {

		$spesa = $res['spesa'];

		$dataspesa = strtotime ( $res['dataspesa'] );

		$cadenza = $res['cadenzarecupero'];

		

		$datediff = $now - $dataspesa;

		$giorni = floor($datediff / (60 * 60 * 24));

		$recuperati = floor ( $giorni / $cadenza);

		$itemlista = [
			'data' =>  date('d-m-Y', $dataspesa),
			'spesa' => $spesa,
			'cadenza' => $cadenza,
			'recuperati' => $recuperati
		];

		$lista[] = $itemlista;


		if ( $recuperati > $spesa ) {
			$recuperati = $spesa;
		}


		$saldo = $saldo - $spesa + $recuperati;


		/***
		echo "spesa ".$spesa."<p>";
		echo "dataspesa ".$dataspesa."<p>";
		echo "cadenza ".$cadenza."<p>";
		echo "datediff ".$datediff."<p>";
		echo "giorni ".$giorni."<p>";
		echo "recuperati ".$recuperati."<p>";
		***/

	}



	$out = [
		'saldo' => $saldo ,
		'lista' => $lista
	];


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
