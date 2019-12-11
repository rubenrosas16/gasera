<?php 


function ExisteUsuario($user, $conect) { 
    $query = mysqli_query($conect, "SELECT * FROM usuarios where user = '" . $user . "'");
	$check = mysqli_num_rows($query);
	if($check > 0)
	{	
	    return true;
	}else{
        return false;
    }
}

function SesionValida($user, $pass, $conect) {
    $query = mysqli_query($conect, "SELECT * FROM usuarios where user = '" . $user . "' AND pass = '" . $pass . "'");
	$check = mysqli_num_rows($query);
	if($check > 0)
	{	
	    return true;
	}else{
        return false;
    }
}

function EsUsuarioGasera($user, $conect) {
    $query = mysqli_query($conect, "SELECT * FROM usuarios where user = '" . $user . "' AND gasera = '1'");
	$check = mysqli_num_rows($query);
	if($check > 0)
	{	
	    return true;
	}else{
        return false;
    }
}

function GetIDUsuario($user, $pass, $conect){
	$query = mysqli_query($conect, "SELECT * FROM usuarios where user = '" . $user . "' AND pass = '" . $pass . "'");
	mysqli_num_rows($query);
	$datos= mysqli_fetch_array($query);
	return $datos['id'];
}

?>