<?php
    session_start();
    if(isset($_SESSION['s_usuario'])) {
        header("Location: indexDashboard.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Login</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" rel="icon" type="image/x-icon" href="../logo/ICO/logoChacabuco_sinTexto_blanco.ico">


	<link href="../libraries/fontawsome 5.7.2/vendor/components/font-awesome/css/fontawesome-all.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="../css/stylesLoginUtil.css">
	<link rel="stylesheet" type="text/css" href="../css/stylesLoginMain.css">
	<link rel="stylesheet" href="../libraries/sweetalert2/sweetalert2.min.css">

</head>
<body>
	
	<div class="limiter">
		<div id="loginFondo" class="container-login100">
			<div class="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
				<form id="formlogin" class="login100-form validate-form" action="" method="post">
					<span class="login100-form-title p-b-55">
						Ingresar
					</span>

					<div class="wrap-input100 validate-input m-b-16" >
						<input class="input100" type="text" name="usuario" id="usuario" placeholder="Usuario">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fas fa-user"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input m-b-16" >
						<input class="input100" type="password" name="password" id="password" placeholder="Clave">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fas fa-lock"></i>
						</span>
					</div>
					<div class="container-login100-form-btn p-t-25">
						<button class="login100-form-btn" type="submit" name="submit" value="Conectar">
							Conectar
						</button>
					</div>
					<div class="text-center w-full p-t-50">						
						<a href="../index.html" style="text-decoration: none;"><i class="fas fa-arrow-left"></i><span class="login100-form-volver p-b-25">Volver</span></a>
					</div>
				</form>
			</div>
		</div>
	</div>

<script src="../libraries/jquery-3.6.0/jquery-3.6.0.min.js"></script>
<script src="../libraries/sweetalert2/sweetalert2.all.min.js"></script>
<script src="../js/scriptLogin.js"></script>
</body>
</html>