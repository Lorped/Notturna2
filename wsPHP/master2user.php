<?

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


	include ('./db2.inc.php');  //MYSQLI //

	include ('../../ionicPHP/messaggi.inc.php');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$destinatario = $request -> destinatario;
	$testo = $request -> testo;

	$testo = mysqli_real_escape_string($db, $testo);

		$MySql = "INSERT  INTO dadi  (idutente,  nomepg, Ora, Testo, Destinatario)
		VALUES ( 0 , 'NARRAZIONE', NOW(), '$testo' , $destinatario ) ";

		mysqli_query($db, $MySql);


		master2user($destinatario,$testo);



	$out = "OK";

  header("HTTP/1.1 200 OK");

	echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
