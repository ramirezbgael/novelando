<?php
header("Content-Type: application/json");
$apiKey = getenv('EASYBROKER_API_KEY');
$url = "https://api.easybroker.com/v1/properties?page=" . $_GET['page'];
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["X-Authorization: $apiKey"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
echo curl_exec($ch);
curl_close($ch);
?>
