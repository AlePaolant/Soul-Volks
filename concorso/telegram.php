<?php
$token = '7730776381:AAG1kvBlS1lCblk3bnkOTWa548bHRh_vFA8';
$chat_id = '120414788';

$nome = $_POST['nome'] ?? 'Nome';
$cognome = $_POST['cognome'] ?? 'Cognome';
$email = $_POST['email'] ?? '';
$fotoCount = 0;
for ($i = 1; $i <= 4; $i++) {
    if (!empty($_POST["titolo$i"])) $fotoCount++;
}

// Conta righe nel file CSV (meno 0 se vuoto, o -1 se prima riga è intestazione)
$csvPath = __DIR__ . '/iscrizioni.csv';
$righe = file_exists($csvPath) ? count(file($csvPath)) : 0;
$righe = $righe-1;

$msg = "📸 Nuova iscrizione\n"
     . "👤 $nome $cognome\n"
     . "📧 $email\n"
     . "🖼️ Foto caricate: $fotoCount\n"
     . "📄 Bonifico: ✅\n"
     . "📊 Totale iscrizioni: $righe";

$url = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" . urlencode($msg);
file_get_contents($url);