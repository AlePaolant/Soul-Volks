<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Carica PHPMailer
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!isset($_POST['privacy'])) {
        exit("Devi accettare il trattamento dei dati per inviare il modulo.");
    }

    // Sanitizzazione dei dati
    function sanitize($data)
    {
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
    <h2>Nuova richiesta di partecipazione all'evento  <span>&#x2757;</span> <!-- ❗️ --></h2>
    <p> <span>&#x1F3AF;</span> <!-- 🎯 --> <strong>Tipo:</strong> $tipo</p>
    <p> <span>&#x1F3E2;</span> <!-- 🏢 --> <strong>Nome attivita':</strong> $nome</p>
    <p> <span>&#x1F4E7;</span> <!-- 📧 --> <strong>Email:</strong> $email</p>
    <p> <span>&#x1F4DE;</span> <!-- 📞 --> <strong>Telefono:</strong> $telefono</p>
    <p> <span>&#x1F310;</span> <!-- 🌐 --> <strong>Sito/Social:</strong> $sito</p>
    <p> <span>&#x1F4CB;</span> <!-- 📋 --> <strong>Dettagli specifici:</strong><br>$info</p>
    <p> <span>&#x1F4AC;</span> <!-- 💬 --> <strong>Note aggiuntive:</strong><br>$note</p>
    <p> </p>
    <h4> Contenuto generato automaticamente dal modulo sponsorizzazione dell'evento Matese Volks Camp 2025 </h4>
    ";

    // Invia l'email con PHPMailer
    $mail = new PHPMailer(true);

    try {
        // CONFIGURAZIONE SMTP 
        $mail->isSMTP();
        $mail->Host = 'smtps.aruba.it';
        $mail->SMTPAuth = true;
        $mail->Username = 'support@soulvolks.it';
        $mail->Password = 'SV/modulo23';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Abilita TLS
        $mail->Port = 465; // Porta SMTP

        // Mittente e destinatario
        $mail->setFrom('support@soulvolks.it', 'Webmaster Soul Volks');
        $mail->Username = 'support@soulvolks.it';
        $mail->addAddress('info@soulvolks.it'); // Indirizzo email destinatario
        $mail->addAddress('civico32alessandro@gmail.com'); // Indirizzo email destinatario aggiuntivo
        $mail->addReplyTo($email, $nome); // Rispondi all'indirizzo email dell'utente

        // Contenuto
        $mail->isHTML(true);
        $mail->Subject = "MVC25 - Nuova richiesta di partecipazione: $tipo";
        $mail->Body    = $body;

        $mail->send();

        http_response_code(200);
        echo "Messaggio inviato con successo!";
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = 'html';

    } catch (Exception $e) {
        http_response_code(500);
        echo "Errore nell'invio (PHPMailer): {$mail->ErrorInfo} \nEccezione: {$e->getMessage()}";
    }
} else {
    http_response_code(405); // metodo non consentito
    echo 'Metodo non valido.';
}
