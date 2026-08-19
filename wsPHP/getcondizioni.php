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




  require_once __DIR__ . '/db2.inc.php'; //MYSQL//


	$attributi = [];

	$attributi[] = [ 'idattr' => 1 , 'nomeattr' => 'Forza' ];
	$attributi[] = [ 'idattr' => 2 , 'nomeattr' => 'Destrezza'];
	$attributi[] = [ 'idattr' => 3 , 'nomeattr' => 'Attutimento'];
	$attributi[] = [ 'idattr' => 4 , 'nomeattr' => 'Carisma'];
	$attributi[] = [ 'idattr' => 5 , 'nomeattr' => 'Persuasione'];
	$attributi[] = [ 'idattr' => 6 , 'nomeattr' => 'Saggezza'];
	$attributi[] = [ 'idattr' => 7 , 'nomeattr' => 'Prontezza'];
	$attributi[] = [ 'idattr' => 8 , 'nomeattr' => 'Intelligenza'];
	$attributi[] = [ 'idattr' => 9 , 'nomeattr' => 'Percezione'];




  /*** skill **/

  $skill = [];
  $MySql = "SELECT idskill, nomeskill  FROM skill_main 
  	WHERE (tipologia=0 ) and subskill=0 ORDER BY nomeskill" ;
  $Result = mysqli_query($db, $MySql);
  while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$xidskill = $res['idskill'];
	$xnomeskill = $res['nomeskill'];

	$subskill2 = [];
	
	$Mysql2 = "SELECT idskill, nomeskill  FROM skill_main
	where subskill = $xidskill ORDER BY nomeskill" ;
	$Result2 = mysqli_query($db, $Mysql2);
	while ( $res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC)   ) {	
		$subskill2[] =  $res2;
	}
	$skill[] = [
		'idskill' => $xidskill,
		'nomeskill' => $xnomeskill,
		'subskill2' => $subskill2
	];	
  }

  $otherskill = [];
  $MySql = "SELECT idskill, nomeskill  FROM skill_main 
  	WHERE (tipologia=1 ) ORDER BY nomeskill" ;
  $Result = mysqli_query($db, $MySql);
  while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$otherskill[] =  $res;
  }

	/*** discipline **/

	$discipline = [];
	$MySql = "SELECT iddisciplina, nomedisc  FROM discipline_main ORDER BY nomedisc" ;
	$Result = mysqli_query($db, $MySql);
	while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
		$discipline[] =  $res;
	}

	/*** poteri **/

	$poteri = [];
	$MySql = "SELECT idpotere, livellopot, nomepotere  FROM poteri_main ORDER BY iddisciplina , livellopot" ;
	$Result = mysqli_query($db, $MySql);
	while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
		$poteri[] =  $res;
	}



  $output = [
	"attributi" => $attributi,
   	"skill" => $skill,
	"otherskill" => $otherskill,
	"discipline" => $discipline,
	"poteri" => $poteri
  ];

	header("HTTP/1.1 200 OK");

  $out = json_encode ($output, JSON_UNESCAPED_UNICODE);
  echo $out;






?>
