<?php
// Clase para la validación de usuario
class UserValidator {
    private $connectionDB;

    public function __construct($connectionDB) {
        $this->connectionDB = $connectionDB;
    }

    public function validateUser($data) {
        // Validamos los datos (por ejemplo, comprobamos si el usuario y la contraseña son correctos)
        $p = $data->password; 
        $u = $data->user;
        $query = "SELECT * FROM usuario WHERE psw = ? AND user = ?";
        $stmt = $this->connectionDB->prepare($query);
        $stmt->bind_param('ss', $p, $u);
        $stmt->execute();
        $result = $stmt->get_result();
        $validacion = $result->fetch_assoc();
        $stmt->close();
        if(empty($validacion)){
            return false;
        } else {
            return true;
        }
    }
}
?>