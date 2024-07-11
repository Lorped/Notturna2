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

include ('db2.inc.php'); // mysql//


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$attributo = $request -> attributo;

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" && $attributo != "" ) {

	$MySql = "SELECT $attributo as aa FROM personaggio
    WHERE idutente =  $idutente" ;
	$Result = mysqli_query($db, $MySql);

  $res = mysqli_fetch_array($Result);

  $livello = $res['aa'];
  $newlivello = $res['aa'] + 1;

  $spesapx = $newlivello * 2;

  $MySql = "UPDATE personaggio SET $attributo = $livello + 1
    WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);

  $MySql = "UPDATE personaggio SET xpspesi = xpspesi + $spesapx
    WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);

  $Azione = $attributo . ' a ' . $newlivello ;

  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, -$spesapx , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);
  

  header("HTTP/1.1 200 OK");

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
