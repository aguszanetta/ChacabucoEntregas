$(document).ready(function() {
    var idCamion, opcion;
    arrayIdContratos = [];
    humedadID = '';
    mermaID = '';
    bandera = 'Alta';
    archivos = '';
    archivosHash = '';

    tablaCamionesA = $('#tablaCamionesA').DataTable({
        "ajax": {
            "url": "crudCamiones.php",
            "method": 'POST',
            "data": { opcion: 4 },
            "dataSrc": ""
        },
        "columns": [
            { "data": "idCamion", "visible": false, "searchable": false },
            { "data": "contrato" },
            { "data": "cartaPorte" },
            { "data": "pesoProc", "searchable": false },
            { "data": "patente", "visible": false, "searchable": false },
            { "data": "granel", "visible": false, "searchable": false },
            { "data": "bruto", "searchable": false },
            { "data": "tara", "searchable": false },
            { "data": "neto", "searchable": false },
            { "data": "humedad", "searchable": false },
            { "data": "merma", "searchable": false },
            { "data": "descuento", "searchable": false },
            { "data": "netoFinal", "searchable": false },
            { "data": "observaciones", "visible": false, "searchable": false },
            {
                "data": "fecha",
                "width": "25%",
                "render": function(data) {
                    return moment(data).format('DD-MM-YYYY');
                }
            },
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-outline-secondary btn-sm btnPDF-vacio'><i class='material-icons'>picture_as_pdf</i></button><button class='btn btn-info btn-sm btnDetalleCamion'><i class='material-icons'>info</i></button><button class='btn btn-primary btn-sm btnEditarCamion'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrarCamion'><i class='material-icons'>delete</i></button><button class='btn btn-success btn-sm btnCheckCamion'><i class='material-icons'>check</i></button></div></div>",
                "searchable": false,
                "width": "10%"
            }
        ],
        "columnDefs": [{
            "targets": 15,
            "data": "archivosHash",
            "render": function(data, type, row) {
                if (data != "") {
                    return "<div class='text-center'><div class='btn-group'><button class='btn btn-secondary btn-sm btnPDF-subido' data-url='" + data + "'><i class='material-icons'>picture_as_pdf</i></button><button class='btn btn-info btn-sm btnDetalleCamion'><i class='material-icons'>info</i></button><button class='btn btn-primary btn-sm btnEditarCamion'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrarCamion'><i class='material-icons'>delete</i></button><button class='btn btn-success btn-sm btnCheckCamion'><i class='material-icons'>check</i></button></div></div>"
                }
            }
        }],
        "order": [
            [0, "desc"]
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ camiones",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando camiones del _START_ al _END_ de un total de _TOTAL_ camiones",
            "infoEmpty": "Mostrando camiones del 0 al 0 de un total de 0 camiones",
            "infoFiltered": "(filtrado de un total de _MAX_ camiones)",
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
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Camiones Chacabuco Entregas SH',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Camiones Chacabuco Entregas SH',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Camiones Chacabuco Entregas SH',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL',
                customize: function(doc) {
                    doc.styles.tableHeader.fillColor = '#ffffff',
                        doc.styles.tableHeader.color = '#000000',
                        doc.styles.tableBodyOdd.fillColor = '#ffffff',
                        doc.content[1].margin = [50, 0, 50, 0], //left, top, right, bottom
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
    $('#formCamiones').submit(async function(e) {
        e.preventDefault();
        contratoID = arrayIdContratos[$('#contrato').val()];
        cartaPorte = $.trim($('#cartaPorte').val());
        pesoProc = $.trim($('#pesoProc').val());
        patente = $.trim($('#patente').val());
        granel = $.trim($('#granel').val());
        bruto = $.trim($('#bruto').val());
        tara = $.trim($('#tara').val());
        neto = bruto - tara;
        humedad = $.trim($('#humedad').val());
        merma = $.trim($('#merma').val());
        descuento = $.trim($('#descuento').val());
        observaciones = $.trim($('#observaciones').val());
        fecha = $.trim($('#fecha').val());
        if (bandera == 'Editar' && humedadID == '') { //Editar y no se tocó la humendad, para no hacer toda la tramoya
            console.log("Editar")
            promise = $.ajax({
                type: "POST",
                url: 'crudCamiones.php',
                datatype: "json",
                data: { idContrato: contratoID, humedad: humedad, opcion: 7 },
                success: function(data) {
                    var datos = JSON.parse(data);
                    humedadID = datos[0].idHumedad;
                    mermaID = datos[0].idMerma;
                    comprador = datos[0].comprador;
                    if (comprador == 'ARDION S.A.') {
                        netoFinal = ((neto - ((neto * merma) / 100)) * (100 - descuento)) / 100;

                    } else {
                        netoFinal = neto - ((neto * descuento) / 100) - ((neto * merma) / 100);
                    }
                }
            });
            promise.then(function() {
                $.ajax({
                    url: "crudCamiones.php",
                    type: "POST",
                    datatype: "json",
                    data: {
                        idCamion: idCamion,
                        cartaPorte: cartaPorte,
                        pesoProc: pesoProc,
                        patente: patente,
                        granel: granel,
                        bruto: bruto,
                        tara: tara,
                        neto: neto,
                        descuento: descuento,
                        netoFinal: netoFinal,
                        observaciones: observaciones,
                        fecha: fecha,
                        archivos: archivos,
                        archivosHash: archivosHash,
                        contratoID: contratoID,
                        humedadID: humedadID,
                        mermaID: mermaID,
                        opcion: opcion
                    },
                    success: function(data) {
                        tablaCamionesA.ajax.reload(null, false);
                    }
                });
            })
        } else if ((bandera == 'Alta') || (bandera == 'Editar')) {
            promise = $.ajax({
                type: "POST",
                url: 'crudCamiones.php',
                datatype: "json",
                data: { idContrato: contratoID, opcion: 13 },
                success: function(data) {
                    var datos = JSON.parse(data);
                    if (datos[0].comprador == 'ARDION S.A.') {
                        netoFinal = ((neto - Math.round(((neto * merma) / 100))) * (100 - descuento)) / 100;
                    } else {
                        netoFinal = neto - ((neto * descuento) / 100) - ((neto * merma) / 100);
                    }
                }
            });
            promise.then(function() {
                $.ajax({
                    url: "crudCamiones.php",
                    type: "POST",
                    datatype: "json",
                    data: {
                        idCamion: idCamion,
                        cartaPorte: cartaPorte,
                        pesoProc: pesoProc,
                        patente: patente,
                        granel: granel,
                        bruto: bruto,
                        tara: tara,
                        neto: neto,
                        descuento: descuento,
                        netoFinal: netoFinal,
                        observaciones: observaciones,
                        fecha: fecha,
                        archivos: archivos,
                        archivosHash: archivosHash,
                        contratoID: contratoID,
                        humedadID: humedadID,
                        mermaID: mermaID,
                        opcion: opcion
                    },
                    success: function(data) {
                        tablaCamionesA.ajax.reload(null, false);
                    }
                });
            });
        } else {
            console.log('Bandera vacía');
        }
        $('#modalCRUD').modal('hide');
    });

    //Alta
    $("#btnNuevoCamion").click(function() {
        opcion = 1;
        idCamion = null;
        bandera = 'Alta';
        archivos = ''
        archivosHash = '';
        cargarContratos();

        $("#formCamiones").trigger("reset");
        $("#file").val('')
        $("#archivosLabel").html('Seleccione Archivo');
        $("#btnBorrarArchivo").css('display', 'none');
        fechaHoy = moment(new Date()).format("YYYY-MM-DD");
        $('#fecha').val(fechaHoy);

        $("#modalForm").css("background-color", "#17a2b8");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Alta de Camión");
        $('#modalCRUD').modal('show');
    });

    //Editar
    $(document).on("click", ".btnEditarCamion", function() {
        opcion = 2;
        bandera = 'Editar';
        humedadID = '';
        fila = $(this).closest("tr");
        data = $('#tablaCamionesA').DataTable().row(fila).data();
        idCamion = data['idCamion'];
        contrato = data['contrato'];
        cartaPorte = data['cartaPorte'];
        pesoProc = data['pesoProc'];
        patente = data['patente'];
        granel = data['granel'];
        bruto = data['bruto'];
        tara = data['tara'];
        humedad = data['humedad'];
        merma = data['merma'];
        descuento = data['descuento']
        netoFinal = data['netoFinal'];
        observaciones = data['observaciones'];
        fecha = data['fecha'];
        archivos = data['archivos'];
        archivosHash = data['archivosHash'];

        if (archivos == '') {
            $("#btnBorrarArchivo").css('display', 'none');
            $("#archivosLabel").html('Seleccione Archivo');
        } else {
            $("#btnBorrarArchivo").css('display', 'block');
            $("#archivosLabel").html(archivos);
        }

        cargarContratos(contrato);

        $("#cartaPorte").val(cartaPorte);
        $("#pesoProc").val(pesoProc);
        $("#patente").val(patente);
        $("#granel").val(granel);
        $("#bruto").val(bruto);
        $("#tara").val(tara);
        $("#humedad").val(humedad);
        $("#merma").val(merma);
        $("#descuento").val(descuento);
        $("#netoFinal").val(netoFinal);
        $("#observaciones").val(observaciones);
        $("#fecha").val(fecha);
        $("#modalForm").css("background-color", "#007bff");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Editar Camión");
        $('#modalCRUD').modal('show');
    });

    //Borrar
    $(document).on("click", ".btnBorrarCamion", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaCamionesA').DataTable().row(fila2).data();
        idCamion = data['idCamion'];
        opcion = 3; //Eliminar        
        Swal.fire({
            title: '¿Seguro?',
            text: "¿Estas seguro de borrar el camión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borralo',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "crudCamiones.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: opcion, idCamion: idCamion },
                    success: function() {
                        tablaCamionesA.row(fila.parents('tr')).remove().draw();
                    }
                });
                Swal.fire(
                    '¡Borrado!',
                    'El camión ha sido borrado.',
                    'success'
                )
            }
        })
    });

    //Detalle
    $(document).on("click", ".btnDetalleCamion", function() {
        fila = $(this).closest("tr");
        data = $('#tablaCamionesA').DataTable().row(fila).data();
        patente = data['patente'];
        granel = data['granel'];
        observaciones = data['observaciones'];

        $('#info00CamionA').html(patente);
        $('#info01CamionA').html(granel);
        $('#info02CamionA').html(observaciones);
        $("#headerDetalleA").css("background-color", "#17a2b8");
        $("#headerDetalleA").css("color", "white");
        $("#titleDetalleA").text("Detalle Camión");
        $('#modalDetalleA').modal('show');
    });

    //Check
    $(document).on("click", ".btnCheckCamion", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaCamionesA').DataTable().row(fila2).data();
        idCamion = data['idCamion'];
        opcion = 5; //Pasar a tabla historico 
        Swal.fire({
            title: '¿Seguro?',
            text: "¿Estas seguro que el camión finalizó?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, fue completado',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "crudCamiones.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: opcion, idCamion: idCamion },
                    success: function() {
                        tablaCamionesA.row(fila.parents('tr')).remove().draw();
                    }
                });
                Swal.fire(
                    '¡Archivado!',
                    'El camión ha sido enviado a camión históricos.',
                    'success'
                );
            }
        })
    });

    //Carta Porte Subida
    $(document).on("click", ".btnPDF-subido", function() {
        var urlArchivo = $(this).attr("data-url"); 
        var nombreArchivo = urlArchivo.substring(urlArchivo.lastIndexOf('/') + 1).split('.')[0];

        $.ajax({
            url: urlArchivo,
            type: 'HEAD', 
            success: function() {
                window.open(urlArchivo, '_blank');
            },
            error: function() {
                Swal.fire({
                title: 'Archivo no disponible',
                html: "¡Atención! El archivo no se encuentra disponible.<br>" +
                      "<strong>Cod. Referencia:</strong> " + nombreArchivo + "<br>" +
                      "Por favor, contacte con la administración.",
                icon: 'info'
                })
            }
        });
    });


    //Carta Porte Vacia
    $(document).on("click", ".btnPDF-vacio", function() {
        Swal.fire({
            title: 'Nada para mostrar',
            text: 'Aún no se ha subido la carta de porte',
            icon: 'info'
        })
    });

    $(document).on("change", "#file", function() {
        $("#btnBorrarArchivo").css('display', 'block');
        // Comprueba si se selecciono un archivo
        fd = new FormData();
        files = $('#file')[0].files;
        if (files.length > 0) {
            archivos = files[0].name;
            fd.append('file', files[0]);

            $.ajax({
                url: 'upload.php',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response) {
                    if (response != 0) {
                        archivosHash = response;
                    } else {
                        alert('El archivo no se ha cargado');
                    }
                },
            });
        } else {
            archivos = archivos;
            archivosHash = archivosHash;
        }
    });

    $(document).on("click", "#btnBorrarArchivo", function() {
        borrarArchivo(idCamion, archivosHash);
    })

    $(document).on("keyup", "#humedad", function() {
        //Cargar MERMA en el Alta
        humedadValor = $('#humedad').val();
        idContrato = arrayIdContratos[$('#contrato').val()];

        $.ajax({
            type: "POST",
            url: 'crudCamiones.php',
            datatype: "json",
            data: { idContrato: idContrato, humedad: humedadValor, opcion: 7 },
            success: function(data) {
                var datos = JSON.parse(data);
                if (datos == '') {
                    $('#merma').val('');
                } else {
                    $('#merma').val(datos[0].porcentajeM);
                    humedadID = datos[0].idHumedad;
                    mermaID = datos[0].idMerma;
                }
            }
        })
    });

    //Enviar los camiones a historico segun el mes
    $(document).on("click", "#btnCamionMes", function() {
        $("#mes").val('');
        $("#headerCamionMes").css("background-color", "red");
        $("#headerCamionMes").css("color", "white");
        $("#titleCamionMes").text("Archivar Camiones");
        $('#modalCamionMes').modal('show');
    });

    $('#formMes').submit(function(e) {
        e.preventDefault();
        mesAño = $("#mes").val();
        cut = mesAño.split('-');
        mes = cut[1];
        año = cut[0];

        $.ajax({
            url: "crudCamiones.php",
            type: "POST",
            datatype: "json",
            data: { opcion: 8, mes: mes, año: año },
            success: function() {
                tablaCamionesA.ajax.reload(null, true);
            }
        });
        $('#modalCamionMes').modal('hide');
        Swal.fire(
            '¡Archivado!',
            'Los camiones han sido enviados a Camiones Historicos.',
            'success'
        );
    });

    //Contrato Desplegable
    $('#contrato').selectize({
        create: false,
        sortField: {
            field: 'value',
            direction: 'asc'
        },
    });

    // Agregue el siguiente código si desea que el nombre del archivo aparezca en seleccionar
    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    /*------------------------------------CAMION HISTORICO------------------------------------*/
    tablaCamionesH = $('#tablaCamionesH').DataTable({
        "ajax": {
            "url": "crudCamiones.php",
            "method": 'POST',
            "data": { opcion: 10 },
            "dataSrc": ""
        },
        "columns": [
            { "data": "idCamion", "visible": false, "searchable": false },
            { "data": "contrato" },
            { "data": "cartaPorte" },
            { "data": "pesoProc", "searchable": false },
            { "data": "patente", "visible": false, "searchable": false },
            { "data": "granel", "visible": false, "searchable": false },
            { "data": "bruto", "searchable": false },
            { "data": "tara", "searchable": false },
            { "data": "neto", "searchable": false },
            { "data": "humedad", "searchable": false },
            { "data": "merma", "searchable": false },
            { "data": "descuento", "searchable": false },
            { "data": "netoFinal", "searchable": false },
            { "data": "observaciones", "visible": false, "searchable": false },
            {
                "data": "fecha",
                "width": "25%",
                "render": function(data, type, full) {
                    if (type == 'display' || type == 'filter') {
                        return moment(data).format('DD-MM-YYYY');
                    } else {
                        return moment(data).format('YYYY-MM-DD');
                    }
                }
            },
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-outline-secondary btn-sm btnPDF-vacio'><i class='material-icons'>picture_as_pdf</i></button><button class='btn btn-info btn-sm btnDetalleCamionH'><i class='material-icons'>info</i></button><button class='btn btn-primary btn-sm btnVolverCamion'><i class='material-icons'>reply</i></button></div></div>",
                "searchable": false,
                "width": "10%"
            }
        ],
        "columnDefs": [{
            "targets": 15,
            "data": "archivosHash",
            "render": function(data, type, row) {
                if (data != "") {
                    return "<div class='text-center'><div class='btn-group'><button class='btn btn-secondary btn-sm btnPDF-subido' data-url='" + data + "'><i class='material-icons'>picture_as_pdf</i></button><button class='btn btn-info btn-sm btnDetalleCamionH'><i class='material-icons'>info</i></button><button class='btn btn-primary btn-sm btnVolverCamion'><i class='material-icons'>reply</i></button></div></div>"
                }
            }
        }],
        "order": [
            [0, "desc"],
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ camiones",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando camiones del _START_ al _END_ de un total de _TOTAL_ camiones",
            "infoEmpty": "Mostrando camiones del 0 al 0 de un total de 0 camiones",
            "infoFiltered": "(filtrado de un total de _MAX_ camiones)",
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
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Camiones Chacabuco Entregas SH',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Camiones Chacabuco Entregas SH',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Camiones Chacabuco Entregas SH',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL',
                customize: function(doc) {
                    doc.styles.tableHeader.fillColor = '#ffffff',
                        doc.styles.tableHeader.color = '#000000',
                        doc.styles.tableBodyOdd.fillColor = '#ffffff',
                        doc.content[1].margin = [50, 0, 50, 0], //left, top, right, bottom
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

    //Detalle Historico
    $(document).on("click", ".btnDetalleCamionH", function() {
        fila = $(this).closest("tr");
        data = $('#tablaCamionesH').DataTable().row(fila).data();
        patente = data['patente'];
        granel = data['granel'];
        observaciones = data['observaciones'];

        $('#info00CamionH').html(patente);
        $('#info01CamionH').html(granel);
        $('#info02CamionH').html(observaciones);
        $("#headerDetalleH").css("background-color", "#17a2b8");
        $("#headerDetalleH").css("color", "white");
        $("#titleDetalleH").text("Detalle Camión");
        $('#modalDetalleH').modal('show');
    });

    //Ocultar Sidebar Searchbox Resolucion < 450px || CAMIONES ACTIVOS
    $(document).on("click", "div#tablaCamionesA_filter label input", function() {
        if (screen.width <= 450) {
            estadoSidebar = $("#accordionSidebar").attr("class");
            if (estadoSidebar == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                $("#sidebarToggleTop").click();
            }
        }
    });
    //Ocultar Sidebar Searchbox Resolucion < 450px || CAMIONES HISTORICOS
    $(document).on("click", "div#tablaCamionesH_filter label input", function() {
        if (screen.width <= 450) {
            estadoSidebar = $("#accordionSidebar").attr("class");
            if (estadoSidebar == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                $("#sidebarToggleTop").click();
            }
        }
    });

    //Pasar camion a Activo
    $(document).on("click", ".btnVolverCamion", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaCamionesH').DataTable().row(fila2).data();
        idCamion = data['idCamion'];
        opcion = 12; //Pasar a tabla activo 
        Swal.fire({
            title: '¿Seguro?',
            text: "¿Estas seguro que quiere enviar el camión a Camiones Activos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, enviarlo',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "crudCamiones.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: opcion, idCamion: idCamion },
                    success: function() {
                        tablaCamionesH.row(fila.parents('tr')).remove().draw();
                    }
                });
                Swal.fire(
                    '¡Enviado!',
                    'El camión ha sido enviado a camiones activos.',
                    'success'
                );
            }
        })
    });

});

