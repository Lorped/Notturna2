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


	include ('./db.inc.php');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$last = $request -> last;



	$MySql = "SELECT count(*) FROM dadi  ";
	$Result = mysql_query($MySql);
	$rs = mysql_fetch_row($Result);
	$status = $rs['0'];

	$out = [];

	if ( $status != 0 ) {

		$MySql = "SELECT * from dadi  WHERE ID > '$last' ORDER BY ID ASC";

		$Result = mysql_query($MySql);
		while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
			if ( $res['ID'] > $last) {
				$last = $res['ID'];
			}
			$out[] =$res;
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
