<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Funzione per il rate limiting
    function isRateLimited($ip) {
        $file = 'rate_limit.txt'; // Nome del file per il rate limiting
        $max_requests = 5; // Numero massimo di richieste
        $time_window = 3600; // Finestra di tempo in secondi (1 ora)

        if (!file_exists($file)) {
            return false;
        }

        $requests = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $current_time = time();
        $filtered_requests = array_filter($requests, function($timestamp) use ($current_time, $time_window) {
            return ($current_time - $timestamp) < $time_window;
        });

        if (count($filtered_requests) >= $max_requests) {
            return true;
        }

        // Aggiorna il file con il timestamp attuale
        file_put_contents($file, array_merge($filtered_requests, [$current_time]));
        return false;
    }

    $user_ip = $_SERVER['REMOTE_ADDR'];

    if (isRateLimited($user_ip)) {
        echo 'Hai superato il numero massimo di richieste. Riprova più tardi.';
        exit;
    }

    // Ottieni i dati del modulo
    $email = $_POST['email'] ?? '';
    $accept = isset($_POST['accept']); // Checkbox può essere 'on' o non presente

    // Verifica email e checkbox
    if (filter_var($email, FILTER_VALIDATE_EMAIL) && $accept) {
        $user_email = $email;

        // Invia una email al tuo indirizzo
        $to = 'alexpaolantonio@gmail.com';
        $subject = 'DOWNLOAD MODULO ISCRIZIONE DAL SITO';
        $message = $user_email . ' ha scaricato il modulo di iscrizione al tuo club!';
        $headers = 'From: support@soulvolks.it' . "\r\n" .
                   'Reply-To: suport@soulvolks.it' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $message, $headers);

        // Se tutto è valido, invia il PDF
        $file = '../docs/MODULO-ISCRIZIONE-SOUL-VOLKS.pdf';
        if (file_exists($file) && filesize($file) > 0) { // Controllo dimensione file
            header('Content-Description: File Transfer');
            header('Content-Type: application/pdf');
            header('Content-Disposition: attachment; filename="'.basename($file).'"');
            header('Content-Length: ' . filesize($file));
            readfile($file);
            
            // Apri e invia il file
            $fileResource = fopen($file, 'rb');
            if ($fileResource) {
                fpassthru($fileResource);
                fclose($fileResource);
            } else {
                echo 'Impossibile aprire il file.';
            }
            exit;
        } else {
            echo 'Il file non esiste o è vuoto.';
        }
    } else {
        echo 'Email non valida o devi accettare i termini.';
    }
} else {
    echo 'Metodo di richiesta non valido.';
}
?>
