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


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" ) {

	$Mysql = "SELECT count(*) AS a FROM personaggio WHERE idutente = $idutente";
	$Res = mysql_fetch_array(mysql_query($Mysql));

	$numscheda = $Res['a'];

	$Mysql = "SELECT count(*) AS a FROM HUNTERpersonaggio WHERE idutente = $idutente";
	$Res = mysql_fetch_array(mysql_query($Mysql));

	$numschedaH = $Res['a'];

	if ( $numscheda != 0 )  {   // VAMPIRO !!

    $Mysql = "DELETE FROM personaggio WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM background WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM discipline WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM taumaturgie WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM necromanzie WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM background WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM skill WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM contatti WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM logpx WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM pregidifetti WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM rituali_t WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM rituali_n WHERE idutente = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM rubrica WHERE owner = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM legami WHERE target = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM legami WHERE domitor = $idutente";
   	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM poteri WHERE idutente = $idutente";
  	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  	$Mysql = "DELETE FROM logpx  WHERE idutente = $idutente";
  	mysql_query($Mysql);
  	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

	}

	if ( $numschedaH != 0 )  {   // CACCIATORE !!
	   $Mysql = "DELETE FROM HUNTERpersonaggio WHERE idutente = $idutente";
	 	mysql_query($Mysql);
		if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

		$Mysql = "DELETE FROM HUNdiscipline WHERE idutente = $idutente";
	 	mysql_query($Mysql);
		if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

		$Mysql = "DELETE FROM background WHERE idutente = $idutente";
	 	mysql_query($Mysql);
		if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

		$Mysql = "DELETE FROM skill WHERE idutente = $idutente";
	 	mysql_query($Mysql);
		if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

		$Mysql = "DELETE FROM logpx  WHERE idutente = $idutente";
		mysql_query($Mysql);
		if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

		$Mysql = "DELETE FROM contatti WHERE idutente = $idutente";
	 	mysql_query($Mysql);
		if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

		$Mysql = "DELETE FROM rubrica WHERE owner = $idutente";
	 	mysql_query($Mysql);
		if (mysql_errno()) die ( mysql_errno().": ".mysql_error() );

  }


  header("HTTP/1.1 200 OK");

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;



} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
