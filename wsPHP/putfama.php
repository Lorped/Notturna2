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
$fama1 = $request -> fama1;
$fama2 = $request -> fama2;
$fama3 = $request -> fama3;

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" ) {

  $MySql = "SELECT fama1, fama2, fama3 FROM personaggio
    WHERE idutente = $idutente ";
  $Result = mysql_query($MySql);

  $res = mysql_fetch_array ($Result);

  $oldfama1 = $res['fama1'];
  $oldfama2 = $res['fama2'];
  $oldfama3 = $res['fama3'];


  if ( $oldfama1 != $fama1 ) {
    $Azione = "Fama in Città a ".$fama1;
  }
  if ( $oldfama2 != $fama2 ) {
    $Azione = "Fama tra i Vampiri a ".$fama2;
  }
  if ( $oldfama3 != $fama3 ) {
    $Azione = "Fama nel Mondo Oscuro a ".$fama3;
  }


  $MySql = "UPDATE  personaggio SET fama1 = '$fama1' ,  fama2 = '$fama2' , fama3 = '$fama3'
    WHERE idutente = $idutente ";
  $Result = mysql_query($MySql);



  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 0 , '$Azione' ) ";
  $Result = mysql_query($MySql);



  if (mysql_errno()) {
    header("HTTP/1.1 403 Forbidden");
    die($MySql);

  } else {

      header("HTTP/1.1 200 OK");

      $out = "OK";
      $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
      echo $out;

  }



} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>