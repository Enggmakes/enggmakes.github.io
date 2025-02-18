<?php
// Database connection
$servername = "localhost";
$username = "root"; // Default WAMP user
$password = ""; // Default WAMP password is empty
$database = "automotive_db";
$port=3308; // Your database name

$conn = new mysqli($servername, $username, $password, $database,$port);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $vehicle_type = $_POST["vehicle_type"];
    $model = $_POST["model"];
    $vehicle_number = $_POST["vehicle_number"];
    $customer_contact = $_POST["customer_contact"];
    $appointment_date = $_POST["appointment_date"];
    $sql = "INSERT INTO appointments (vehicle_type, model, vehicle_number, customer_contact, appointment_date)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $vehicle_type, $model, $vehicle_number, $customer_contact, $appointment_date);

    if ($stmt->execute()) {
        echo "<script>window.location.href='paint.html';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>
