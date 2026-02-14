$(document).ready(function() {

    var path = window.location.pathname; //CAMBIAR ANTES DE SUBIR ->> /php/indexDashboard.php
    if (path == "/php/indexDashboard.php") {
        cargarData();
        cargarCharts();
    }

});

var myBarChart;

function cargarData() {
    $.ajax({
        type: "POST",
        url: 'crudPanel.php',
        datatype: "json",
        data: { opcion: 1 },
        success: function(data) {
            datos = JSON.parse(data);
            $('#camionesDashM').html(datos[0].camiones);
        }
    }).then(function() {
        return $.ajax({
            type: "POST",
            url: 'crudPanel.php',
            datatype: "json",
            data: { opcion: 2 },
            success: function(data) {
                datos = JSON.parse(data);
                $('#camionesDashA').html(datos[0].camionesA);
            }
        });
    }).then(function() {
        return $.ajax({
            type: "POST",
            url: 'crudPanel.php',
            datatype: "json",
            data: { opcion: 3 },
            success: function(data) {
                datos = JSON.parse(data);
                $('#contratosDash').html(datos[0].contratosA);
            }
        });
    }).then(function() {
        return $.ajax({
            type: "POST",
            url: 'crudPanel.php',
            datatype: "json",
            data: { opcion: 4 },
            success: function(data) {
                datos = JSON.parse(data);
                $('#clientesDash').html(datos[0].clientes);
            }
        });
    });
}


function cargarCharts() {
    var datosMaiz = '';
    var datosTrigo = '';
    var datosSoja = '';
    arrayMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    $.ajax({
        type: "POST",
        url: 'crudPanel.php',
        datatype: "json",
        data: { opcion: 5 },
        success: function(data) {
            datos = JSON.parse(data);
            datosMaiz = datos[0].maiz;
        }
    }).then(function() {
        return $.ajax({
            type: "POST",
            url: 'crudPanel.php',
            datatype: "json",
            data: { opcion: 6 },
            success: function(data) {
                datos = JSON.parse(data);
                datosTrigo = datos[0].trigo;
            }
        });
    }).then(function() {
        return $.ajax({
            type: "POST",
            url: 'crudPanel.php',
            datatype: "json",
            data: { opcion: 7 },
            success: function(data) {
                datos = JSON.parse(data);
                datosSoja = datos[0].soja;
                dibujarPastel(datosMaiz, datosTrigo, datosSoja);
            }
        });
    }).then(function() {
        return $.ajax({
            type: "POST",
            url: 'crudPanel.php',
            datatype: "json",
            data: { opcion: 8, year: currentYear },
            success: function(data) {
                datos = JSON.parse(data);
                for (i = 0; i < datos.length; i++) {
                    arrayMeses[datos[i].mes - 1] = datos[i].camiones;
                }
                dibujarBarChart(arrayMeses);
            }
        });
    });
}

function dibujarPastel(maiz, trigo, soja) {
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Maíz", "Trigo", "Soja"],
            datasets: [{
                data: [maiz, trigo, soja],
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#36b9cc'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });

}

function dibujarBarChart(meses) {
    if(myBarChart){
        myBarChart.destroy();
    }
    var ctx = document.getElementById("myBarChart");
    myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
                "Octubre", "Noviembre", "Diciembre"
            ],
            datasets: [{
                label: "Cantidad",
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "#4e73df",
                barThickness: 30,
                data: [meses[0], meses[1], meses[2], meses[3], meses[4], meses[5], meses[6], meses[7], meses[8], meses[9], meses[10], meses[11]],
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
        }
    });
}

/*-----------------Control de años - Grafico de Barras-----------------*/
currentYear = new Date().getFullYear();
year = currentYear;
$("#camionesMesY").html("Camiones por Mes (" + year + ")");
$("#btn-sumarY").prop('disabled', true); // Deshabilito > (por defecto)

$(document).on("click", "#btn-restarY", function() {
    year = year - 1;
    $("#camionesMesY").html("Camiones por Mes (" + year + ")");
    $("#btn-sumarY").prop('disabled', false); // Habilito >
    updateYear(year);
    
    if(year == 2021){
        $("#btn-restarY").prop('disabled', true); // Deshabilito <
    }
});

$(document).on("click", "#btn-sumarY", function() {
    year = year + 1;
    $("#camionesMesY").html("Camiones por Mes (" + year + ")");
    $("#btn-restarY").prop('disabled', false); // Habilito <
    updateYear(year);
    
    if(year == currentYear){
        $("#btn-sumarY").prop('disabled', true); // Deshabilito >
    }
});

function updateYear(year) {
    $.ajax({
        type: "POST",
        url: 'crudPanel.php',
        datatype: "json",
        data: { opcion: 8, year: year },
        success: function(data) {
            datos = JSON.parse(data);
            arrayMeses = []
            for (i = 0; i < datos.length; i++) {
                arrayMeses[datos[i].mes - 1] = datos[i].camiones;
            }
            dibujarBarChart(arrayMeses);
        }
    });
}