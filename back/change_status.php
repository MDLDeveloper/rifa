<?php
header('Content-Type: application/json');
include("recursos.php");

$data = json_decode(file_get_contents("PHP://input"));
$num = $data->num;
$stat = $data->stat;
if ($stat){
    $rifas->changeStatusRifa($num, 3);
}else{
    $rifas->changeStatusRifa($num, 2);
}
?>