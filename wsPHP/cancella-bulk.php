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

require_once __DIR__ . '/db2.inc.php'; //MYSQLI//





$listautenti = [ 3, 5 , 92 , 97 , 98 , 99, 113 , 175, 176, 193, 228, 229,278, 279,280, 282, 283, 284,
285, 286, 296, 298, 320, 321,323,324,325, 326, 331,333,334,337,342,345,348,356,357,
 24203, 24217, 24221, 24225, 24226, 24227, 24228, 24229, 24234, 24237, 24239, 24241, 24242,
 24249, 24251, 25252, 24254, 24255, 24257, 24258, 24259, 24260,
 24262, 24264, 3040002 ,
 30400006, 30400009, 3040013, 3040016, 3040019, 3040020, 3040025, 3040027, 3040028, 3040029, 3040032, 3040035, 3040037, 3040038,
 3040041, 3040045, 3040047, 3040048, 3040049, 3040051, 3040053 ,
 3040054, 3040058, 3040059, 3040060, 3040062, 3040063, 3040064,
 3040065, 3040066, 3040067, 3040068, 3040069, 3040070, 3040071, 3040072, 3040075, 3040077,
 3040079, 3040081, 3040082, 3040083, 3040085, 3040087, 3040089, 3040090, 3040091 ];

foreach ( $listautenti as $idutente ) {

	echo "canc-". $idutente . "<br>";


	$Mysql = "SELECT *  FROM personaggio WHERE idutente = $idutente";
	$res = mysqli_fetch_array(mysqli_query($db, $Mysql));

	$testo = "Cancellazione PG: " . $res['nomepg'] . " di: " . $res['nomeplayer'] . ".";

	$testo = $testo. " PXT alla data: ".$res['xp'] . " .";

	$Mysql = "SELECT *  FROM segreteria WHERE idutente = $idutente";
	if ( $res = mysqli_fetch_array(mysqli_query($db, $Mysql)) ) {

		$testo = $testo. " Eventi alla data: ".$res['eventi'] . " .";

	} else {
		// nessun evento
		$testo = $testo. " Eventi alla data: 0 .";
	}
	$testo=mysqli_real_escape_string ($db , $testo);




	



    $Mysql = "DELETE FROM personaggio WHERE idutente = $idutente";
   	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM background WHERE idutente = $idutente";
   	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM discipline WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM taumaturgie WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM necromanzie WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM background WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM skill WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM contatti WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );
  	
	$Mysql = "DELETE FROM logpx WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM pregidifetti WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM rituali_t WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );
  	
	$Mysql = "DELETE FROM rituali_n WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM rubrica WHERE owner = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM legami WHERE target = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM legami WHERE domitor = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM poteri WHERE idutente = $idutente";
  	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

  	$Mysql = "DELETE FROM logpx  WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
  	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );


	$Mysql = "DELETE FROM alleati  WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );


}

  header("HTTP/1.1 200 OK");

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;


?>
