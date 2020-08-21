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


	$attributi = [];

	$attributi[] = [ 'idattr' => 1 , 'nomeattr' => 'Forza' ];
	$attributi[] = [ 'idattr' => 2 , 'nomeattr' => 'Destrezza'];
	$attributi[] = [ 'idattr' => 3 , 'nomeattr' => 'Attutimento'];
	$attributi[] = [ 'idattr' => 4 , 'nomeattr' => 'Carisma'];
	$attributi[] = [ 'idattr' => 5 , 'nomeattr' => 'Persuasione'];
	$attributi[] = [ 'idattr' => 6 , 'nomeattr' => 'Saggezza'];
	$attributi[] = [ 'idattr' => 7 , 'nomeattr' => 'Prontezza'];
	$attributi[] = [ 'idattr' => 8 , 'nomeattr' => 'Intelligenza'];
	$attributi[] = [ 'idattr' => 8 , 'nomeattr' => 'Percezione'];




  /*** skill **/

  $skill = [];
  $MySql = "SELECT idskill, nomeskill  FROM skill_main ORDER BY nomeskill" ;
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
    $skill[] =  $res;
  }

	/*** discipline **/

	$discipline = [];
	$MySql = "SELECT iddisciplina, nomedisc  FROM discipline_main ORDER BY nomedisc" ;
	$Result = mysql_query($MySql);
	while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
		$discipline[] =  $res;
	}

	/*** poteri **/

	$poteri = [];
	$MySql = "SELECT idpotere, livellopot, nomepotere  FROM poteri_main ORDER BY iddisciplina , livellopot" ;
	$Result = mysql_query($MySql);
	while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
		$poteri[] =  $res;
	}



  $output = [
		"attributi" => $attributi,
    "skill" => $skill,
		"discipline" => $discipline,
		"poteri" => $poteri
  ];

	header("HTTP/1.1 200 OK");

  $out = json_encode ($output, JSON_UNESCAPED_UNICODE);
  echo $out;






?>
