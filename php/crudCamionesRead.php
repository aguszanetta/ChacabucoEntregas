<?php
session_start();
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$rol=$_SESSION["s_rol"];
$opcion = 0;

if($rol == 'cliente'){
    $idCliente = $_SESSION["s_clienteID"];
    $opcion = 1;
}else if($rol == 'corredor'){
    $idCorredor = $_SESSION["s_corredorID"];
    $opcion = 2;
}


switch($opcion){
    /*-------------Cliente-------------*/
    case 1:
        $consulta = "SELECT c.*, ca.numero AS contrato, h.porcentaje AS humedad, m.porcentaje AS merma 
        FROM camion c 
        INNER JOIN contrato ca ON c.contratoID = ca.idContrato 
        INNER JOIN humedad h ON c.humedadID = h.idHumedad 
        INNER JOIN merma m ON c.mermaID = m.idMerma 
        WHERE ca.clienteID = '$idCliente'";

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*-------------Corredor-------------*/
    case 2:
        $consulta = "SELECT c.*, ca.numero AS contrato, h.porcentaje AS humedad, m.porcentaje AS merma 
        FROM camion c 
        INNER JOIN contrato ca ON c.contratoID = ca.idContrato 
        INNER JOIN humedad h ON c.humedadID = h.idHumedad 
        INNER JOIN merma m ON c.mermaID = m.idMerma 
        WHERE ca.corredorID = '$idCorredor'";

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;  
    }


print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;