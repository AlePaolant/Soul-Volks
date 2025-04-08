<?php
// Carica PHPMailer
require 'PHPMailer/src/PHPMailer.php'; 
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!isset($_POST['privacy'])) {
        exit("Devi accettare il trattamento dei dati per inviare il modulo.");
    }    

    // Sanitizzazione dei dati
    function sanitize($data) {
        return htmlspecialchars(strip_tags(trim($data)));
    }
    // Recupera i dati dal form
    $tipo = sanitize($_POST['tipo'] ?? 'Non specificato');
    $nome = sanitize($_POST['nome'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $telefono = sanitize($_POST['telefono'] ?? '');
    $sito = sanitize($_POST['sito'] ?? '');
    $note = sanitize($_POST['note'] ?? '');

    // Info specifiche
    $info = '';
    switch ($tipo) {
        case 'sponsor':
            $info = sanitize($_POST['sponsor_info'] ?? '');
            break;
        case 'espositore':
            $info = sanitize($_POST['espositore_info'] ?? '');
            break;
        case 'food':
            $info = sanitize($_POST['food_info'] ?? '');
            break;
        case 'attivita':
            $info = sanitize($_POST['attivita_info'] ?? '');
            break;
        case 'staff':
            $info = sanitize($_POST['staff_info'] ?? '');
            break;
    }

    // Prepara il messaggio
    $body = "
    <h2>Nuova richiesta di partecipazione all'evento</h2>
    <p><strong>Tipo:</strong> $tipo</p>
    <p><strong>Nome attività:</strong> $nome</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Telefono:</strong> $telefono</p>
    <p><strong>Sito/Social:</strong> $sito</p>
    <p><strong>Dettagli specifici:</strong><br>$info</p>
    <p><strong>Note aggiuntive:</strong><br>$note</p>
    ";

    // Invia l'email con PHPMailer
    $mail = new PHPMailer(true);

    try {
        // CONFIGURAZIONE SMTP 
        $mail->isSMTP();
        $mail->Host = 'smtp.aruba.it';
        $mail->SMTPAuth = true;
        $mail->Username = 'support@soulvolks.it';
        $mail->Password = 'SV/modulo23';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Abilita TLS
        $mail->Port = 465; // Porta SMTP

        // Mittente e destinatario
        $mail->setFrom('support@soulvolks.it', 'Webmaster Soul Volks');
        $mail->addAddress('info@soulvolks.it'); // Indirizzo email destinatario
        $mail->addAddress('civico32alessandro@gmail.com'); // Indirizzo email destinatario aggiuntivo
        $mail->addReplyTo($email, $name); // Rispondi all'indirizzo email dell'utente

        // Contenuto
        $mail->isHTML(true);
        $mail->Subject = "MVC25 - Nuova richiesta di partecipazione: $tipo";
        $mail->Body    = $body;

        $mail->send();

        // Messaggio di conferma (puoi fare anche un redirect con header())
        echo "<div style='padding:2rem;font-family:sans-serif;text-align:center;'>
                <h2>Grazie per la tua proposta!</h2>
                <p>Ti contatteremo il prima possibile.</p>
                <a href='matesevolkscamp2025.html'>Torna al sito</a>
            </div>";

    } catch (Exception $e) {
        echo "Errore nell'invio: {$mail->ErrorInfo}";
    }
} else {
    echo 'Metodo di richiesta non valido.';
}
?>
