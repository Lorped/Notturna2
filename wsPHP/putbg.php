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


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$idback = $request -> idback;
$livello = $request -> livello;
$au = $request -> au;


//$nome = "lorenzo";
//$password = "";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" && $idback != "" && isset($livello) ) {

  $MySql = "SELECT nomeback FROM background_main WHERE idback = $idback";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array ( $Result);

  $nomeback = $res ['nomeback'];


  if ( $livello == 0) {
    $MySql = "DELETE FROM background
      WHERE idback = $idback AND idutente = $idutente";
    $Result = mysqli_query($db, $MySql);


    $Azione = "Rimosso BG ".$nomeback;
  }

  if ( $livello == 1 ) {
    $MySql = "SELECT * FROM background
      WHERE idback = $idback AND idutente = $idutente";
    $Result = mysqli_query($db, $MySql);
    if ( $res = mysqli_fetch_array($Result) ) {

      $MySql2 = "UPDATE background SET livello = 1
        WHERE idback = $idback and idutente = $idutente";
      $Result2 = mysqli_query($db, $MySql2);

    } else {

      $MySql2 = "INSERT INTO background (idback, idutente, livello)
        VALUES ( $idback, $idutente, 1)";
      $Result2 = mysqli_query($db, $MySql2);

    }

    $Azione = "BG ".$nomeback.' a 1';

  }

  if ($livello != 0 && $livello != 1 ) {
    $MySql = "UPDATE background SET livello = $livello
      WHERE idback = $idback and idutente = $idutente";
    $Result = mysqli_query($db, $MySql);

    $Azione = "BG ".$nomeback.' a '.$livello;
  }




  if ( $au == 'A') {
    $Azione = 'ADMIN '.$Azione;
  }

  $Azione = mysqli_real_escape_string($db, $Azione);
  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 0 , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);



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
