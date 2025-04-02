<?php
$servername = "localhost";
$username = "root"; // Change if using another MySQL user
$password = ""; // Change if you set a password
$database = "todo_app";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database Connection Failed!"]));
}
?>
