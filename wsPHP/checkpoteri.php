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

  $idutente=$_GET['idutente'];


  $numdiscipline = 0;
  $MySql = "SELECT  sum(livello) as somma  FROM discipline
        WHERE idutente = '$idutente'
				AND iddisciplina != 98 and iddisciplina != 99";
  $Result = mysql_query($MySql);
  $res = mysql_fetch_array($Result,MYSQL_ASSOC);
  $numdiscipline = $res ['somma'];


  $poteri = 0 ;
  $MySql = "SELECT count(*) as numero FROM poteri
		WHERE idutente = '$idutente'";
  $Result = mysql_query($MySql);
  $res = mysql_fetch_array($Result,MYSQL_ASSOC);
  $poteri =  $res['numero'];

	$output = $numdiscipline - $poteri ;

	header("HTTP/1.1 200 OK");

  $out = json_encode ($output, JSON_UNESCAPED_UNICODE);
  echo $out;


?>
