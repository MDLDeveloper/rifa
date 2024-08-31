<?php 
header('Content-Type: application/json');
include("recursos.php");
include("sendwhastappaler.php");

// Decodificar el JSON recibido
$data = json_decode(file_get_contents("php://input"));

// Acceder a las propiedades del objeto
$num = $data->num;
$fullname = $data->fullname;
$contact = $data->numtel;
$email = $data->email;

if(is_array($num) && !empty($num)){
    if($rifas->verificarRifas($num)){
        $responce = [];
        foreach($num as $rifa){
            $responce []= $rifas->reservedRifa($rifa, $fullname, $contact, $email);
        }
        if(count($responce) === 0){
            echo json_encode(["error" => "Error al intentar realizar la reserva: No se pudo efectuar cambios"]);
        }else{
            echo json_encode(["successful" => "Se realizó la reserva de " . count($responce) . " rifas."]);
            enviarMensajeWhatsapp($num, $fullname, $contact, $email);
        }
        
    }else{
        echo json_encode(["error" => "Uno o varios numeros ya se encuentran comprados o reservados."]);
    }
}else{
    echo json_encode(["error" => "Error al intentar realizar la reserva: No es lista o es lista vacia."]);
}
?>
