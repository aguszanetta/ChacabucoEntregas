<?php
session_start();
if (!isset($_SESSION['s_usuario'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Chacabuco Entregas SH</title>
    <!-- Fav Icon-->
    <link rel="icon" rel="icon" type="image/x-icon" href="../logo/ICO/logoChacabuco_sinTexto_blanco.ico">

    <link href="../libraries/fontawsome 5.7.2/vendor/components/font-awesome/css/fontawesome-all.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <link href="../css/stylesDashboard.css" rel="stylesheet"> 
    
    <style>
        .error-container {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .text-error {
            font-size: 7rem;
            font-weight: 700;
            color: #e74a3b;
            line-height: 1;
        }
    </style>
</head>

<body class="bg-light">

    <div class="container">
        <div class="row error-container">
            <div class="col-md-12 text-center">
                <div class="text-error mb-4">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                
                <h1 class="display-4 text-gray-800">Acceso Denegado</h1>
                <p class="lead text-gray-600 mb-5">
                    Lo sentimos, <strong><?php echo $_SESSION['s_usuario']; ?></strong>. 
                    No tienes los permisos necesarios para ver esta sección.
                </p>
                
                <hr class="my-4" style="max-width: 300px;">
                
                <a href="../database/logout.php" class="btn btn-danger btn-sm">
                    <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                </a>
            </div>
        </div>
    </div>

    <script src="../libraries/jquery/jquery-3.3.1.min.js"></script>
    <script src="../libraries/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>