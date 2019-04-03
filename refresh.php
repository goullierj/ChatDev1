<?php
header("Access-Control-Allow-Origin: *");

try{
    $db = new PDO('mysql:host=localhost;dbname=chat;charset=utf8', 'root', 'root', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}catch(Exception $exception){
    die('Erreur : ' . $exception->getMessage());
}

session_start();

$reqPrep = $db->query("SELECT message.*, user.pseudo, user.color FROM user JOIN message ON user.id = message.id_user ORDER BY date ASC");
$message = $reqPrep->fetchAll();
echo json_encode($message);
