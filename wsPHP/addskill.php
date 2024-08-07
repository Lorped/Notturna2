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

include ('db2.inc.php'); //MYSQLI//


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$idskill = $request -> idskill;
$tipolog = $request -> tipologia;
//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" && $idskill != "" ) {

  $MySql = "SELECT * FROM skill_main
    WHERE idskill = $idskill";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array ($Result);
  $nomeskill = $res['nomeskill'];
  $tipologia = $res['tipologia'];

  $MySql = "SELECT livello FROM skill WHERE idskill = $idskill and idutente = $idutente ";
  $Result = mysqli_query($db, $MySql);
  if ( $res = mysqli_fetch_array ($Result) )  {
    $livello = $res['livello'];
    $MySql = "UPDATE skill SET livello = livello + 1
      WHERE idutente = $idutente and idskill = $idskill" ;
    $Result = mysqli_query($db, $MySql);
  } else {
    $livello = 0 ;
    $MySql = "INSERT INTO skill ( idskill, idutente, livello)
      VALUES ( $idskill, $idutente, 1 )" ;
    $Result = mysqli_query($db, $MySql);
  }


  if ( $tipologia == 0 ) {
    $spesapx = ($livello + 1) * 2 ;
  } else {
    $spesapx = ($livello + 1) * 3 ;
  }


  $MySql = "UPDATE personaggio SET xpspesi = xpspesi + $spesapx
    WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);

  $Azione = $nomeskill.' a '.($livello+1); ;

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
