$(document).ready(function() {
    let btn = $("#btn-back-to-top");

    //Cuando el usuario scrolee 20 px, mostrar el boton
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            $("#btn-back-to-top").css('display', 'block');
        } else {
            $("#btn-back-to-top").css('display', 'none');
        }
    }
    // Cuando el usuario haga click en el boton, va para arriba
    $(document).on("click", "#btn-back-to-top", function() {
        backToTop();
    })

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (screen.width <= 991) {
        $('#carouselimg01').attr("src", "img/camion(1R).jpg")
        $('#carouselimg02').attr("src", "img/camion(2R).jpg")
        $('#carouselimg03').attr("src", "img/camion(3R).jpg")
    }
});