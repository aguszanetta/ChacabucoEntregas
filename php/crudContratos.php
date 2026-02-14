<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$numero = (isset($_POST['numero'])) ? $_POST['numero'] : '';
$toneladas = (isset($_POST['toneladas'])) ? $_POST['toneladas'] : '';
$comprador = (isset($_POST['comprador'])) ? $_POST['comprador'] : '';
$corredorID = (isset($_POST['corredorID'])) ? $_POST['corredorID'] : '';
$clienteID = (isset($_POST['clienteID'])) ? $_POST['clienteID'] : '';
$cerealID = (isset($_POST['cerealID'])) ? $_POST['cerealID'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idContrato = (isset($_POST['idContrato'])) ? $_POST['idContrato'] : '';
$contratoID = (isset($_POST['contratoID'])) ? $_POST['contratoID'] : '';

switch($opcion){
    case 1:
        $consulta = "INSERT INTO contrato (numero, toneladas, comprador, estado, clienteID, cerealID, corredorID) VALUES('$numero', '$toneladas', '$comprador', 'activo', '$clienteID', '$cerealID', '$corredorID') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM contrato WHERE estado = 'activo' ORDER BY idContrato DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:
        $consulta = "UPDATE contrato SET numero='$numero', toneladas='$toneladas', comprador='$comprador', clienteID='$clienteID', cerealID='$cerealID', corredorID='$corredorID' WHERE idContrato='$idContrato' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM contrato WHERE idContrato='$idContrato' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM contrato WHERE idContrato='$idContrato' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);                           
        break;
    case 4:
        $consulta = "SELECT ca.*, c.nombre AS cliente, ce.tipo AS cereal, co.nombre as corredor, 
        (SELECT IFNULL(SUM(neto),0) FROM camion WHERE contratoID = ca.idContrato) AS netosSumados, 
        (SELECT IFNULL(SUM(netoFinal),0) FROM camion WHERE contratoID = ca.idContrato) AS netosFinalesSumados 
        FROM contrato ca 
        INNER JOIN cliente c ON ca.clienteID = c.idCliente 
        INNER JOIN cereal ce ON ca.cerealID = ce.idCereal 
        INNER JOIN corredor co ON ca.corredorID = co.idCorredor 
        WHERE ca.estado = 'activo'";

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "UPDATE contrato SET estado = 'historico' WHERE idContrato= '$idContrato' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 6: 
        $consulta = "SELECT * FROM cliente ORDER BY nombre";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*-------------Detalles de los Contratos-------------*/
    case 7:
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
    case 8:
        $consulta = "SELECT c.*, ca.numero AS contrato, h.porcentaje AS humedad, m.porcentaje AS merma 
        FROM camion c 
        INNER JOIN contrato ca ON c.contratoID = ca.idContrato 
        INNER JOIN humedad h ON c.humedadID = h.idHumedad 
        INNER JOIN merma m ON c.mermaID = m.idMerma 
        WHERE ca.idContrato = '$contratoID'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*-------------CONTRATO HISTORICO-------------*/
    case 9:
        $consulta = "SELECT ca.*, c.nombre AS cliente, ce.tipo AS cereal, co.nombre as corredor, 
        (SELECT IFNULL(SUM(neto),0) FROM camion WHERE contratoID = ca.idContrato) AS netosSumados, 
        (SELECT IFNULL(SUM(netoFinal),0) FROM camion WHERE contratoID = ca.idContrato) AS netosFinalesSumados 
        FROM contrato ca 
        INNER JOIN cliente c ON ca.clienteID = c.idCliente 
        INNER JOIN cereal ce ON ca.cerealID = ce.idCereal 
        INNER JOIN corredor co ON ca.corredorID = co.idCorredor 
        WHERE ca.estado = 'historico'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
    break;
    case 10:
        $consulta = "UPDATE contrato SET estado = 'activo' WHERE idContrato= '$idContrato' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 11:
        $consulta = "SELECT IF(EXISTS(SELECT * FROM camion WHERE contratoID = '$idContrato'),1,0) AS existe ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*-------------CORREDORES-------------*/    
    case 12: 
        $consulta = "SELECT * FROM corredor";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;    
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;