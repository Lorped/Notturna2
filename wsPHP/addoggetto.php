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

$nomeoggetto = $request -> nomeoggetto;
$descrizione = $request -> descrizione;
$fissomobile = $request -> fissomobile;

$barcode=rand(100000000000,999999999999);

$nomeoggetto = mysql_real_escape_string($nomeoggetto);
$descrizione = mysql_real_escape_string($descrizione);

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $nomeoggetto != ""  ) {

  $MySql = "INSERT INTO oggetti
  (nomeoggetto, descrizione, fissomobile, barcode)
  VALUES
  ('$nomeoggetto', '$descrizione', '$fissomobile', $barcode) ";

  $Result = mysql_query($MySql);

  //die($MySql);

  header("HTTP/1.1 200 OK");

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;


} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
