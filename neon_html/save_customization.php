<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "automotive_db";
$port=3308;

$conn = new mysqli($servername, $username, $password, $dbname,$port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $customText = $_POST['customText'];
    $font = $_POST['font'];
    $color = $_POST['color'];
    $price = $_POST['price'];

    $sql = "INSERT INTO custom_signs (custom_text, font, color, price) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $customText, $font, $color, $price);

    if ($stmt->execute()) {
        echo "<script>window.location.href='neon1.html';</script>";
    }else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>
