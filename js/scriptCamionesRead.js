$(document).ready(function() {
    tablaCamionesRead = $('#tablaCamionesRead').DataTable({
        "ajax": {
            "url": "crudCamionesRead.php",
            "method": 'POST',
            "dataSrc": ""
        },
        "columns": [
            { "data": "idCamion", "visible": false, "searchable": false },
            { "data": "contrato" },
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
                "render": function(data, type, full) {
                    if (type == 'display' || type == 'filter') {
                        return moment(data).format('DD-MM-YYYY');
                    } else {
                        return moment(data).format('YYYY-MM-DD');
                    }
                }
            },
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-outline-secondary btn-sm btnPDF-vacio'><i class='material-icons'>picture_as_pdf</i></button><button class='btn btn-info btn-sm btnCamionDetalleRead'><i class='material-icons'>info</i></button></div></div>",
                "searchable": false,
                "width": "10%"
            }
        ],
        "columnDefs": [{
            "targets": 15,
            "data": "archivosHash",
            "render": function(data, type, row) {
                if (data != "") {
                    return "<div class='text-center'><div class='btn-group'><a id='aPDF' target='_blank' href='" + data + "'><button class='btn btn-secondary btn-sm btnPDF-subido'><i class='material-icons'>picture_as_pdf</i></button></a><button class='btn btn-info btn-sm btnCamionDetalleRead'><i class='material-icons'>info</i></button></div></div>"
                }
            }
        }],
        "order": [
            [14, "desc"]
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
                className: 'btn btn-info',
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Camiones Chacabuco Entregas SH',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success',
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Camiones Chacabuco Entregas SH',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'A4',
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

    //Detalle
    $(document).on("click", ".btnCamionDetalleRead", function() {
        fila = $(this).closest("tr");
        data = $('#tablaCamionesRead').DataTable().row(fila).data();
        patente = data['patente'];
        granel = data['granel'];
        observaciones = data['observaciones'];

        $('#info00CamionDRead').html(patente);
        $('#info01CamionDRead').html(granel);
        $('#info02CamionDRead').html(observaciones);
        $("#headerCamionDRead").css("background-color", "#17a2b8");
        $("#headerCamionDRead").css("color", "white");
        $("#titleCamionDRead").text("Detalle Camión");
        $('#modalCamionDRead').modal('show');
    });

    //Ocultar Sidebar Searchbox Resolucion < 450px || CONTRATO DETALLE
    $(document).on("click", "div#tablaCamionesRead_filter label input", function() {
        if (screen.width <= 450) {
            estadoSidebar = $("#accordionSidebar").attr("class");
            if (estadoSidebar == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                $("#sidebarToggleTop").click();
            }
        }
    });
});