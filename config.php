<?php
// Cargar .env
$env = parse_ini_file(__DIR__ . '/.env');

// Definir variables globales
foreach ($env as $key => $value) {
    $_ENV[$key] = $value;
}

