<?php
    include("classConectDB.php");
    include("classUserValidation.php");
    include("classRifas.php");

    define("SERVIDOR", 'localhost');
    define("USUARIO", 'root');
    define("CLAVE", 'asd2022013');
    define("BASE", 'db_rifa');
    define('PORT', 3301);
    
    $connectionDB = new ConnectDB(SERVIDOR, USUARIO, CLAVE, BASE, PORT);
    $userValidation = new UserValidator($connectionDB);
    $rifas = new Rifas($connectionDB);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");  
?>