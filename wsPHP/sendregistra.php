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

$nome = $request -> username;
$password = $request -> password;
$email = $request -> email;

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $nome != "" && $password != "" && $email != "") {

  $nome = mysqli_real_escape_string ($db, $nome);
  $password = mysqli_real_escape_string ($db, $password);
  $email = mysqli_real_escape_string ($db, $email);

  $MySql = "INSERT INTO utente (nome, password, email)
    VALUES ( '$nome' , '$password', '$email') ";
  $Result = mysqli_query($db, $MySql);

  if (mysqli_errno($db)) {
    header("HTTP/1.1 401 Unauthorized");
    die();

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
