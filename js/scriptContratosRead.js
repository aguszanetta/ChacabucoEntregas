$(document).ready(function() {
    var opcion;
    rol = $('#rol').text();

    if (rol == 'cliente') {
        opcion = 1;
    } else if (rol == 'corredor') {
        opcion = 4;
    } else {
        console.log("Admin");
    }

    tablaContratosRead = $('#tablaContratosRead').DataTable({
        "ajax": {
            "url": "crudContratosRead.php",
            "method": 'POST',
            "data": { opcion: opcion },
            "dataSrc": ""
        },
        "columns": [
            { "data": "idContrato", "visible": false, "searchable": false },
            {
                "data": "numero",
                "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<a href='../php/contratoDetalleRead.php?id=" + oData.idContrato + "'>" + oData.numero + "</a>");
                }
            },
            { "data": "cliente" },
            { "data": "cereal" },
            { "data": "toneladas" },
            { "data": "netosSumados" },
            { "data": "netosFinalesSumados" },
            { "data": "comprador" },
            { "data": "corredor" },
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

    //Ocultar Sidebar Searchbox Resolucion < 450px || CONTRATOS READ
    $(document).on("click", "div#tablaContratosRead_filter label input", function() {
        if (screen.width <= 450) {
            estadoSidebar = $("#accordionSidebar").attr("class");
            if (estadoSidebar == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                $("#sidebarToggleTop").click();
            }
        }
    });
});