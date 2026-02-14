$(document).ready(function() {
    var usuario, idCorredor;
    bandera = '';

    tablaCorredores = $('#tablaCorredores').DataTable({
        "ajax": {
            "url": "crudCorredores.php",
            "method": 'POST',
            "data": { opcion: 4 },
            "dataSrc": ""
        },
        "columns": [
            { "data": "idCorredor", "visible": false },
            { "data": "nombre" },
            { "data": "cuit" },
            { "data": "telefono" },
            { "data": "direccion" },
            { "data": "localidad" },
            { "data": "mail" },
            { "data": "usuario" },
            { "data": "observaciones" },
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditarCorredor'><i class='material-icons'>edit</i></button><button class='btn btn-secondary btn-sm btnPassCorredor'><i class='material-icons'>lock</i></button></div></div>",
                "width": "10%"
            }
        ],
        "order": [
            [0, "desc"]
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ corredores",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando corredores del _START_ al _END_ de un total de _TOTAL_ corredores",
            "infoEmpty": "Mostrando corredores del 0 al 0 de un total de 0 corredores",
            "infoFiltered": "(filtrado de un total de _MAX_ corredores)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        },
        responsive: "true",
        dom: 'Bfrtilp',
        buttons: [{
                extend: 'print',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                title: 'Corredores Chacabuco Entregas SH',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                title: 'Corredores Chacabuco Entregas SH',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                title: 'Corredores Chacabuco Entregas SH',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL',
                customize: function(doc) {
                    doc.styles.tableHeader.fillColor = '#ffffff',
                        doc.styles.tableHeader.color = '#000000',
                        doc.styles.tableBodyOdd.fillColor = '#ffffff',
                        doc.content[1].margin = [100, 0, 100, 0], //left, top, right, bottom
                        doc.content[1].layout = {
                            hLineWidth: function(i, node) {
                                return (i === 0 || i === node.table.body.length) ? 2 : 1;
                            },
                            vLineWidth: function(i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                            },
                            hLineColor: function(i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                            },
                            vLineColor: function(i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                            }
                        };
                },
            },
        ]
    });
    var fila;
    $('#formCorredores').submit(function(e) {
        e.preventDefault();
        nombre = $.trim($('#nombreCorredor').val());
        cuit = $.trim($('#cuitCorredor').val());
        telefono = $.trim($('#telefonoCorredor').val());
        calle = $.trim($('#calleCorredor').val());
        numero = $.trim($('#numeroCorredor').val());
        localidad = $.trim($('#localidadCorredor').val());
        mail = $.trim($("#mailCorredor").val());
        usuario = $.trim($('#usuarioCorredor').val());
        password = $.trim($('#passwordCorredor').val());
        observaciones = $.trim($('#observacionesCorredor').val());

        if (bandera == 'Alta') {
            $.ajax({
                url: "crudCorredores.php",
                type: "POST",
                datatype: "json",
                data: {
                    idCorredor: idCorredor,
                    nombre: nombre,
                    cuit: cuit,
                    telefono: telefono,
                    mail: mail,
                    calle: calle,
                    numero: numero,
                    localidad: localidad,
                    usuario: usuario,
                    password: password,
                    observaciones: observaciones,
                    opcion: 1
                },
                success: function(data) {
                    tablaCorredores.ajax.reload(null, false);
                }
            });
        } else if (bandera == 'Editar') {
            $.ajax({
                url: "crudCorredores.php",
                type: "POST",
                datatype: "json",
                data: {
                    idCorredor: idCorredor,
                    nombre: nombre,
                    cuit: cuit,
                    telefono: telefono,
                    numero: numero,
                    calle: calle,
                    mail: mail,
                    usuario: usuario,
                    localidad: localidad,
                    observaciones: observaciones,
                    opcion: 2
                },
                success: function(data) {
                    tablaCorredores.ajax.reload(null, false);
                }
            });
        } else {
            console.log("Bandera vacia", bandera);
        }

        $('#modalCRUDCorredor').modal('hide');
    });

    $('#formPassCorredor').submit(function(e) {
        e.preventDefault();
        password = $('#passwordRCorredor').val();

        $.ajax({
            url: "crudCorredores.php",
            type: "POST",
            datatype: "json",
            data: {
                usuario: usuario,
                password: password,
                opcion: 5
            },
            success: function(data) {
                tablaCorredores.ajax.reload(null, false);
            }
        });
        $('#modalPassCorredor').modal('hide');
    });

    //Alta
    $("#btnNuevoCorredor").click(function() {
        idCorredor = null;
        bandera = 'Alta';
        $("#form-passCorredor").css('display', 'block');
        $('#passwordCorredor').attr('required', 'required');
        $("#formCorredores").trigger("reset");
        $("#modalForm").css("background-color", "#17a2b8");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Alta de Corredor");
        $('#modalCRUDCorredor').modal('show');
    });

    //Editar        
    $(document).on("click", ".btnEditarCorredor", function() {
        bandera = 'Editar';
        fila = $(this).closest("tr");
        data = $('#tablaCorredores').DataTable().row(fila).data();
        idCorredor = data['idCorredor'];
        nombre = data['nombre'];
        cuit = data['cuit'];
        telefono = data['telefono'];
        direccion = data['direccion'];
        localidad = data['localidad'];
        mail = data['mail'];
        usuario = data['usuario'];
        observaciones = data['observaciones'];
        cut = direccion.split('N°');
        calle = cut[0];
        numero = cut[1];

        $("#nombreCorredor").val(nombre);
        $("#cuitCorredor").val(cuit);
        $("#telefonoCorredor").val(telefono);
        $("#calleCorredor").val($.trim(calle));
        $("#numeroCorredor").val($.trim(numero));
        $("#localidadCorredor").val($.trim(localidad));
        $("#mailCorredor").val($.trim(mail));
        $("#usuarioCorredor").val($.trim(usuario));
        $("#form-passCorredor").css('display', 'none');
        $('#passwordCorredor').removeAttr('required');
        $("#observacionesCorredor").val(observaciones);
        $("#modalForm").css("background-color", "#007bff");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Editar Corredor");
        $('#modalCRUDCorredor').modal('show');
    });

    //Restablecer Contraseña
    $(document).on("click", ".btnPassCorredor", function() {
        fila = $(this).closest("tr");
        data = $('#tablaCorredores').DataTable().row(fila).data();
        usuario = data["usuario"];
        $("#passwordRCorredor").val('');
        $("#headerPassCorredor").css("background-color", "grey");
        $("#headerPassCorredor").css("color", "white");
        $("#titlePassCorredor").text("Restrablecer Contraseña");
        $('#modalPassCorredor').modal('show');
    });

    //Mostar/Ocultar Contraseña ALTA
    $("#btn-passwordCorredor").click(function() {
        eyeCorredor = $('#eyeCorredor').text();

        if (eyeCorredor == "visibility") {
            $('#eyeCorredor').text("visibility_off");
            $('#passwordCorredor').attr('type', 'text');
        } else {
            $('#eyeCorredor').text("visibility");
            $('#passwordCorredor').attr('type', 'password');
        };
    });

    //Mostar/Ocultar Contraseña RESTABLECER
    $("#btn-passwordRCorredor").click(function() {
        eye = $('#eyeRCorredor').text();

        if (eye == "visibility") {
            $('#eyeRCorredor').text("visibility_off");
            $('#passwordRCorredor').attr('type', 'text');
        } else {
            $('#eyeRCorredor').text("visibility");
            $('#passwordRCorredor').attr('type', 'password');
        };
    });

    $(document).on("focusout", "#usuarioCorredor", function() {
        if (bandera == 'Alta') {
            usuario = $('#usuarioCorredor').val();
            $.ajax({
                type: "POST",
                url: 'crudCorredores.php',
                datatype: "json",
                data: { usuario: usuario, opcion: 6 },
                success: function(data) {
                    var datos = JSON.parse(data)
                    if (datos != '') {
                        Swal.fire({
                            title: 'Usuario Repetido',
                            text: 'Este usuario ya existe, por favor reintente.',
                            icon: 'error',
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'OK'
                        }).then(function() {
                            $('#usuarioCorredor').val('');
                        });
                    }
                }
            })
        }
    });

    //Ocultar Sidebar Searchbox Resolucion < 450px || CORREDORES
    $(document).on("click", "div#tablaCorredores_filter label input", function() {
        if (screen.width <= 450) {
            estadoSidebar = $("#accordionSidebar").attr("class");
            if (estadoSidebar == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                $("#sidebarToggleTop").click();
            }
        }
    });
});