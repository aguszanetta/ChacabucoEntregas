<?php 
session_start();

include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$usuario = $_POST['usuario'] ?? '';
$password = $_POST['password'] ?? '';

$consulta = "SELECT u.idUsuario, u.usuario, u.password, p.rol, cli.idCliente, co.idCorredor 
             FROM usuarios u 
             INNER JOIN permisos p ON u.idUsuario = p.usuarioID 
             LEFT JOIN cliente cli ON u.idUsuario = cli.usuarioID
             LEFT JOIN corredor co ON u.idUsuario = co.usuarioID
             WHERE u.usuario = :usuario COLLATE utf8_bin";

$resultado = $conexion->prepare($consulta);
$resultado->execute([':usuario' => $usuario]);
$user_data = $resultado->fetch(PDO::FETCH_ASSOC);

$data = null;

if ($user_data && password_verify($password, $user_data['password'])) {
    session_regenerate_id(true);
    unset($user_data['password']);
    $_SESSION["s_usuario"] = $user_data['usuario'];
    $_SESSION["s_rol"] = $user_data['rol'];

    if ($user_data['rol'] == 'cliente') {
        $_SESSION["s_clienteID"] = $user_data['idCliente'];
    } elseif ($user_data['rol'] == 'corredor') {
        $_SESSION["s_corredorID"] = $user_data['idCorredor'];
    }

    $data = $user_data; 
}

header('Content-Type: application/json');
print json_encode($data);
$conexion = null;
?>