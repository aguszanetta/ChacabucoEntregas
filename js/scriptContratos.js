$(document).ready(function() {
    var idContrato, opcion;
    arrayIdClientes = [];
    arrayIdCorredores = [];

    tablaContratosA = $('#tablaContratosA').DataTable({
        "ajax": {
            "url": "crudContratos.php",
            "method": 'POST',
            "data": { opcion: 4 },
            "dataSrc": ""
        },
        "columns": [
            { "data": "idContrato", "visible": false, "searchable": false },
            {
                "data": "numero",
                "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<a href='../php/contratoDetalle.php?id=" + oData.idContrato + "'>" + oData.numero + "</a>");
                }
            },
            { "data": "cliente" },
            { "data": "cereal" },
            { "data": "toneladas" },
            { "data": "netosSumados" },
            { "data": "netosFinalesSumados" },
            { "data": "comprador" },
            { "data": "corredor" },
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditarCA'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrarCA'><i class='material-icons'>delete</i></button><button class='btn btn-success btn-sm btnCheckCA'><i class='material-icons'>check</i></button></div></div>",
                "width": "10%"
            }
        ],
        "order": [
            [0, "desc"]
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ contratos",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando contratos del _START_ al _END_ de un total de _TOTAL_ contratos",
            "infoEmpty": "Mostrando contratos del 0 al 0 de un total de 0 contratos",
            "infoFiltered": "(filtrado de un total de _MAX_ contratos)",
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
                title: 'Contratos Chacabuco Entregas SH',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                title: 'Contratos Chacabuco Entregas SH',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                title: 'Contratos Chacabuco Entregas SH',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL',
                customize: function(doc) {
                    doc.styles.tableHeader.fillColor = '#ffffff',
                        doc.styles.tableHeader.color = '#000000',
                        doc.styles.tableBodyOdd.fillColor = '#ffffff',
                        doc.content[1].margin = [100, 0, 50, 0], //left, top, right, bottom
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
    $('#formContratos').submit(function(e) {
        e.preventDefault();
        numero = $.trim($('#numero').val());
        cereal = $("#cereal").val();
        toneladas = $.trim($('#toneladas').val());
        comprador = $('#comprador')[0].selectize.getItem($('#comprador')[0].selectize.getValue()).text();
        corredorID = arrayIdCorredores[$('#corredor').val()];

        //corredor = $.trim($('#corredor').val());
        clienteID = arrayIdClientes[$('#cliente').val()];

        $.ajax({
            url: "crudContratos.php",
            type: "POST",
            datatype: "json",
            data: {
                idContrato: idContrato,
                numero: numero,
                toneladas: toneladas,
                comprador: comprador,
                corredorID: corredorID,
                clienteID: clienteID,
                cerealID: cereal,
                opcion: opcion
            },
            success: function(data) {
                tablaContratosA.ajax.reload(null, false);
            }
        });
        $('#modalCRUD').modal('hide');
    });

    //Alta
    $("#btnNuevoContratoA").click(function() {
        cargarClientes();
        cargarCorredores();
        opcion = 1;
        idContrato = null;
        $('#cereal')[0].selectize.clear();
        $('#comprador')[0].selectize.clear();
        $("#formContratos").trigger("reset");
        $("#modalForm").css("background-color", "#17a2b8");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Alta de Contrato");
        $('#modalCRUD').modal('show');
    });

    //Editar       
    $(document).on("click", ".btnEditarCA", function() {
        opcion = 2;
        fila = $(this).closest("tr");
        data = $('#tablaContratosA').DataTable().row(fila).data();
        idContrato = data['idContrato'];
        cliente = data['cliente'];
        cereal = data['cereal'];
        numero = data['numero'];
        toneladas = data['toneladas'];
        comprador = data['comprador'];
        corredor = data['corredor'];

        $('#cereal')[0].selectize.setValue($('#cereal')[0].selectize.search(cereal).items[0].id);

        if (comprador == '') {
            $('#comprador')[0].selectize.setValue(0);
        } else {
            $('#comprador')[0].selectize.setValue($('#comprador')[0].selectize.search(comprador).items[0].id);
        }


        cargarClientes(cliente);
        cargarCorredores(corredor);

        $("#numero").val(numero);
        $("#toneladas").val(toneladas);
        $("#comprador").val(comprador); +
        $("#modalForm").css("background-color", "#007bff");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Editar Contrato");
        $('#modalCRUD').modal('show');
    });


    //Borrar
    $(document).on("click", ".btnBorrarCA", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaContratosA').DataTable().row(fila2).data();
        idContrato = data['idContrato'];
        opcion = 3; //Eliminar        
        Swal.fire({
            title: '¿Seguro?',
            text: "¿Estas seguro de borrar el contrato?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borralo',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                promise = $.ajax({
                    url: "crudContratos.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: 11, idContrato: idContrato },
                    success: function(data) {
                        datos = JSON.parse(data)
                        if (datos[0].existe == 1) {
                            Swal.fire({
                                title: 'Error al borrar el contrato',
                                text: 'No puedes borrar un contrato si tienes camiones asociados a el',
                                icon: 'warning'
                            });
                        } else {
                            promise.then(function() {
                                $.ajax({
                                    url: "crudContratos.php",
                                    type: "POST",
                                    datatype: "json",
                                    data: { opcion: opcion, idContrato: idContrato },
                                    success: function(data) {
                                        tablaContratosA.row(fila.parents('tr')).remove().draw();
                                        Swal.fire(
                                            '¡Borrado!',
                                            'El contrato ha sido borrado.',
                                            'success'
                                        );

                                    }
                                });
                            })

                        }
                    }
                });
            }
        })
    });

    //Check
    $(document).on("click", ".btnCheckCA", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaContratosA').DataTable().row(fila2).data();
        idContrato = data['idContrato'];
        opcion = 5; //Pasar a tabla historico 
        Swal.fire({
            title: '¿Seguro?',
            text: "¿Estas seguro que el contrato finalizó?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, fue completado',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "crudContratos.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: opcion, idContrato: idContrato },
                    success: function() {
                        tablaContratosA.row(fila.parents('tr')).remove().draw();
                    }
                });
                Swal.fire(
                    '¡Archivado!',
                    'El contrato ha sido enviado a contratos históricos.',
                    'success'
                );
            }
        })
    });

    $('#cliente').selectize({
        create: false,
        sortField: {
            field: 'value',
            direction: 'asc'
        }
    });

    $('#cereal').selectize({
        create: false,
        sortField: {
            field: 'value',
            direction: 'asc'
        }

    });

    $('#comprador').selectize({
        create: false,
        sortField: {
            field: 'value',
            direction: 'asc'
        }

    });

    $('#corredor').selectize({
        create: false,
        sortField: {
            field: 'value',
            direction: 'asc'
        }

    });

    /*------------------------------CONTRATO HISTORICO------------------------------*/
    tablaContratosH = $('#tablaContratosH').DataTable({
        "ajax": {
            "url": "crudContratos.php",
            "method": 'POST',
            "data": { opcion: 9 },
            "dataSrc": ""
        },
        "columns": [
            { "data": "idContrato", "visible": false, "searchable": false },
            {

                "data": "numero",
                "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<a href='../php/contratoDetalle.php?id=" + oData.idContrato + "'>" + oData.numero + "</a>");
                }
            },

            { "data": "cliente" },
            { "data": "cereal" },
            { "data": "toneladas" },
            { "data": "netosSumados" },
            { "data": "netosFinalesSumados" },
            { "data": "comprador" },
            { "data": "corredor" },
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnVolver'><i class='material-icons'>reply</i></button></div></div>",
                "width": "10%"
            }
        ],
        "order": [
            [0, "descon"]
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ contratos",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando contratos del _START_ al _END_ de un total de _TOTAL_ contratos",
            "infoEmpty": "Mostrando contratos del 0 al 0 de un total de 0 contratos",
            "infoFiltered": "(filtrado de un total de _MAX_ contratos)",
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
                title: 'Contratos Historicos Chacabuco Entregas SH',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                title: 'Contratos Historicos Chacabuco Entregas SH',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                title: 'Contratos Historicos Chacabuco Entregas SH',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL',
                customize: function(doc) {
                    doc.styles.tableHeader.fillColor = '#ffffff',
                        doc.styles.tableHeader.color = '#000000',
                        doc.styles.tableBodyOdd.fillColor = '#ffffff',
                        doc.content[1].margin = [100, 0, 50, 0], //left, top, right, bottom
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

    //Pasar contrato a Activo
    $(document).on("click", ".btnVolver", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaContratosH').DataTable().row(fila2).data();
        idContrato = data['idContrato'];
        opcion = 10; //Pasar a tabla activo 
        Swal.fire({
            title: '¿Seguro?',
            text: "¿Estas seguro que quiere enviar el contrato a Contratos Activos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, enviarlo',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "crudContratos.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: opcion, idContrato: idContrato },
                    success: function() {
                        tablaContratosH.row(fila.parents('tr')).remove().draw();
                    }
                });
                Swal.fire(
                    '¡Enviado!',
                    'El contrato ha sido enviado a contratos activos.',
                    'success'
                );
            }
        })
    });

    //Ocultar Sidebar Searchbox Resolucion < 450px || CONTRATOS ACTIVOS
    $(document).on("click", "div#tablaContratosA_filter label input", function() {
        if (screen.width <= 450) {
            estadoSidebar = $("#accordionSidebar").attr("class");
            if (estadoSidebar == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                $("#sidebarToggleTop").click();
            }
        }
    });
    //Ocultar Sidebar Searchbox Resolucion < 450px || CONTRATOS HISTORICOS
    $(document).on("click", "div#tablaContratosH_filter label input", function() {
        if (screen.width <= 450) {
            estadoSidebar = $("#accordionSidebar").attr("class");
            if (estadoSidebar == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                $("#sidebarToggleTop").click();
            }
        }
    });

});

