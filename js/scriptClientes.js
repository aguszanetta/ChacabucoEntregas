$(document).ready(function() {
    var idCliente, usuario;
    bandera = '';

    tablaClientes = $('#tablaClientes').DataTable({
        "ajax": {
            "url": "crudClientes.php",
            "method": 'POST',
            "data": { opcion: 4 },
            "dataSrc": ""
        },
        "columns": [
            { "data": "idCliente", "visible": false },
            { "data": "nombre" },
            { "data": "cuit" },
            { "data": "telefono" },
            { "data": "direccion" },
            { "data": "localidad" },
            { "data": "mail" },
            { "data": "usuario" },
            { "data": "observaciones" },
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-secondary btn-sm btnPass'><i class='material-icons'>lock</i></button></div></div>",
                "width": "10%"
            }
        ],
        "order": [
            [0, "desc"]
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ clientes",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando clientes del _START_ al _END_ de un total de _TOTAL_ clientes",
            "infoEmpty": "Mostrando clientes del 0 al 0 de un total de 0 clientes",
            "infoFiltered": "(filtrado de un total de _MAX_ clientes)",
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
                title: 'Clientes Chacabuco Entregas SH',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                title: 'Clientes Chacabuco Entregas SH',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                title: 'Clientes Chacabuco Entregas SH',
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
    $('#formClientes').submit(function(e) {
        e.preventDefault();
        nombre = $.trim($('#nombre').val());
        cuit = $.trim($('#cuit').val());
        telefono = $.trim($('#telefono').val());
        calle = $.trim($('#calle').val());
        numero = $.trim($('#numero').val());
        localidad = $.trim($('#localidad').val());
        mail = $.trim($("#mail").val());
        usuario = $.trim($('#usuario').val());
        password = $.trim($('#password').val());
        observaciones = $.trim($('#observaciones').val());

        if (bandera == 'Alta') {
            $.ajax({
                url: "crudClientes.php",
                type: "POST",
                datatype: "json",
                data: {
                    idCliente: idCliente,
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
                    tablaClientes.ajax.reload(null, false);
                }
            });
        } else if (bandera == 'Editar') {
            $.ajax({
                url: "crudClientes.php",
                type: "POST",
                datatype: "json",
                data: {
                    idCliente: idCliente,
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
                    tablaClientes.ajax.reload(null, false);
                }
            });
        } else {
            console.log("Bandera vacia", bandera);
        }

        $('#modalCRUD').modal('hide');
    });

    $('#formPass').submit(function(e) {
        e.preventDefault();
        password = $('#passwordR').val();

        $.ajax({
            url: "crudClientes.php",
            type: "POST",
            datatype: "json",
            data: {
                usuario: usuario,
                password: password,
                opcion: 5
            },
            success: function(data) {
                tablaClientes.ajax.reload(null, false);
            }
        });
        $('#modalPass').modal('hide');
    });

    //Alta
    $("#btnNuevoCliente").click(function() {
        opcion = 1;
        idCliente = null;
        bandera = 'Alta';
        $("#form-pass").css('display', 'block');
        $('#password').attr('required', 'required');
        $("#formClientes").trigger("reset");
        $("#modalForm").css("background-color", "#17a2b8");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Alta de Cliente");
        $('#modalCRUD').modal('show');
    });

    //Editar        
    $(document).on("click", ".btnEditar", function() {
        opcion = 2;
        bandera = 'Editar';
        fila = $(this).closest("tr");
        data = $('#tablaClientes').DataTable().row(fila).data();
        idCliente = data['idCliente'];
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
        $("#nombre").val(nombre);
        $("#cuit").val(cuit);
        $("#telefono").val(telefono);
        $("#calle").val($.trim(calle));
        $("#numero").val($.trim(numero));
        $("#localidad").val($.trim(localidad));
        $("#mail").val($.trim(mail));
        $("#usuario").val($.trim(usuario));
        $("#form-pass").css('display', 'none');
        $('#password').removeAttr('required');
        $("#observaciones").val(observaciones);
        $("#modalForm").css("background-color", "#007bff");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Editar Cliente");
        $('#modalCRUD').modal('show');
    });

    //Restablecer Contraseña
    $(document).on("click", ".btnPass", function() {
        fila = $(this).closest("tr");
        data = $('#tablaClientes').DataTable().row(fila).data();
        usuario = data["usuario"];
        $("#passwordR").val('');
        $("#headerPass").css("background-color", "grey");
        $("#headerPass").css("color", "white");
        $("#titlePass").text("Restrablecer Contraseña");
        $('#modalPass').modal('show');
    });

    //Mostar/Ocultar Contraseña ALTA
    $("#btn-password").click(function() {
        eye = $('#eye').text();

        if (eye == "visibility") {
            $('#eye').text("visibility_off");
            $('#password').attr('type', 'text');
        } else {
            $('#eye').text("visibility");
            $('#password').attr('type', 'password');
        };
    });

    //Mostar/Ocultar Contraseña RESTABLECER
    $("#btn-passwordR").click(function() {
        eye = $('#eyeR').text();

        if (eye == "visibility") {
            $('#eyeR').text("visibility_off");
            $('#passwordR').attr('type', 'text');
        } else {
            $('#eyeR').text("visibility");
            $('#passwordR').attr('type', 'password');
        };
    });

    $(document).on("focusout", "#usuario", function() {
        if (bandera == 'Alta') {
            usuario = $('#usuario').val();
            $.ajax({
                type: "POST",
                url: 'crudClientes.php',
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
                            $('#usuario').val('');
                        });
                    }
                }
            })
        }
    });

    //Ocultar Sidebar Searchbox Resolucion < 450px || CLIENTES
    $(document).on("click", "div#tablaClientes_filter label input", function() {
        if (screen.width <= 450) {
            estadoSidebar = $("#accordionSidebar").attr("class");
            if (estadoSidebar == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                $("#sidebarToggleTop").click();
            }
        }
    });
});