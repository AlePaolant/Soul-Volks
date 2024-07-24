<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recaptcha_secret = 'YOUR_SECRET_KEY';
    $recaptcha_response = $_POST['g-recaptcha-response'];

    // Verifica il reCAPTCHA
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptcha_secret&response=$recaptcha_response");
    $responseKeys = json_decode($response, true);

    if(intval($responseKeys["success"]) !== 1) {
        echo 'reCAPTCHA non valido. Per favore, riprova.';
    } else {
        // Verifica email
        if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $user_email = $_POST['email'];

            // Invia una email al tuo indirizzo
            $to = 'tuoindirizzo@example.com';
            $subject = 'DOWNLOAD MODULO ISCRIZIONE DAL SITO';
            $message = $user_email . ' ha scaricato il modulo di iscrizione al tuo club!';
            $headers = 'From: webmaster@example.com' . "\r\n" .
                       'Reply-To: webmaster@example.com' . "\r\n" .
                       'X-Mailer: PHP/' . phpversion();

            mail($to, $subject, $message, $headers);

            // Se tutto è valido, invia il PDF
            $file = 'path/to/your/file.pdf';
            header('Content-Type: application/pdf');
            header('Content-Disposition: attachment; filename="'.basename($file).'"');
            header('Content-Length: ' . filesize($file));
            readfile($file);
            exit;
        } else {
            echo 'Email non valida.';
        }
    }
} else {
    echo 'Metodo di richiesta non valido.';
}
?>
