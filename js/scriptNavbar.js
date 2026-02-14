$(document).ready(function() {
    $(document).on("click", "#botonNav", function() {
        estado = $('#navbarResponsive').attr('class');
        if (estado == 'collapse navbar-collapse') {
            $('#navbarResponsive').attr('class', 'navbar-collapse collapse show');
        } else {
            $('#navbarResponsive').attr('class', 'collapse navbar-collapse');
        }
    });

    $(document).on("click", ".nav-link", function() {
        $('#navbarResponsive').attr('class', 'collapse navbar-collapse');
    });
});