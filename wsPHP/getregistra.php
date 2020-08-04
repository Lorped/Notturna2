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



$clan = [];
$MySql = "SELECT idclan, nomeclan FROM clan ORDER BY nomeclan";
$Result = mysql_query($MySql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$clan[] = $res;
}

$background = [];
$MySql = "SELECT *, 0 as livello FROM background_main ";
$Result = mysql_query($MySql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$background[] = $res;
}

$statuscama = [];
$MySql = "SELECT idstatus, status FROM statuscama ";
$Result = mysql_query($MySql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$statuscama[] =$res;
}

$skill = [];
$MySql = "SELECT * FROM skill_main ";
$Result = mysql_query($MySql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$skill[] =$res;
}

$taumaturgie = [];
$MySql = "SELECT * FROM taumaturgie_main ";
$Result = mysql_query($MySql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$taumaturgie[] =$res;
}

$necromanzie= [];
$MySql = "SELECT * FROM necromanzie_main ";
$Result = mysql_query($MySql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$necromanzie[] =$res;
}

$sentieri = [];
$MySql = "SELECT * FROM sentieri ";
$Result = mysql_query($MySql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$sentieri[] =$res;
}

$disciplinevili = [];
$MySql = "SELECT * FROM discipline_main WHERE vili = 1 ";
$Result = mysql_query($MySql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$disciplinevili[] =$res;
}

$out = [
  "clan" => $clan ,
  "statuscama" => $statuscama ,
  "skill" => $skill ,
  "sentieri" => $sentieri,
  "taumaturgie" => $taumaturgie,
  "necromanzie" => $necromanzie,
	"background" => $background,
	"disciplinevili" => $disciplinevili
];

header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
