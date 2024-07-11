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


	include ('./db2.inc.php'); //MYSQL//

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$last = $request -> last;



	$MySql = "SELECT count(*) FROM dadi  ";
	$Result = mysqli_query($db, $MySql);
	$rs = mysqli_fetch_row($Result);
	$status = $rs['0'];

	$out = [];

	if ( $status != 0 ) {

		$MySql = "SELECT * from dadi  WHERE ID > '$last' ORDER BY ID ASC";

		$Result = mysqli_query($db, $MySql);
		while ( $res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
			if ( $res['ID'] > $last) {
				$last = $res['ID'];
			}

			if ( $res['Destinatario'] != 0 && ($res['idutente'] != $res['Destinatario'])  ) {
				$id = $res['Destinatario'];
				$MySql2 = "SELECT nomepg FROM personaggio where idutente = $id ";
				$Result2 = mysqli_query($db, $MySql2);
				$res2 = mysqli_fetch_array($Result2);
				$res['Destinatario'] = $res2['nomepg'];
			}

			$date = strtotime($res['Ora']);
			$res['Ora'] = date('H:i', $date);

			$out[] = $res;
		}
	}


	$newout = [
		"Statuschat" => $status ,
		"Listachat" => $out ,
		"Last" => $last
	];

  header("HTTP/1.1 200 OK");

	echo json_encode ($newout, JSON_UNESCAPED_UNICODE);

?>
