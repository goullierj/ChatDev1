<?php
header("Access-Control-Allow-Origin: *");

try{
    $db = new PDO('mysql:host=localhost;dbname=chat;charset=utf8', 'root', 'root', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}catch(Exception $exception){
    die('Erreur : ' . $exception->getMessage());
}

$queryUser = $db ->query("SELECT * FROM user ORDER BY id DESC");
$user = $queryUser->fetchAll();
echo json_encode($user);
