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

include ('db2.inc.php'); // MYSQL //



	$MySql="SELECT segreteria.idutente, personaggio.nomeplayer, personaggio.nomepg , utente.email, segreteria.eventi, personaggio.xp, segreteria.eventodata , segreteria.saldo
		FROM segreteria
		left join personaggio on segreteria.idutente = personaggio.idutente
		left join utente on segreteria.idutente = utente.idutente
		order by personaggio.nomeplayer ASC";
		//order by segreteria.eventodata DESC";
	$Result=mysqli_query($db, $MySql);

	$eventi = [];

	while ( $res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {

		$eventi [] = $res ;
	}


header("HTTP/1.1 200 OK");
echo json_encode ($eventi, JSON_UNESCAPED_UNICODE);

?>
