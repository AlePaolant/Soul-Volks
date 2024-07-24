<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);

    if ($name && $email && $subject) {
        $to = 'tuoindirizzo@example.com';
        $email_subject = 'Nuovo Contatto: ' . $subject;
        $email_body = "Nome: $name\nEmail: $email\nOggetto: $subject";
        $headers = 'From: webmaster@example.com' . "\r\n" .
                   'Reply-To: webmaster@example.com' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        mail($to, $email_subject, $email_body, $headers);

        echo 'Grazie per averci contattato. Ti risponderemo al più presto.';
    } else {
        echo 'Per favore, compila tutti i campi correttamente.';
    }
} else {
    echo 'Metodo di richiesta non valido.';
}
?>
