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
$idtaum = $request -> idtaum;

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" && $idtaum != "" ) {

  $MySql = "SELECT * FROM taumaturgie
    LEFT JOIN taumaturgie_main on taumaturgie.idtaum = taumaturgie_main.idtaum
  WHERE taumaturgie.idtaum = $idtaum AND idutente = $idutente";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array($Result);

  $livello = $res['livello'];
  $newlivello = $res['livello'] + 1;
  $nometaum = $res['nometaum'];
  $principale = $res['principale'];

  $spesapx = $newlivello * 2;

  $MySql = "UPDATE taumaturgie SET livello = livello + 1
    WHERE idtaum = $idtaum AND idutente = $idutente";
  $Result = mysqli_query($db, $MySql);

  $MySql = "UPDATE personaggio SET xpspesi = xpspesi + $spesapx
    WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);

  $Azione = $nometaum . ' a ' . $newlivello ;

  $Azione = mysqli_real_escape_string($db, $Azione);
  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, -$spesapx , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);

  if ( $principale == 1 ) {
    $MySql = "UPDATE discipline SET livello = livello +1
      WHERE iddisciplina = 98 and idutente = $idutente";
      $Result = mysqli_query($db, $MySql);
  }


  header("HTTP/1.1 200 OK");

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
