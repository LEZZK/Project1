<?php
$host = 'db.ntzvhpchywccckfvipkb.supabase.co';
$port = '5432';
$dbname = 'postgres';  
$user = 'postgres';
$password = '[rpbkxBOa0hcahwpf]'; 

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conectado ao Supabase!";
} catch (PDOException $e) {
    die("Erro ao conectar: " . $e->getMessage());
}



?>