function cargarContratos(contrato) {
    //Cargar desplegable CONTRATOS
    $.ajax({
        type: "POST",
        url: 'crudCamiones.php',
        datatype: "json",
        data: { opcion: 6 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            while (i < datos.length) {
                $('#contrato')[0].selectize.addOption({ value: i, text: datos[i].numero });
                $('#contrato')[0].selectize.addItem(i);
                arrayIdContratos.push(datos[i].idContrato);
                i = i + 1;
            };
            $('#contrato')[0].selectize.clear();
            //Carga los datos del form al Editar
            if (contrato != null) {
                $('#contrato')[0].selectize.setValue($('#contrato')[0].selectize.search(contrato).items[0].id);
            }
        }
    });

};

function borrarArchivo(idCamion, archivosHash) {

    if (bandera == 'Alta') {
        $("#file").val('');
        limpiarArchivos();
        $("#archivosLabel").html('Seleccione Archivo');
        $("#btnBorrarArchivo").css('display', 'none');
    } else {
        arrayHash = archivosHash.split('/');
        nombreHash = arrayHash[2];

        promise = $.ajax({
            url: 'delete.php',
            type: 'post',
            data: { nombreHash: nombreHash },
            success: function(response) {
                console.log(response)
            },
        });
        promise.then(function() {
            $.ajax({
                type: "POST",
                url: 'crudCamiones.php',
                datatype: "json",
                data: { idCamion: idCamion, opcion: 11 },
                success: function(data) {
                    datos = JSON.parse(data);
                    limpiarArchivos();
                    tablaCamionesA.ajax.reload(null, false);
                }
            });
        });
        $("#file").val('');
        $("#archivosLabel").html('Seleccione Archivo');
        $("#btnBorrarArchivo").css('display', 'none');
    }
};

function limpiarArchivos() {
    archivos = '';
    archivosHash = '';
}