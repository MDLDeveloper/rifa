<?php 
header('Content-Type: application/json');

include("recursos.php");

$listrifa = $rifas->getRifas();

// Modificar los valores de `stat`
foreach ($listrifa as &$rifa) { 
    if ($rifa['stat'] == 1) {
        $rifa['stat'] = 'notavailable';
    } elseif ($rifa['stat'] == 2) {
        $rifa['stat'] = 'available';
    } elseif ($rifa['stat'] == 3) {
        $rifa['stat'] = 'selected';
    } elseif ($rifa['stat'] == 4){
        $rifa['stat'] = 'reserved';
    }
}

echo json_encode($listrifa);
?>