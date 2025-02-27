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

include ('db2.inc.php'); //MYSQLI//


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" ) {

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


	$Mysql = "INSERT INTO log (log) VALUES ('$testo')";
	mysqli_query($db,$Mysql);

	



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

	$Mysql = "DELETE FROM amalgame  WHERE idutente = $idutente";
	mysqli_query($db, $Mysql);
	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db) );

	




  header("HTTP/1.1 200 OK");

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;



} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
