<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json");
$apiKey = getenv('EASYBROKER_API_KEY');
if (!$apiKey) {
  // Hardcode for local testing
  $apiKey = 'ajnsdresl4nzgppfi8tlbp4ia93uy3';
}
if (!$apiKey) {
  http_response_code(500);
  echo json_encode(['error' => 'Missing API key']);
  exit;
}

if (isset($_GET['id'])) {
  $url = "https://api.easybroker.com/v1/properties/" . urlencode($_GET['id']);
} else if (isset($_GET['page'])) {
  $url = "https://api.easybroker.com/v1/properties?page=" . urlencode($_GET['page']);
  if (isset($_GET['limit'])) {
    $url .= "&limit=" . urlencode($_GET['limit']);
  }
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Missing parameters']);
  exit;
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["X-Authorization: $apiKey"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpcode);
echo $response;
?>
