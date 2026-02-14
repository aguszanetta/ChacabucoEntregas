<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$idCamion = (isset($_POST['idCamion'])) ? $_POST['idCamion'] : '';
$cartaPorte = (isset($_POST['cartaPorte'])) ? $_POST['cartaPorte'] : '';
$pesoProc = (isset($_POST['pesoProc'])) ? $_POST['pesoProc'] : '';
$patente = (isset($_POST['patente'])) ? $_POST['patente'] : '';
$granel = (isset($_POST['granel'])) ? $_POST['granel'] : '';
$bruto = (isset($_POST['bruto'])) ? $_POST['bruto'] : '';
$tara = (isset($_POST['tara'])) ? $_POST['tara'] : '';
$neto = (isset($_POST['neto'])) ? $_POST['neto'] : '';
$netoFinal = (isset($_POST['netoFinal'])) ? $_POST['netoFinal'] : '';
$humedad = (isset($_POST['humedad'])) ? $_POST['humedad'] : '';
$merma = (isset($_POST['merma'])) ? $_POST['merma'] : '';
$descuento = (isset($_POST['descuento'])) ? $_POST['descuento'] : '';
$observaciones = (isset($_POST['observaciones'])) ? $_POST['observaciones'] : '';
$fecha = (isset($_POST['fecha'])) ? $_POST['fecha'] : '';
$archivos = (isset($_POST['archivos'])) ? $_POST['archivos'] : '';
$archivosHash = (isset($_POST['archivosHash'])) ? $_POST['archivosHash'] : '';
$contratoID = (isset($_POST['contratoID'])) ? $_POST['contratoID'] : '';
$idContrato = (isset($_POST['idContrato'])) ? $_POST['idContrato'] : '';
$humedadID = (isset($_POST['humedadID'])) ? $_POST['humedadID'] : '';
$mermaID = (isset($_POST['mermaID'])) ? $_POST['mermaID'] : '';
$mes = (isset($_POST['mes'])) ? $_POST['mes'] : '';
$año = (isset($_POST['año'])) ? $_POST['año'] : '';

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO camion (cartaPorte, pesoProc, patente, granel, bruto, tara, neto, descuento, netoFinal, observaciones, fecha, archivos, archivosHash, estado, contratoID, humedadID, mermaID) VALUES('$cartaPorte', '$pesoProc', 
        '$patente', '$granel', '$bruto', '$tara', '$neto', '$descuento', '$netoFinal', '$observaciones', '$fecha', '$archivos', '$archivosHash', 'activo', '$contratoID', '$humedadID', '$mermaID') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM camion ORDER BY idCamion DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:
        $consulta = "UPDATE camion SET cartaPorte='$cartaPorte', pesoProc='$pesoProc', patente='$patente', granel='$granel',
        bruto='$bruto', tara='$tara', neto='$neto', descuento='$descuento', netoFinal='$netoFinal',
        observaciones='$observaciones', fecha='$fecha', archivos='$archivos', archivosHash='$archivosHash', contratoID='$contratoID', humedadID='$humedadID', mermaID='$mermaID' WHERE idCamion='$idCamion' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM camion WHERE idCamion='$idCamion' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM camion WHERE idCamion='$idCamion' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);                          
        break;
    case 4:
        $consulta = "SELECT c.*, ca.numero AS contrato, h.porcentaje AS humedad, m.porcentaje AS merma 
        FROM camion c 
        INNER JOIN contrato ca ON c.contratoID = ca.idContrato 
        INNER JOIN humedad h ON c.humedadID = h.idHumedad 
        INNER JOIN merma m ON c.mermaID = m.idMerma 
        WHERE c.estado = 'activo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "UPDATE camion SET estado = 'historico' WHERE idCamion='$idCamion' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 6: 
        $consulta = "SELECT * FROM contrato WHERE estado = 'activo' ORDER BY idContrato DESC; ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 7:
        $consulta = "SELECT m.idMerma, m.porcentaje AS porcentajeM, h.*, c.comprador 
        FROM cereal ce 
        INNER JOIN contrato c ON c.cerealID = ce.idCereal 
        INNER JOIN humedad h ON h.cerealID = ce.idCereal
        INNER JOIN merma m ON h.idHumedad = m.humedadID
        WHERE c.idContrato = '$idContrato' AND h.porcentaje = '$humedad' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 8: 
        $consulta = "UPDATE camion SET estado = 'historico' WHERE MONTH(fecha) = '$mes' AND YEAR(fecha) = '$año' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 9: 
        $consulta = "SELECT h.*, c.idContrato FROM camion ca 
        INNER JOIN humedad h ON ca.humedadID=h.idHumedad 
        INNER JOIN contrato c ON ca.contratoID = c.idContrato 
        WHERE idCamion = '$idCamion'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 10:
        $consulta = "SELECT c.*, ca.numero AS contrato, h.porcentaje AS humedad, m.porcentaje AS merma 
        FROM camion c 
        INNER JOIN contrato ca ON c.contratoID = ca.idContrato 
        INNER JOIN humedad h ON c.humedadID = h.idHumedad 
        INNER JOIN merma m ON c.mermaID = m.idMerma 
        WHERE c.estado = 'historico' AND c.fecha >= DATE_SUB(NOW(), INTERVAL 6 MONTH)";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 11:
        $consulta = "UPDATE camion SET archivos='', archivosHash='' WHERE idCamion='$idCamion' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 12:
        $consulta = "UPDATE camion SET estado = 'activo' WHERE idCamion= '$idCamion' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 13:
        $consulta = "SELECT comprador FROM contrato WHERE idContrato= '$idContrato' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    }

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;