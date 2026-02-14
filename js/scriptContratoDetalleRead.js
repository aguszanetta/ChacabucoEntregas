$(document).ready(function() {
    const urlParametro = new URLSearchParams(window.location.search);
    const parametro = Object.fromEntries(urlParametro.entries());
    var flag = true;

    tablaContratoDetalleRead = $('#tablaContratoDetalleRead').DataTable({
        "ajax": {
            "url": "crudContratosRead.php",
            "method": 'POST',
            "data": { idContrato: parametro.id, opcion: 3 },
            "dataSrc": ""
        },
        "initComplete": function(settings, json) {
            cargarDetalleRead(flag, parametro);
        },
        "columns": [
            { "data": "idCamion", "visible": false, "searchable": false },
            { "data": "cartaPorte" },
            { "data": "pesoProc" },
            { "data": "patente", "visible": false },
            { "data": "granel", "visible": false },
            { "data": "bruto" },
            { "data": "tara" },
            { "data": "neto" },
            { "data": "humedad" },
            { "data": "merma" },
            { "data": "descuento" },
            { "data": "netoFinal" },
            { "data": "observaciones", "visible": false },
            {
                "data": "fecha",
                "width": "10%",
                "render": function(data) {
                    return moment(data).format('DD-MM-YYYY');
                }
            },
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-outline-secondary btn-sm btnPDF-vacio'><i class='material-icons'>picture_as_pdf</i></button><button id='btnContratoDetalleDRead' class='btn btn-info btn-sm'><i class='material-icons'>info</i></button></div></div>",
                "searchable": false,
                "width": "10%"
            }
        ],
        "columnDefs": [{
            "targets": 14,
            "data": "archivosHash",
            "render": function(data, type, row) {
                if (data != "") {
                    return "<div class='text-center'><div class='btn-group'><button class='btn btn-secondary btn-sm btnPDF-subido' data-url='" + data + "'><i class='material-icons'>picture_as_pdf</i></button><button id='btnContratoDetalleDRead' class='btn btn-info btn-sm'><i class='material-icons'>info</i></button></div></div>"
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
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
                title: 'Chacabuco Entregas SH',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info',
                messageTop: function() {
                    return cargarDetalleRead(false);
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
                title: 'Chacabuco Entregas SH',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success',
                messageTop: function() {
                    return cargarDetalleRead(false);
                }
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
                title: 'Chacabuco Entregas SH',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'A4',
                messageTop: function() {
                    return cargarDetalleRead();
                },
                customize: function(doc) {
                    doc.styles.tableHeader.fillColor = '#ffffff',
                        doc.styles.tableHeader.color = '#000000',
                        doc.styles.tableBodyOdd.fillColor = '#ffffff',
                        doc.content[1].fontSize = 11,
                        doc.content[1].margin = [50, 0, 0, 10],
                        doc.content[2].margin = [50, 0, 50, 0], //left, top, right, bottom
                        doc.content[2].layout = {
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

    //Detalle
    $(document).on("click", "#btnContratoDetalleDRead", function() {
        fila = $(this).closest("tr");
        data = $('#tablaContratoDetalleRead').DataTable().row(fila).data();
        patente = data['patente'];
        granel = data['granel'];
        observaciones = data['observaciones'];

        $('#info00ContratoDRead').html(patente);
        $('#info01ContratoDRead').html(granel);
        $('#info02ContratoDRead').html(observaciones);
        $("#headerContratoDRead").css("background-color", "#17a2b8");
        $("#headerContratoDRead").css("color", "white");
        $("#titleContratoDRead").text("Detalle Camión");
        $('#modalContratoDRead').modal('show');
    });

    //Ocultar Sidebar Searchbox Resolucion < 450px || CONTRATO DETALLE READ
    $(document).on("click", "div#tablaContratoDetalleRead_filter label input", function() {
        if (screen.width <= 450) {
            estadoSidebar = $("#accordionSidebar").attr("class");
            if (estadoSidebar == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                $("#sidebarToggleTop").click();
            }
        }
    });

});

function cargarDetalleRead(flag, parametro) {
    if (flag == true) {
        $.ajax({
            url: "crudContratosRead.php",
            type: "POST",
            datatype: "json",
            data: { idContrato: parametro.id, opcion: 2 },
            success: function(data) {
                var datos = JSON.parse(data);
                if (datos != '') {
                    numero = datos[0].numero;
                    cliente = datos[0].nombre;
                    cereal = datos[0].cereal;
                    comprador = datos[0].comprador;
                    corredor = datos[0].corredor;
                    toneladas = datos[0].toneladas;
                    cantCamiones = tablaContratoDetalleRead.rows().count();
                    netosSumados = datos[0].netosSumados;
                    netosFinalesSumados = datos[0].netosFinalesSumados;
                    $('#contratoDetR').text('Contrato N°: ' + numero);
                    $('#clienteDetR').text('Señor (es): ' + cliente);
                    $('#cerealDetR').text('Cereal: ' + cereal);
                    $('#compradorDetR').text('Comprador: ' + comprador);
                    $('#corredorDetR').text('Corredor: ' + corredor);
                    $('#toneladasDetR').text('Toneladas: ' + toneladas);
                    $('#cantCamionesDetR').text('Cantidad de Camiones: ' + cantCamiones);
                    $('#netosSumadosDetR').text('Netos Sumados: ' + netosSumados);
                    $('#netosFinalesSumadosDetR').text('Netos Finales Sumados: ' + netosFinalesSumados);
                }

            }
        });
    } else if (flag == false) {
        return 'Contrato N° ' + numero + ' - Señor (es): ' + cliente + ' - Cereal: ' + cereal + ' - Comprador: ' + comprador + ' - Corredor: ' + corredor +
            ' - Toneladas: ' + toneladas + ' - Cantidad de Camiones: ' + cantCamiones + ' - Netos Sumados: ' + netosSumados + ' - Netos Finales Sumados: ' + netosFinalesSumados;
    } else {
        return '\r\n Contrato N° ' + numero +
            '\r\n Señor (es): ' + cliente +
            '\r\n Comprador: ' + comprador +
            '\r\n Corredor: ' + corredor +
            '\r\n Toneladas: ' + toneladas +
            '\r\n Cantidad de Camiones: ' + cantCamiones +
            '\r\n Netos Sumados: ' + netosSumados +
            '\r\n Netos Finales Sumados: ' + netosFinalesSumados;
    };
}