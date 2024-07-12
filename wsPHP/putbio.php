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

include ('db2.inc.php'); // MYSQLI //


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$bio = $request -> bio;
$note = $request -> note;
$urldt = $request -> urldt;

//$nome = "lorenzo";
//$password = "";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" ) {

  $bio = mysqli_real_escape_string ($db, $bio);
  $note = mysqli_real_escape_string ($db, $note);
  $urldt = mysqli_real_escape_string ($db, $urldt);

  $MySql = "UPDATE  personaggio SET bio = '$bio' ,  note = '$note' , urldt = '$urldt'
    WHERE idutente = $idutente ";
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
