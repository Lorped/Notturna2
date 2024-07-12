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

include ('db2.inc.php');  //MYSQLI //



$clan = [];
$MySql = "SELECT idclan, nomeclan FROM clan ORDER BY nomeclan";
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
$MySql = "SELECT idstatus, status FROM statuscama ";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$statuscama[] =$res;
}

$skill = [];
$MySql = "SELECT * , 0 as livello FROM skill_main WHERE tipologia = 0 ORDER BY nomeskill";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$skill[] =$res;
}

$attitudini = [];
$MySql = "SELECT * , 0 as livello FROM skill_main WHERE tipologia = 1";
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

$out = [
  "clan" => $clan ,
  "statuscama" => $statuscama ,
  "skill" => $skill ,
	"attitudini" => $attitudini ,
  "sentieri" => $sentieri,
  "taumaturgie" => $taumaturgie,
  "necromanzie" => $necromanzie,
	"background" => $background,
	"disciplinevili" => $disciplinevili
];

header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
