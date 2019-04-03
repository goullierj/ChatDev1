<?php

header("Access-Control-Allow-Origin: *");

$pseudo = $_POST['pseudo'];
$color = $_POST['color'];

try{
    $db = new PDO('mysql:host=localhost;dbname=chat;charset=utf8', 'root', 'root', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}catch(Exception $exception){
    die('Erreur : ' . $exception->getMessage());
}

session_start();

$queryUser = $db ->prepare("SELECT * FROM user WHERE pseudo = :pseudo ");
$result = $queryUser->execute(
    [
        'pseudo' => $pseudo
    ]
);
if ($result === false){
    $message = false;
    echo json_encode($message);
}else{



$reqInsertPrep = $db->prepare("INSERT INTO user (id, pseudo,color) VALUES (default,?,?)");
$reqInsertPrep->execute(array($pseudo,$color));

$reqPrep = $db->prepare("SELECT * FROM user WHERE pseudo = ?");
$reqPrep->execute(array($pseudo));
$result = $reqPrep->fetch();

$_SESSION["user"]= $result;
echo json_encode($_SESSION["user"]);
}
?>
