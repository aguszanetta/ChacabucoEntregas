<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$idCorredor = (isset($_POST['idCorredor'])) ? $_POST['idCorredor'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$cuit = (isset($_POST['cuit'])) ? $_POST['cuit'] : '';
$telefono = (isset($_POST['telefono'])) ? $_POST['telefono'] : '';
$calle = (isset($_POST['calle'])) ? $_POST['calle'] : '';
$numero = (isset($_POST['numero'])) ? $_POST['numero'] : '';
$localidad = (isset($_POST['localidad'])) ? $_POST['localidad'] : '';
$mail = (isset($_POST['mail'])) ? $_POST['mail'] : '';
$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$password = (isset($_POST['password'])) ? $_POST['password'] : '';
$pass = password_hash($password, PASSWORD_BCRYPT, array('cost'=>12));
$observaciones = (isset($_POST['observaciones'])) ? $_POST['observaciones'] : '';

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:
        $consulta = "INSERT INTO direccion (calle, numero, localidad) VALUES('$calle', '$numero', '$localidad');
        SELECT idDireccion INTO @direccionID FROM direccion WHERE calle='$calle' AND numero='$numero' AND localidad='$localidad' ORDER BY idDireccion DESC LIMIT 1;
        INSERT INTO usuarios (usuario, password) VALUES ('$usuario', '$pass');
        SELECT idUsuario INTO @usuarioID FROM usuarios WHERE usuario= '$usuario' ORDER BY idUsuario DESC LIMIT 1;
        INSERT INTO corredor (nombre, cuit, telefono, mail, observaciones, direccionID, usuarioID) VALUES('$nombre', '$cuit', '$telefono', '$mail', '$observaciones', @direccionID, @usuarioID );
        INSERT INTO permisos (rol, usuarioID) VALUES ('corredor', @usuarioID);";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:
        $consulta = "UPDATE corredor SET nombre='$nombre', cuit='$cuit', telefono='$telefono', mail='$mail', observaciones='$observaciones' WHERE idCorredor='$idCorredor';
        UPDATE direccion SET calle='$calle', numero='$numero', localidad='$localidad' WHERE idDireccion= (SELECT d.idDireccion FROM corredor c INNER JOIN direccion d ON c.direccionID = d.idDireccion WHERE c.idCorredor = '$idCorredor');
        UPDATE usuarios SET usuario='$usuario' WHERE idUsuario=(SELECT u.idUsuario FROM corredor c INNER JOIN usuarios u ON c.usuarioID = u.idUsuario WHERE c.idCorredor = '$idCorredor')";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM corredor WHERE idCorredor='$idCorredor' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:
        $consulta = "SELECT c.*, CONCAT(d.calle, ' N° ', d.numero) AS direccion, d.localidad, u.usuario AS usuario
        FROM corredor c 
        INNER JOIN direccion d ON c.direccionID = d.idDireccion  
        INNER JOIN usuarios u ON c.usuarioID = u.idUsuario";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5: 
        $consulta = "UPDATE usuarios SET password='$pass' WHERE usuario = '$usuario' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
    break;
    case 6: 
        $consulta = "SELECT * FROM usuarios WHERE usuario <=> '$usuario' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
    break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;