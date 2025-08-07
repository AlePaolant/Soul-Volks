<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
error_reporting(E_ALL);

function slugify($string) {
    $string = strtolower(trim($string));
    $string = preg_replace('/[^a-z0-9-]/', '-', $string);
    $string = preg_replace('/-+/', '-', $string);
    return trim($string, '-');
}

$requiredFields = ['nome', 'cognome', 'email', 'telefono', 'privacy', 'regolamento', 'utilizzo'];
foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(["success" => false, "message" => "Campo mancante: $field"]);
        exit;
    }
}

// Bonifico obbligatorio
if (!isset($_FILES['bonifico']) || $_FILES['bonifico']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "message" => "PDF del bonifico mancante o non valido"]);
    exit;
}
$bonificoMime = mime_content_type($_FILES['bonifico']['tmp_name']);
if ($bonificoMime !== 'application/pdf') {
    echo json_encode(["success" => false, "message" => "Il file del bonifico deve essere un PDF"]);
    exit;
}

// Foto
$titoli = [];
$titoliSet = [];
for ($i = 1; $i <= 4; $i++) {
    $titolo = trim($_POST["titolo$i"] ?? '');
    $file = $_FILES["foto$i"] ?? null;

    if ($file && $file['error'] === UPLOAD_ERR_OK) {
        if ($titolo === '') $titolo = "senza titolo $i";

        if (in_array(strtolower($titolo), $titoliSet)) {
            echo json_encode(["success" => false, "message" => "Titoli duplicati: \"$titolo\""]);
            exit;
        }
        $titoliSet[] = strtolower($titolo);

        if (mime_content_type($file['tmp_name']) !== 'image/jpeg') {
            echo json_encode(["success" => false, "message" => "La foto $i non è un JPEG valido"]);
            exit;
        }

        if ($file['size'] > 10 * 1024 * 1024) {
            echo json_encode(["success" => false, "message" => "La foto $i supera i 10MB"]);
            exit;
        }

        $titoli[] = [
            "titolo" => $titolo,
            "file" => $file
        ];
    }
}

if (count($titoli) === 0) {
    echo json_encode(["success" => false, "message" => "Devi caricare almeno una foto"]);
    exit;
}
if (count($titoli) > 4) {
    echo json_encode(["success" => false, "message" => "Massimo 4 foto consentite"]);
    exit;
}

// Salvataggio
$baseDir = __DIR__ . '/uploads';
if (!file_exists($baseDir)) mkdir($baseDir, 0777, true);
$id = uniqid();
$folderName = slugify("{$_POST['nome']}_{$_POST['cognome']}_$id");
$userDir = "$baseDir/$folderName";
if (!mkdir($userDir, 0777, true)) {
    echo json_encode(["success" => false, "message" => "Errore nella creazione della cartella utente"]);
    exit;
}

// Salva foto
foreach ($titoli as $data) {
    $file = $data['file'];
    $titleSlug = slugify($data['titolo']);
    $targetPath = "$userDir/$titleSlug.jpg";
    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        echo json_encode(["success" => false, "message" => "Errore nel salvataggio di una foto"]);
        exit;
    }
}

// Salva bonifico
if (!move_uploaded_file($_FILES['bonifico']['tmp_name'], "$userDir/bonifico.pdf")) {
    echo json_encode(["success" => false, "message" => "Errore nel salvataggio del bonifico"]);
    exit;
}

// CSV
$csvPath = __DIR__ . '/iscrizioni.csv';
$writeHeader = !file_exists($csvPath);
$csvRow = [
    $id,
    $_POST['nome'],
    $_POST['cognome'],
    $_POST['email'],
    $_POST['telefono'],
    $titoli[0]['titolo'] ?? '',
    $titoli[1]['titolo'] ?? '',
    $titoli[2]['titolo'] ?? '',
    $titoli[3]['titolo'] ?? '',
    'bonifico.pdf',
    date('Y-m-d H:i:s')
];
$fp = fopen($csvPath, 'a');
if ($fp) {
    if ($writeHeader) {
        fputcsv($fp, ['id', 'nome', 'cognome', 'email', 'telefono', 'titolo1', 'titolo2', 'titolo3', 'titolo4', 'bonifico', 'data']);
    }
    fputcsv($fp, $csvRow);
    fclose($fp);
} else {
    echo json_encode(["success" => false, "message" => "Errore nella scrittura del CSV"]);
    exit;
}

@include 'telegram.php';
echo json_encode(["success" => true]);