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
$fdv = $request -> fdv;
$sentiero = $request -> sentiero;
$au = $request -> au;


//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" ) {

  if ( $sentiero == -1 )   {

    $MySql = "UPDATE personaggio
      SET fdvmax = $fdv , fdv = $fdv
      WHERE idutente = $idutente ";
    $Result = mysql_query($MySql);

    $Azione = "FDV a  ".$fdv;
    if ( $au == 'A') {
      $Azione = 'ADMIN '.$Azione;
    }
    $MySql = "INSERT INTO logpx (idutente, px, Azione )
      VALUES ( $idutente, 0 , '$Azione' ) ";
    $Result = mysql_query($MySql);

  }

  if ( $fdv == -1 )   {

    $MySql = "UPDATE personaggio
      SET valsentiero = $sentiero
      WHERE idutente = $idutente ";
    $Result = mysql_query($MySql);

    $Azione = "Valore sentiero a  ".$sentiero;
    if ( $au == 'A') {
      $Azione = 'ADMIN '.$Azione;
    }
    $MySql = "INSERT INTO logpx (idutente, px, Azione )
      VALUES ( $idutente, 0 , '$Azione' ) ";
    $Result = mysql_query($MySql);

  }


      header("HTTP/1.1 200 OK");

      $out = "OK";
      $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
      echo $out;





} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
