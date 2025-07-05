<?php
$file = 'conversation.txt';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['reset']) && $data['reset'] === true) {
  file_put_contents($file, "");
  echo json_encode(["status" => "reset"]);
  exit;
}

if (!empty($data['message'])) {
  $timestamp = date('Y-m-d H:i:s');
  $line = "[$timestamp] " . $data['message'] . "\n";
  file_put_contents($file, $line, FILE_APPEND);
  echo json_encode(["status" => "saved"]);
} else {
  echo json_encode(["status" => "no_message"]);
}

