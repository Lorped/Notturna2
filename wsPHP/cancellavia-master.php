<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  }
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  }
  exit(0);
}

require_once __DIR__ . '/db2.inc.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request->idutente;
$necrotaum = $request->necrotaum;
$iddisciplina = $request->iddisciplina;

if (isset($postdata) && $idutente != "" && $iddisciplina != "" && ($necrotaum == 'N' || $necrotaum == 'T')) {
  $tabella = $necrotaum == 'N' ? 'necromanzie' : 'taumaturgie';
  $tabellaMain = $necrotaum == 'N' ? 'necromanzie_main' : 'taumaturgie_main';
  $campoId = $necrotaum == 'N' ? 'idnecro' : 'idtaum';
  $campoNome = $necrotaum == 'N' ? 'nomenecro' : 'nometaum';

  $MySql = "SELECT principale FROM $tabella WHERE idutente = $idutente AND $campoId = $iddisciplina";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array($Result);
  if (!$res) {
    header("HTTP/1.1 404 Not Found");
    exit;
  }

  $MySql = "SELECT count(*) AS conta FROM $tabella WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);
  $resCount = mysqli_fetch_array($Result);
  if ((int) $res['principale'] !== (int) $resCount['conta']) {
    header("HTTP/1.1 403 Forbidden");
    die("Si puo rimuovere solo l'ultima via");
  }

  $MySql = "SELECT $campoNome FROM $tabellaMain WHERE $campoId = $iddisciplina";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array($Result);
  $nomeVia = $res[$campoNome];

  $MySql = "DELETE FROM $tabella WHERE idutente = $idutente AND $campoId = $iddisciplina";
  mysqli_query($db, $MySql);

  $Azione = "ADMIN rimossa " . $nomeVia;
  $Azione = mysqli_real_escape_string($db, $Azione);
  $MySql = "INSERT INTO logpx (idutente, px, Azione) VALUES ($idutente, 0, '$Azione')";
  mysqli_query($db, $MySql);

  header("HTTP/1.1 200 OK");
  echo json_encode('OK', JSON_UNESCAPED_UNICODE);
} else {
  header("HTTP/1.1 401 Unauthorized");
}

?>