function cargarClientes(cliente) {
    //Cargar desplegable CLIENTES
    $.ajax({
        type: "POST",
        url: 'crudContratos.php',
        datatype: "json",
        data: { opcion: 6 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            arrayIdClientes = [];
            while (i < datos.length) {
                $('#cliente')[0].selectize.addOption({ value: i, text: datos[i].nombre });
                $('#cliente')[0].selectize.addItem(i);
                arrayIdClientes.push(datos[i].idCliente);
                i = i + 1;
            };
            $('#cliente')[0].selectize.clear();
            //Carga los datos del form al Editar
            if (cliente != null) {
                valorCliente = $("div.option:contains(" + cliente + ")").attr('data-value');
                $('#cliente')[0].selectize.setValue(valorCliente);
            }
        }
    });
};

function cargarCorredores(corredor) {
    //Cargar desplegable CORREDORES
    $.ajax({
        type: "POST",
        url: 'crudContratos.php',
        datatype: "json",
        data: { opcion: 12 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            arrayIdCorredores = [];
            while (i < datos.length) {
                $('#corredor')[0].selectize.addOption({ value: i, text: datos[i].nombre });
                $('#corredor')[0].selectize.addItem(i);
                arrayIdCorredores.push(datos[i].idCorredor);
                i = i + 1;
            };
            $('#corredor')[0].selectize.clear();
            //Carga los datos del form al Editar
            if (corredor != null) {
                valorCorredor = $("div.option:contains(" + corredor + ")").attr('data-value');
                $('#corredor')[0].selectize.setValue(valorCorredor);
            }
        }
    });
};