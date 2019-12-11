<?php 

define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');


class database{

    protected $conexion;

    public function _contruct() { }

    public function conectar($db) { 
        $this->conexion = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, "$db" );
        if ($this->conexion){
            return $this->conexion;
        }else{
            return false;
        }
    }

    public function desconectar(){
        if($this->conectar->conexion){
            mysql_close($this->conexion);
        }
    }
}

?>