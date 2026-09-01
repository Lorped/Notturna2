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

require_once __DIR__ . '/db2.inc.php'; //MYSQL  //


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$necrotaum = $request -> necrotaum;
$iddisciplina = $request -> iddisciplina;




if ( isset($postdata) && $idutente != "" && $iddisciplina != "" ) {


  if  ($necrotaum == 'N') {
    $mysql = "SELECT principale FROM necromanzie where idutente = $idutente";
    $result = mysqli_query($db, $mysql);
    $principali = [];
    while ($res = mysqli_fetch_array($result)) {
      $principali[] = (int) $res['principale'];
    }
    if (count($principali) >= 3) {
      header("HTTP/1.1 403 Forbidden");
      die("Limite Necromanzie raggiunto");
    }
    if (!in_array(1, $principali, true)) {
      $principale = 1;
    } elseif (!in_array(2, $principali, true)) {
      $principale = 2;
    } else {
      $principale = 3;
    }

    $MySql = "INSERT INTO necromanzie (idutente, idnecro, livello, principale, focus) VALUES
      ($idutente, $iddisciplina, 0, $principale, 0)";
    mysqli_query($db, $MySql);

    $MySql = "SELECT * FROM necromanzie_main  
      WHERE idnecro = $iddisciplina ";
    $Result = mysqli_query($db, $MySql);
    $res = mysqli_fetch_array ($Result);
    $nomedisc = $res['nomenecro'];

  } else {

    $mysql = "SELECT principale FROM taumaturgie where idutente = $idutente";
    $result = mysqli_query($db, $mysql);
    $principali = [];
    while ($res = mysqli_fetch_array($result)) {
      $principali[] = (int) $res['principale'];
    }
    if (count($principali) >= 3) {
      header("HTTP/1.1 403 Forbidden");
      die("Limite Vie Taumaturgiche raggiunto");
    }
    if (!in_array(1, $principali, true)) {
      $principale = 1;
    } elseif (!in_array(2, $principali, true)) {
      $principale = 2;
    } else {
      $principale = 3;
    }
    $MySql = "INSERT INTO taumaturgie (idutente, idtaum, livello, principale, focus) VALUES
      ($idutente, $iddisciplina, 0, $principale, 0)";
      mysqli_query($db, $MySql);

    $MySql = "SELECT * FROM taumaturgie_main  
      WHERE idtaum = $iddisciplina ";
    $Result = mysqli_query($db, $MySql);
    $res = mysqli_fetch_array ($Result);
    $nomedisc = $res['nometaum'];

  }


  $Azione = "ADMIN aggiunta " . $nomedisc.' a 0 ';

  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 0 , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);


  header("HTTP/1.1 200 OK");

  $out = [
    'nomedisc' => $nomedisc,
  ];
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
