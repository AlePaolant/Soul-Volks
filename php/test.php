<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['test-email'] ?? '';
    file_put_contents('php://stderr', "Test Email: $email\n");
}
?>
