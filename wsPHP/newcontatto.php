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

include ('db2.inc.php'); //MYSQLI //


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$nomecontatto = $request -> nomecontatto;
$au = $request -> au;


//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;

$nomecontatto = mysqli_real_escape_string ($db, $nomecontatto);


if ( isset($postdata) && $idutente != "" && $nomecontatto != ""  ) {



  $MySql = "INSERT INTO contatti ( nomecontatto, idutente, livello )
    VALUES ( '$nomecontatto', $idutente , 1 )";
  $Result = mysqli_query($db, $MySql);

  $MySql = "SELECT idcontatto from contatti where idcontatto = last_insert_id() ";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array ($Result);
  $idcontatto = $res ['idcontatto'];

  $MySql = "SELECT * FROM background
  WHERE idutente = $idutente AND idback = 77";
  $Result = mysqli_query($db, $MySql);

  if (mysqli_errno($db)) {
    header("HTTP/1.1 403 Forbidden");
    die($MySql);
  }

  if ( $res = mysqli_fetch_array ($Result) ) {
    $MySql = "UPDATE background SET livello = livello + 1
     WHERE idutente = $idutente AND idback = 77";
    $Result = mysqli_query($db, $MySql);

    if (mysqli_errno($db)) {
      header("HTTP/1.1 403 Forbidden");
      die($MySql);
    }

  } else {
    $MySql = "INSERT INTO background (idback, idutente, livello )
     VALUES ( 77, $idutente , 1)";
    $Result = mysqli_query($db, $MySql);

    if (mysqli_errno($db)) {
      header("HTTP/1.1 403 Forbidden");
      die($MySql);
    }
  }

  if ( $au == 'A') {
    $Azione = 'ADMIN '.$Azione;
  }
  $Azione = "Aggiunto contatto ".$nomecontatto;

  $Azione = mysqli_real_escape_string($db, $Azione);
  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 0 , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);




  header("HTTP/1.1 200 OK");

  $out = "$idcontatto";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;




} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
