<?php 
header('Content-Type: application/json');
include("recursos.php");

// Decodificar el JSON recibido
$data = json_decode(file_get_contents("php://input"));

// Acceder a las propiedades del objeto
$num = $data->num;
$fullname = $data->fullname;
$contact = $data->numtel;
$email = $data->email;

// Realizar la compra
$responce = $rifas->reservedRifa($num, $fullname, $contact, $email);

// Verificar el resultado de la compra
if($responce === 0){
    echo json_encode(["error" => "No se pudo realizar la compra de ningun numero"]);
} else if($responce === false){
    echo json_encode(["error" => "Error al intentar realizar la compra"]);
} else {
    echo json_encode(["successful" => "Se realizó la compra de " . $responce . " rifas."]);
}

?>
