<?php
    session_start();
    if(!isset($_SESSION['s_usuario'])) {
        header("Location: login.php");
    }else{
        if(($_SESSION["s_rol"])=="cliente" || ($_SESSION["s_rol"])=="corredor" ){
            header("Location: contratosRead.php");
        }
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
    <!-- Custom Fonts-->
    <link href="../libraries/fontawsome 5.7.2/vendor/components/font-awesome/css/fontawesome-all.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <!--Material Icons-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">  
    <!-- Custom Style-->
    <link href="../css/stylesDashboard.css" rel="stylesheet"> 
    <link href="../css/styles.css" rel="stylesheet"> 
    
    <!--Datables CSS básico-->
    <link rel="stylesheet" type="text/css" href="../libraries/datatables/datatables.min.css"/>
    <!--Datables Estilo Bootstrap 4 CSS-->  
    <link rel="stylesheet"  type="text/css" href="../libraries/datatables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css"> 
    <!--SweetAlert2-->
    <link rel="stylesheet" href="../libraries/sweetalert2/sweetalert2.min.css">
    <!--SelectizeJS-->
    <link rel="stylesheet" href="../libraries/selectize-js/dist/css/selectize.bootstrap4.css">
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../index.html">
                <div class="sidebar-brand-icon">
                    <img id="logoParabrisas" class="img-profile" src="../logo/SVG/logoChacabuco_conTexto_blanco.svg" style="height: 4em">
                </div>
                <!--<div class="sidebar-brand-text mx-3">Chacabuco Entregas SH</div>-->
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item active">
                <a id="indexDash" class="nav-link" href="indexDashboard.php">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Panel</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                Acciones
            </div>

            <!-- Nav Item - Charts -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class='material-icons'style="font-size: 20px">local_shipping </i>
                    <span>Camiones</span>
                </a>
                <div id="collapseOne" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="camionesActivos.php">Camiones Activos</a>
                        <a class="collapse-item" href="camionesHistoricos.php">Camiones Históricos</a>
                    </div>
                </div>
            </li>

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class='material-icons'style="font-size: 20px">description</i>
                    <span>Contratos</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="contratosActivos.php">Contratos Activos</a>
                        <a class="collapse-item" href="contratosHistoricos.php">Contratos Históricos</a>
                    </div>
                </div>
            </li>

            <!-- Nav Item - Charts -->
            <li class="nav-item">
                <a class="nav-link" href="clientes.php">
                    <i class='material-icons'style="font-size: 25px">groups</i>
                    <span>Clientes</span>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="corredores.php">
                    <i class='material-icons'style="font-size: 25px">send</i>
                    <span>Corredores</span>
                </a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    
                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small"><?php if(isset($_SESSION['s_usuario'])){echo $_SESSION['s_usuario'];};?></span>
                                <img class="img-profile rounded-circle"
                                    src="../img/undraw_profile.svg">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Cerrar Sesión
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->
