<?php
// Reçoit JSON depuis JS
$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$password = $data['password'];

// À adapter selon ta base
$pdo = new PDO("mysql:host=localhost;dbname=test", "root", "");

$stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->execute([$username, $password]);

echo json_encode(["status" => "ok"]);
