<?php 
session_start();

include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$password = (isset($_POST['password'])) ? $_POST['password'] : '';

$consulta = "SELECT * FROM usuarios WHERE usuario = '$usuario' COLLATE utf8_bin ";
$resultado = $conexion->prepare($consulta);
$resultado->execute();
$data=$resultado->fetchAll(PDO::FETCH_ASSOC); 

if ($data == null){
	$passHasheado = null;
}else{
	$passHasheado = $data[0]["password"];
}

$consulta = "SELECT p.rol FROM usuarios u INNER JOIN permisos p ON u.idUsuario = p.usuarioID WHERE usuario = '$usuario'";
$resultado = $conexion->prepare($consulta);
$resultado->execute();
$data=$resultado->fetchAll(PDO::FETCH_ASSOC); 


if ($data != null){
	if ($data[0]["rol"] == 'admin'){
		if(password_verify($password, $passHasheado)){
			$consulta = "SELECT p.*, u.* FROM usuarios u 
			INNER JOIN permisos p ON u.idUsuario = p.usuarioID
			WHERE u.usuario = '$usuario'";
			$resultado = $conexion->prepare($consulta);
			$resultado->execute();
			$data = $resultado->fetchAll(PDO::FETCH_ASSOC);
			$_SESSION["s_usuario"] = $usuario;
			$_SESSION["s_rol"] = $data[0]["rol"];
		}else{	
			$data=null;
		}
	}elseif ($data[0]["rol"] == 'cliente') {
		if(password_verify($password, $passHasheado)){
			$consulta = "SELECT p.*, u.*, cli.idCliente AS clienteID FROM usuarios u 
			INNER JOIN permisos p ON u.idUsuario = p.usuarioID 
			INNER JOIN cliente cli ON u.idUsuario = cli.usuarioID
			WHERE u.usuario = '$usuario'";
			$resultado = $conexion->prepare($consulta);
			$resultado->execute();
			$data = $resultado->fetchAll(PDO::FETCH_ASSOC);
			$_SESSION["s_usuario"] = $usuario;
			$_SESSION["s_rol"] = $data[0]["rol"];
			$_SESSION["s_clienteID"] = $data[0]["clienteID"];
			
		}else{	
			$data=null;
		}
	}elseif ($data[0]["rol"] == 'corredor') {
		if(password_verify($password, $passHasheado)){
			$consulta = "SELECT p.*, u.*, co.idCorredor AS corredorID FROM usuarios u 
			INNER JOIN permisos p ON u.idUsuario = p.usuarioID 
			INNER JOIN corredor co ON u.idUsuario = co.usuarioID
			WHERE u.usuario = '$usuario'";
			$resultado = $conexion->prepare($consulta);
			$resultado->execute();
			$data = $resultado->fetchAll(PDO::FETCH_ASSOC);
			$_SESSION["s_usuario"] = $usuario;
			$_SESSION["s_rol"] = $data[0]["rol"];
			$_SESSION["s_corredorID"] = $data[0]["corredorID"];
			
		}else{	
			$data=null;
		}
	}else{
		$data=null;
	}	
}else{
	$data=null;
}

print json_encode($data);
$conexion=null;

?>