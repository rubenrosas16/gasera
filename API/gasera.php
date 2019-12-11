<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-headers: Content-Type, Authorization, X-Requested-Whith");
header('Content-Type: application/json; charset=UTF-8');

include "config-gasera/database.php";
include "gasera-funciones.php";

$mysqli = new database();

$conect = $mysqli->conectar('slothsof_repertorio');

$postjson = json_decode(file_get_contents('php://input'), true);

$conect->set_charset("utf8");


if($postjson['tipoMov'] == "login")
{
	$user = trim($postjson['usuario']);
	$pass = $postjson['password'];
	$query = mysqli_query($conect, "SELECT * FROM usuarios where user = '" . $user . "' AND pass = '" . $pass . "'");
	$check = mysqli_num_rows($query);
	if($check > 0)
	{	
	    $datos= mysqli_fetch_array($query);
	    $data = array(
	    	'id_Usuario' => $datos['id'],
	    	'usuario' => $datos['user'],
	    	'pass' => $datos['pass'],
	    	'admin' => (bool) $datos['admin'],
	    	'gasera' => (bool) $datos['gasera']
	    );
		$result = json_encode(array('success' => true, 'result' =>$data
	));
	}
	else
	{
		$result = json_encode(array('success' => false, 'msg' =>'Usuario o contraseña incorrectos.'));
	}
}
else if($postjson['tipoMov'] == "registrarse")
{

	$user = $postjson['usuario'];
	if(ExisteUsuario($user, $conect))
	{	
	    $result = json_encode(array('success' => false, 'msg' =>'El Usuario ya existe.'));
	}
	else
	{
		$admin = trim($postjson['admin']);
		$pass = $postjson['password'];
		$gasera = $postjson['gasera'];
	
		$sql = "INSERT INTO usuarios (user, pass, admin, gasera) VALUES ('{$user}','{$pass}','0','{$gasera}')";

		if ($conect->query($sql) === TRUE) {
			$data = array(
				'id_Usuario' => $user,
				'pass' => $pass,
				'admin' => (bool) $admin,
				'gasera' => (bool) $gasera
			);
			$result = json_encode(array('success' => true, 'result' => $data));
		} else {
			$result = json_encode(array('success' => false, 'msg' =>'No se pudo guardar la información.'));
		}

	}
}
else if($postjson['tipoMov'] == "cambioPass")
{

	$user = $postjson['usuario'];
	if(!ExisteUsuario($user, $conect))
	{	
	    $result = json_encode(array('success' => false, 'msg' =>'El Usuario no existe.'));
	}else{
		$pass = trim($postjson['password']);
		if($pass == ""){
			$result = json_encode(array('success' => false, 'msg' =>'Capture la contraseña.'));
		}else{
			$sql = "UPDATE usuarios SET pass = '{$pass}' WHERE user = '{$user}'";
			if ($conect->query($sql) === TRUE) {
				$result = json_encode(array('success' => true, 'result' => $pass));
			} else {
				$result = json_encode(array('success' => false, 'msg' =>'No se pudo guardar la información.'));
			}			
		}
	}

}
else if($postjson['tipoMov'] == "getGaseras")
{
	$user = $postjson['usuario'];
	$pass = $postjson['pass'];
	if(!SesionValida($user, $pass, $conect))
	{
	    $result = json_encode(array('success' => false, 'msg' =>'No tiene permisos.'));
	}else{

		$sql = "SELECT * FROM usuarios where gasera = '1'";
		$consulta = $conect->query($sql);
		if ($consulta->num_rows > 0) {
			// output data of each row
			$data = array();
			while($datos = $consulta->fetch_assoc()) {
				array_push($data, array(
					'id' => $datos['id'],
					'nombre' => $datos['user']				
				));
			}
			$result = json_encode(array('success' => true, 'result' =>$data));
		} else {
			$result = json_encode(array('success' => false, 'msg' =>'No hay gaseras registradas.'));
		}

	}

}
else if($postjson['tipoMov'] == "pedir")
{
	$user = $postjson['usuario'];
	$pass = $postjson['pass'];
	if(!SesionValida($user, $pass, $conect))
	{	
	    $result = json_encode(array('success' => false, 'msg' =>'No tiene permisos para hacer pedidos.'));
	}else{

		$idUsuarioGasera = $postjson['idGasera'];
		$query = mysqli_query($conect, "SELECT * FROM usuarios where id = {$idUsuarioGasera}");
		if (!(mysqli_num_rows($query) > 0)){
			$result = json_encode(array('success' => false, 'msg' =>'El id de la Gasera no existe.'));
		}else{
			$query = mysqli_query($conect, "SELECT * FROM usuarios where user = '" . $user . "' AND pass = '" . $pass . "'");
			mysqli_num_rows($query);
			$datos= mysqli_fetch_array($query);
			$idUsuarioPide = $datos['id'];
			$cantidad = $postjson['cantidad'];
			$direccion = $postjson['direccion'];
	
			$sql = "INSERT INTO pedidos (idUsuarioPide, idUsuarioGasera, fecha, cantidad, entregado, direccion) 
			VALUES ('{$idUsuarioPide}','{$idUsuarioGasera}', NOW(),'{$cantidad}', '0', '{$direccion}')";
	
			if ($conect->query($sql) === TRUE) {
				$data = array(
					'id_Usuario' => $user,
					'usuario' => $pass,
					'admin' => (bool) $admin,
					'gasera' => (bool) $gasera
				);
				$result = json_encode(array('success' => true, 'result' => $data));
			} else {
				$result = json_encode(array('success' => false, 'msg' =>'No se pudo guardar la información.'));
			}
		}
	}
}else if($postjson['tipoMov'] == "graficaCantidadDia"){
	$user = $postjson['usuario'];
	$pass = $postjson['pass'];
	if(!SesionValida($user, $pass, $conect) || !EsUsuarioGasera($user, $conect))
	{	
	    $result = json_encode(array('success' => false, 'msg' =>'No tiene permisos para ver la información.'));
	}else{
		$idUsuario = GetIDUsuario($user, $pass, $conect);

		$sql = "SELECT IFNULL(t1.cantidad,0) AS cantidad
		FROM (SELECT SUM(cantidad) As cantidad, DAYOFWEEK(fecha) AS dia FROM pedidos
		WHERE WEEK(fecha) = WEEK(NOW()) AND YEAR(fecha) = YEAR(NOW()) AND idUsuarioGasera = {$idUsuario}
		GROUP BY YEAR(fecha), WEEK(fecha), DAYOFWEEK(fecha)
		) AS t1
		RIGHT JOIN (
			SELECT 1 AS d
			UNION SELECT 2 AS d
			UNION SELECT 3 AS d
			UNION SELECT 4 AS d
			UNION SELECT 5 AS d
			UNION SELECT 6 AS d
			UNION SELECT 7 AS dSELECT 
		) AS t2 ON t1.dia = t2.d
		ORDER BY d";
		$consulta = $conect->query($sql);
		if ($consulta->num_rows > 0) {
			$data = array();
			while($datos = $consulta->fetch_assoc()) {
				array_push($data, $datos['cantidad']);
				$numDia += 1;
			}
			$result = json_encode(array('success' => true, 'result' =>$data));
		} else {
			$result = json_encode(array('success' => false, 'msg' =>'No hay pedidos registrados.'));
		}
	}
} if($postjson['tipoMov'] == "PedidosPendientes"){

	$user = $postjson['usuario'];
	$pass = $postjson['pass'];
	if(!SesionValida($user, $pass, $conect) || !EsUsuarioGasera($user, $conect))
	{
	    $result = json_encode(array('success' => false, 'msg' =>'No tiene permisos para ver la información.'));
	}else{
		$idUsuario = GetIDUsuario($user, $pass, $conect);
		
		$sql = "SELECT u.user, p.*
				FROM pedidos AS p
				INNER JOIN usuarios u ON u.id = p.idUsuarioPide
				WHERE idUsuarioGasera = {$idUsuario}";
		$consulta = $conect->query($sql);
		if ($consulta->num_rows > 0) {
			$data = array();
			while($row = $consulta->fetch_assoc()) {
				array_push($data, $row);
			}
			$result = json_encode(array('success' => true, 'result' =>$data));
		}else {
			$result = json_encode(array('success' => false, 'msg' =>'No hay pedidos registrados.'));
		}

	}
}
echo $result;
$mysqli->desconectar();
?>