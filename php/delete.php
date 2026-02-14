<?php

$nombreHash = (isset($_POST['nombreHash'])) ? $_POST['nombreHash'] : '';
$response = $nombreHash;

$rutaVieja = '../files/' . $nombreHash;
$rutaNueva = '../files/eliminados/' . $nombreHash;

if(rename($rutaVieja,$rutaNueva)){
   $response = 'Exito';
} else {
   $response = 'Error';
}

echo $response;
exit;
