<?php
// submit.php

// Utility per rendere "safe" i nomi file/cartella
function slugify($string) {
  $string = strtolower(trim($string));
  $string = preg_replace('/[^a-z0-9-]/', '-', $string);
  $string = preg_replace('/-+/', '-', $string);
  return trim($string, '-');
}

// Dati del form
$nome = $_POST['nome'] ?? '';
$cognome = $_POST['cognome'] ?? '';
$email = $_POST['email'] ?? '';
$telefono = $_POST['telefono'] ?? '';

$titoli = [
  $_POST['titolo1'] ?? '',
  $_POST['titolo2'] ?? '',
  $_POST['titolo3'] ?? '',
  $_POST['titolo4'] ?? ''
];

// Cartella principale per gli upload
$baseDir = __DIR__ . '/uploads';
if (!file_exists($baseDir)) {
  mkdir($baseDir, 0777, true);
}

// Cartella specifica del partecipante
$folderName = slugify($nome . '-' . $cognome);
$userDir = "$baseDir/$folderName";
if (!file_exists($userDir)) {
  mkdir($userDir, 0777, true);
}

// Gestione upload delle foto
for ($i = 0; $i < 4; $i++) {
  $fotoKey = 'foto' . ($i + 1);
  if (isset($_FILES[$fotoKey]) && $_FILES[$fotoKey]['error'] === UPLOAD_ERR_OK) {
    $tmpName = $_FILES[$fotoKey]['tmp_name'];
    $ext = pathinfo($_FILES[$fotoKey]['name'], PATHINFO_EXTENSION);
    $filename = slugify($titoli[$i]) . '.' . $ext;
    move_uploaded_file($tmpName, "$userDir/$filename");
  }
}

// Gestione PDF bonifico
if (isset($_FILES['bonifico']) && $_FILES['bonifico']['error'] === UPLOAD_ERR_OK) {
  $ext = pathinfo($_FILES['bonifico']['name'], PATHINFO_EXTENSION);
  if (strtolower($ext) === 'pdf') {
    move_uploaded_file($_FILES['bonifico']['tmp_name'], "$userDir/bonifico.pdf");
  }
}

// Aggiornamento CSV
$csvFile = __DIR__ . '/iscrizioni.csv';
$csvRow = [
  $nome,
  $cognome,
  $email,
  $telefono,
  date('Y-m-d H:i:s')
];
$fp = fopen($csvFile, 'a');
fputcsv($fp, $csvRow);
fclose($fp);

// Redirect o messaggio finale (o risposta JSON se AJAX)
header('Location: index.html?success=1');
exit;
