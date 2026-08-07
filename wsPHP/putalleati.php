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

require_once __DIR__ . '/db2.inc.php'; // MYSQL //


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$idalleato = $request -> idalleato;
$livello = $request -> livello;
$au = $request -> au;


//$nome = "lorenzo";
//$password = "";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" && $idalleato != "" && isset($livello) ) {

  $MySql = "SELECT nomealleato FROM alleati WHERE idalleato = $idalleato";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array ( $Result);

  $nomealleato = $res ['nomealleato'];


  $Azione = '';

  if ( $livello == 0) {
    $MySql = "DELETE FROM alleati
      WHERE idalleato = $idalleato";
    $Result = mysqli_query($db, $MySql);


    $Azione = "Rimosso alleato ".$nomealleato;
  }


  if ($livello != 0  ) {
    $MySql = "UPDATE alleati SET livello = $livello
      WHERE idalleato = $idalleato";
    $Result = mysqli_query($db, $MySql);

    $Azione = "Alleato ".$nomealleato.' a '.$livello;
  }

  $MySql = "UPDATE personaggio SET xpspesi = xpspesi + 1
    WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);


  if ( $au == 'A') {
    $Azione = 'ADMIN '.$Azione;
  }

  $Azione = mysqli_real_escape_string($db, $Azione);
  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 1 , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);


  $MySql = "SELECT sum(livello) as s FROM alleati
  WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array($Result);
  $somma = $res['s'];

  if ( $somma == 0 ) {
    $MySql = "DELETE FROM background
    WHERE idutente = $idutente AND idback = 88 ";
    $Result = mysqli_query($db, $MySql);
  }
  if ( $somma != 0 AND $somma != 1 ) {
    $MySql = "UPDATE background
    SET livello = $somma
    WHERE idutente = $idutente AND idback = 88 ";
    $Result = mysqli_query($db, $MySql);
  }
  if (  $somma == 1 ) {
    $MySql = "DELETE FROM background
    WHERE idutente = $idutente AND idback = 88 ";
    $Result = mysqli_query($db, $MySql);
    $MySql = " INSERT INTO background (idback, idutente, livello)
      VALUES (88, $idutente, 1 )";
    $Result = mysqli_query($db, $MySql);
  }






  if (mysqli_errno($db)) {
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
