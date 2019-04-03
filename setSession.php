<?php
/**
 * Created by PhpStorm.
 * User: Mehdi
 * Date: 19/03/2019
 * Time: 01:32
 */

header("Access-Control-Allow-Origin: *");

$contenu = $_POST['contenu'];

$reqPrep = $db->prepare("SELECT * FROM user WHERE pseudo = $pseudo");
$reqPrep->execute(array($pseudo));
$result = $reqPrep->fetch();

$_SESSION["user"]= $result;
echo json_encode($_SESSION["user"]);