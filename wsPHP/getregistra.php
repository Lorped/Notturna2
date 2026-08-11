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

require_once __DIR__ . '/db2.inc.php'; //MYSQL //



$clan = [];
$MySql = "SELECT idclan, nomeclan FROM clan where PNG = 0 ORDER BY nomeclan";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$clan[] = $res;
}

$background = [];
$MySql = "SELECT *, 0 as livello FROM background_main ";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$background[] = $res;
}

$statuscama = [];
$MySql = "SELECT idstatus, status, bgbase FROM statuscama ";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$statuscama[] =$res;
}

$skill = [];
$MySql = "SELECT *  FROM skill_main WHERE tipologia = 0 and subskill = 0 ORDER BY nomeskill";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$idskill =$res['idskill'];
	$nomeskill =$res['nomeskill'];
	$subskill = 0;
	$livello = 0;
	$tipologia = 0;
	$susbkill2 = [];

	$MySql2 = "SELECT * , 0 as livello , 0 as max  FROM skill_main WHERE tipologia = 0 and subskill = $idskill ORDER BY nomeskill";
	$Result2 = mysqli_query($db, $MySql2);
	while ( $res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC)   ){
		$susbkill2[] = $res2;
	}


	$skill[] = [
		'idskill' => $idskill,
		'nomeskill' => $nomeskill,
		'livello' => $livello,
		'subskill' => $subskill,
		'tipologia' => $tipologia,
		'subskill2' => $susbkill2
	];
}

$skillother = [];
$MySql = "SELECT * , 0 as livello FROM skill_main WHERE tipologia = 1  ORDER BY nomeskill";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$skillother[] =$res;
}


$attitudini = [];
$MySql = "SELECT * , 0 as livello FROM skill_main WHERE tipologia = 2 ORDER BY nomeskill";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$attitudini[] =$res;
}

$taumaturgie = [];
$MySql = "SELECT * FROM taumaturgie_main ";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$taumaturgie[] =$res;
}

$necromanzie= [];
$MySql = "SELECT * FROM necromanzie_main ";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$necromanzie[] =$res;
}

$sentieri = [];
$MySql = "SELECT * FROM sentieri ";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$sentieri[] =$res;
}

$disciplinevili = [];
$MySql = "SELECT * FROM discipline_main WHERE vili = 1 ";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$disciplinevili[] =$res;
}

$listalds = [];
$MySql = "SELECT * FROM lineedisangue  ";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$listalds[] =$res;
}



$out = [
  "clan" => $clan ,
  "statuscama" => $statuscama ,
  "skill" => $skill ,
  "skillother" => $skillother ,
	"attitudini" => $attitudini ,
  "sentieri" => $sentieri,
  "taumaturgie" => $taumaturgie,
  "necromanzie" => $necromanzie,
	"background" => $background,
	"disciplinevili" => $disciplinevili,
	"listalds" => $listalds
];

header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
