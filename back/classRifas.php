<?php 
class Rifas {
    private $connectionDB;    
    
    public function __construct($connectionDB) {
        $this->connectionDB = $connectionDB;
    }

    // Actualiza las rifas cuya selección es mayor a 5 minutos
    public function updateStatusRifa(){
        $dateTime = new DateTime('now', new DateTimeZone('America/Argentina/Buenos_Aires'));
        $query = "UPDATE rifas SET timeselect = NULL, stat = 2 WHERE TIMESTAMPDIFF(MINUTE, timeselect, '".$dateTime->format("Y-m-d H:i:s")."') > 10";
        $this->connectionDB->enviarConsulta($query);
    }

    // Obtiene todas las rifas, actualizando los estados antes
    public function getRifas(){
        $this->updateStatusRifa();
        $query = "SELECT * FROM rifas";
        $response = $this->connectionDB->enviarConsulta($query);
        return $response;
    }

    // Cambia el estado de una rifa específica
    public function changeStatusRifa($number, $status){
        if($status == 2){
            $query = "UPDATE rifas SET stat = $status, timeselect = NULL WHERE num = $number";
        } elseif($status == 3) {
            $dateTime = new DateTime('now', new DateTimeZone('America/Argentina/Buenos_Aires'));
            $timeselect = $dateTime->format("Y-m-d H:i:s");
            $query = "UPDATE rifas SET stat = $status, timeselect = '$timeselect' WHERE num = $number";
        }
        $response = $this->connectionDB->enviarConsulta($query);
        return $response;
    }

    // Realiza la reserva de una rifa, actualizando los detalles
    public function reservedRifa($number, $fullname, $contact, $email){
        $dateTime = new DateTime('now', new DateTimeZone('America/Argentina/Buenos_Aires'));
        $timebuy = $dateTime->format("Y-m-d H:i:s");
        $query = "UPDATE rifas SET stat = 4, timebuy = '$timebuy', timeselect = NULL, fullname = '$fullname', contact = '$contact', email = '$email' WHERE num = $number";
        $response = $this->connectionDB->enviarConsulta($query);
        return $response;
    }

    public function comprarRifa($number, $fullname, $contact, $email){
        $dateTime = new DateTime('now', new DateTimeZone('America/Argentina/Buenos_Aires'));
        $timebuy = $dateTime->format("Y-m-d H:i:s");
        $query = "UPDATE rifas SET stat = 1, timebuy = '$timebuy', timeselect = NULL, fullname = '$fullname', contact = '$contact', email = '$email' WHERE num = $number";
        $response = $this->connectionDB->enviarConsulta($query);
        return $response;
    }

    // Realiza la compra de una rifa
    public function buyRifa($number){
        $query = "UPDATE rifas SET stat = 1 WHERE num = $number";
        $response = $this->connectionDB->enviarConsulta($query);
        return $response;
    }

    public function verificarRifas($numbers){
        $numbersList = implode(',', $numbers);
        $query = "SELECT num FROM rifas WHERE num IN ($numbersList) AND stat IN (1, 4)";
        $response = $this->connectionDB->enviarConsulta($query);
        return empty($response);
    }

    public function confirmarReserva($number){
        $query = "UPDATE rifas SET stat = 1 WHERE num = $number";
        $response = $this->connectionDB->enviarConsulta($query);
        return $response;
    }

    public function cancelarReserva($number){
        $query = "UPDATE rifas SET stat = 2, timebuy = NULL, timeselect = NULL, fullname = NULL, contact = NULL, email = NULL WHERE num = $number";
        $response = $this->connectionDB->enviarConsulta($query);
        return $response;
    }
}
?>