<?php
class ConnectDB {
	private $conexion;
	public $error;

	function __construct($servidor, $usuario, $clave, $base, $port) {
		if(!$this->_connect($servidor, $usuario, $clave, $base, $port)) {
			$this->error = $this->conexion->connect_error;
		}
	}

	function __destruct() {
		$this->conexion->close();
	}

	private function _connect($servidor, $usuario, $clave, $base, $port) {
		$this->conexion = new mysqli($servidor, $usuario, $clave, $base, $port);
			if(!$this->conexion->connect_errno) {
				$this->error = $this->conexion->connect_error;
				return false;
			}
	}

	public function prepare($query) {
        return $this->conexion->prepare($query);
    }
	
	public function enviarConsulta($query) {
		$this->logQuery($query);
		$tipo = strtoupper(substr($query, 0,6));

		switch($tipo) {
			case 'INSERT':
				$resultado = $this->conexion->query($query);
				if(!$resultado) {
					$this->error = $this->conexion->error;
					return false;
				} else {
					return $this->conexion->insert_id;
				}
				break;
			case 'UPDATE':
			case 'DELETE':
				$resultado = $this->conexion->query($query);
				if(!$resultado) {
					$this->error = $this->conexion->error;
					return false;
				} else {
					return $this->conexion->affected_rows;
				}
				break;

			case 'SELECT':
				$resultado = $this->conexion->query($query);
				if(!$resultado) {
					$this->error = $this->conexion->error;
					return false;
				} else {
					$listar_datos = [];
					while($fila = $resultado->fetch_assoc()) {
						$listar_datos[]=$fila;
					}
					return $listar_datos;
				}

				break;
		}

	}
	private function logQuery($query) {
		$logfile = 'logs.txt';
		$currentDate = date('Y-m-d H:i:s');
		$logEntry = $currentDate . " - " . $query . "\n";

		// Escribir la consulta en el archivo logs.txt
		file_put_contents($logfile, $logEntry, FILE_APPEND | LOCK_EX);
	}
}
?>