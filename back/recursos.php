<?php
    include("classConectDB.php");
    include("classUserValidation.php");

    define("SERVIDOR", 'localhost');
    define("USUARIO", 'root');
    define("CLAVE", '');
    define("BASE", 'db_rifa');
    
    $connectionDB = new ConnectDB(SERVIDOR, USUARIO, CLAVE, BASE);
    $userValidation = new UserValidator($connectionDB);
    $rifas = new Rifas($connectionDB);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");  
?>