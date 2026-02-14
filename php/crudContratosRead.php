<?php
session_start();
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$idContrato = (isset($_POST['idContrato'])) ? $_POST['idContrato'] : '';
if (isset($_SESSION['s_clienteID'])) {
    $idCliente = $_SESSION["s_clienteID"];
} else {
    $idCorredor = $_SESSION["s_corredorID"];
}
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';


switch($opcion){
    case 1:
        $consulta = "SELECT ca.*, c.nombre AS cliente, ce.tipo AS cereal, co.nombre AS corredor,
        (SELECT IFNULL(SUM(neto),0) FROM camion WHERE contratoID = ca.idContrato) AS netosSumados, 
        (SELECT IFNULL(SUM(netoFinal),0) FROM camion WHERE contratoID = ca.idContrato) AS netosFinalesSumados 
        FROM contrato ca 
        INNER JOIN cliente c ON ca.clienteID = c.idCliente 
        INNER JOIN cereal ce ON ca.cerealID = ce.idCereal
        INNER JOIN corredor co ON ca.corredorID = co.idCorredor
        WHERE c.idCliente = '$idCliente' ";

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*-------------Detalles de los Contratos-------------*/
    case 2:
        $consulta = "SELECT c.*, ce.tipo AS cereal, cl.nombre, co.nombre AS corredor,
        (SELECT IFNULL(SUM(neto),0) FROM camion WHERE contratoID = c.idContrato) AS netosSumados,
        (SELECT IFNULL(SUM(netoFinal),0) FROM camion WHERE contratoID = c.idContrato) AS netosFinalesSumados   
        FROM contrato c 
        INNER JOIN cereal ce ON c.cerealID = ce.idCereal
        INNER JOIN cliente cl ON c.clienteID = cl.idCliente
        INNER JOIN corredor co ON c.corredorID = co.idCorredor
        WHERE idContrato='$idContrato' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:
        $consulta = "SELECT c.*, ca.numero AS contrato, h.porcentaje AS humedad, m.porcentaje AS merma 
        FROM camion c 
        INNER JOIN contrato ca ON c.contratoID = ca.idContrato 
        INNER JOIN humedad h ON c.humedadID = h.idHumedad 
        INNER JOIN merma m ON c.mermaID = m.idMerma 
        WHERE ca.idContrato = '$idContrato'";

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:
        $consulta = "SELECT ca.*, c.nombre AS cliente, ce.tipo AS cereal, co.nombre AS corredor,
        (SELECT IFNULL(SUM(neto),0) FROM camion WHERE contratoID = ca.idContrato) AS netosSumados, 
        (SELECT IFNULL(SUM(netoFinal),0) FROM camion WHERE contratoID = ca.idContrato) AS netosFinalesSumados 
        FROM contrato ca 
        INNER JOIN cliente c ON ca.clienteID = c.idCliente 
        INNER JOIN cereal ce ON ca.cerealID = ce.idCereal
        INNER JOIN corredor co ON ca.corredorID = co.idCorredor
        WHERE co.idCorredor = '$idCorredor' ";

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;    
    }


print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;