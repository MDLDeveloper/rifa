<?php 
class Rifas {
    private $connectionDB;    
    
    public function __construct($connectionDB) {
        $this->connectionDB = $connectionDB;
    }

    public function updateStatusRifa(){}

    public function getRifas(){
        $this->updateStatusRifa();
        $query = "SELECT * FROM rifas";
        $responce = $this->connectionDB->enviarConsulta($query);
        return $responce;
    }

    public function changeStatusRifa($number, $status){
        if($status == 2){
            $query = "UPDATE rifas SET stat  = $status, timeselect = null WHERE num = $number";
        }else if($status == 3){
            $dateTime = new DateTime('now', new DateTimeZone('America/Argentina/Buenos_Aires'));
            $timeselect = $dateTime->format("d-m-Y H:i:s");
            $query = "UPDATE rifas SET stat  = $status, timeselect = $timeselect WHERE num = $number";
        }
        $reponce = $this->connectionDB->enviarConsulta($query);
        return $reponce;
    }

    public function buyRifa($number, $fullname, $contact){
        $dateTime = new DateTime('now', new DateTimeZone('America/Argentina/Buenos_Aires'));
        $timebuy = $dateTime->format("d-m-Y H:i:s");
        $query = "UPDATE rifas SET stat = 1, timebuy = $timebuy, fullname = $fullname, contact = $contact WHERE num = $number";
        $reponce = $this->connectionDB->enviarConsulta($query);
        return $reponce;
    }
}
?>