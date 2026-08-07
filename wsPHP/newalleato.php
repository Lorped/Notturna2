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

if (!is_object($request)) {
  header("HTTP/1.1 400 Bad Request");
  exit;
}

$idutente = isset($request->idutente) ? $request->idutente : null;
$nomealleato = isset($request->nomealleato) ? $request->nomealleato : null;
$au = isset($request->au) ? $request->au : null;

$nomealleato = mysqli_real_escape_string ($db, $nomealleato);


if ( !empty($postdata) && !empty($idutente) && !empty($nomealleato)  ) {



  $MySql = "INSERT INTO alleati ( nomealleato, idutente, livello )
    VALUES ( '$nomealleato', $idutente , 1 )";
  $Result = mysqli_query($db, $MySql);

  $MySql = "SELECT idalleato from alleati where idalleato = last_insert_id() ";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array ($Result);
  $idalleato = $res ['idalleato'];

  $MySql = "SELECT * FROM background
  WHERE idutente = $idutente AND idback = 88";
  $Result = mysqli_query($db, $MySql);

  if (mysqli_errno($db)) {
    header("HTTP/1.1 403 Forbidden");
    die($MySql);
  }

  if ( $res = mysqli_fetch_array ($Result) ) {
    $MySql = "UPDATE background SET livello = livello + 1
     WHERE idutente = $idutente AND idback = 88";
    $Result = mysqli_query($db, $MySql);

    if (mysqli_errno($db)) {
      header("HTTP/1.1 403 Forbidden");
      die($MySql);
    }

  } else {
    $MySql = "INSERT INTO background (idback, idutente, livello )
     VALUES ( 88, $idutente , 1)";
    $Result = mysqli_query($db, $MySql);

    if (mysqli_errno($db)) {
      header("HTTP/1.1 403 Forbidden");
      die($MySql);
    }
  }

  $MySql = "UPDATE personaggio SET xpspesi = xpspesi + 1
    WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);

  $Azione = "Aggiunto alleato ".$nomealleato;
  if ( $au == 'A') {
    $Azione = 'ADMIN '.$Azione;
  }

  $Azione = mysqli_real_escape_string($db, $Azione);
  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 1 , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);




  header("HTTP/1.1 200 OK");

  $out = "$idalleato";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;




} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
