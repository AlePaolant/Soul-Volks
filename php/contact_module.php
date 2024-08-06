<?php
// Includi i file di PHPMailer
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitizzazione dei dati
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $message = filter_var(trim($_POST['subject']), FILTER_SANITIZE_STRING);

    if ($name && $email && $message) {
        // Configurazione email
        $to = 'info@soulvolks.it, alexpaolantonio@gmail.com'; // Indirizzo email destinatario
        $email_subject = 'Nuovo messaggio dal modulo contatti del tuo sito'; // Soggetto fisso
        $email_body = "Nome: $name\nEmail: $email\n\nMessaggio:\n$message"; // Corpo dell'email

        // Crea un'istanza di PHPMailer
        $mail = new PHPMailer(true);

        try {
            // Configurazione del server SMTP
            $mail->isSMTP();
            $mail->Host       = 'smtp.aruba.it';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'support@soulvolks.it'; // Sostituisci con il tuo indirizzo email
            $mail->Password   = 'SV/modulo23'; // Sostituisci con la tua password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Abilita TLS
            $mail->Port       = 465; // Porta SMTP

            // Impostazioni email
            $mail->setFrom('support@soulvolks.it', 'Webmaster Soul Volks'); // Modifica con il tuo indirizzo email
            $mail->addAddress('info@soulvolks.it'); // Indirizzo email destinatario
            $mail->addAddress('alexpaolantonio@gmail.com'); // Indirizzo email destinatario aggiuntivo
            $mail->addReplyTo($email, $name); // Rispondi all'indirizzo email dell'utente

            // Contenuto dell'email
            $mail->isHTML(false);
            $mail->Subject = $email_subject;
            $mail->Body    = $email_body;

            // Invia l'email
            $mail->send();
            echo 'Grazie per averci contattato. Ti risponderemo al più presto.';
        } catch (Exception $e) {
            echo 'Si è verificato un errore durante l\'invio dell\'email. Riprova più tardi.';
        }
    } else {
        echo 'Per favore, compila tutti i campi correttamente.';
    }
} else {
    echo 'Metodo di richiesta non valido.';
}
?>

