<?php

require_once("countries.php");

$countries = getCountries();

$phrase = "";

if(isset($_GET['phrase'])) {
	$phrase = $_GET['phrase'];
}

$found_countries = array();

foreach ($countries as $key => $country) {

	if ($phrase == "" || stristr($country, $phrase) != false) {
		array_push($found_countries	, $country);
	}
}

$json = '[';

foreach($found_countries as $key => $country) {
	$json .= '{"name": "' . $country . '"}';

	if ($country !== end($found_countries)) {
		$json .= ',';	
	}
}

$json .= ']';


header('Content-Type: application/json');
echo $json;

?>
