<?php
session_start();
unset($_SESSION["s_usuario"]);
unset($_SESSION["s_rol"]);
unset($_SESSION["s_clienteID"]);
unset($_SESSION["s_corredorID"]);
session_destroy();
header("Location: ../php/login.php"); 
?>