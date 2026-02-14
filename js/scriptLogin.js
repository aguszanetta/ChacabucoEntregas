$('#formlogin').submit(function(e) {
    e.preventDefault();
    var usuario = $.trim($("#usuario").val());
    var password = $.trim($("#password").val());

    if (usuario.length == "" || password.length == "") {
        Swal.fire({
            title: 'Campos incompletos',
            text: 'Debe ingresar un usuario y password para continuar',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    } else {
        $.ajax({
            url: "../database/login.php",
            type: "POST",
            datatipe: "json",
            data: { usuario: usuario, password: password },
            success: function(data) {
                if (data == "null") {
                    Swal.fire({
                        title: 'Error',
                        text: 'usuario y/o contraseña incorrecta',
                        icon: 'error',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    });
                    $('#password').val('');
                } else {
                    Swal.fire({
                        title: 'Exito',
                        text: '¡Conexión exitosa!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(function() {
                        window.location.href = "../php/indexDashboard.php";
                    })

                }
            }
        })
    }

});