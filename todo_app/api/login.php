<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");
include("../db.php");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $email = $data->email;
    $password = $data->password;

    $query = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row["password"])) {
            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user_id" => $row["id"]
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Invalid password"
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "User not found"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid input"
    ]);
}
?>
