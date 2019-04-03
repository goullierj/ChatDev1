<?php
header("Access-Control-Allow-Origin: *");

$contenu = $_POST['contenu'];
$id_user = $_POST['id_user'];

try{
    $db = new PDO('mysql:host=localhost;dbname=chat;charset=utf8', 'root', 'root', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}catch(Exception $exception){
    die('Erreur : ' . $exception->getMessage());
}

session_start();

$reqPrep = $db->prepare("INSERT INTO message (id, id_user, contenu, date) VALUES (default,?,?,now())");
$reqPrep->execute(array($id_user,$contenu));

?>
