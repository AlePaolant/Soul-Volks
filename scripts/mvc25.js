$(document).ready(function() {
    $(window).on("scroll", function() {
        var scrollTop = $(window).scrollTop();
        
        // valore alto = velocità alta - valore basso = velocità bassa
        $(".background").css("top", scrollTop * 0.8 + "px");
        $(".clouds-background").css("top", scrollTop * 0.7 + "px");
        $(".mountains").css("top", scrollTop * 0.8 + "px");
        $(".ground").css("top", scrollTop * 0.4 + "px");
        $(".trees-sx").css("top", scrollTop * 0.4 + "px");
        $(".foreground").css("top", scrollTop * 0.01 + "px"); 
        $(".t1").css("top", scrollTop * 0.05 + "px");
        $(".trees-dx").css("top", scrollTop * 0.3 + "px");
        $(".cloud-front-1").css("top", scrollTop * 0.3 + "px");
        $(".cloud-front-2").css("top", scrollTop * 0.35 + "px");
        $(".cloud-front-3").css("top", scrollTop * 0.25 + "px");
        $(".cloud-front-4").css("top", scrollTop * 0.3 + "px");
        $(".mongolfiera").css("top", scrollTop * 0.6 + "px");
        $(".main-title").css("top", scrollTop * 0.8 + "px");
    });

    // Funzione MODIFICATA per chiudere il menu dopo il clic su un link (hamburger)
    $(document).ready(function() {
        $('.navbar-toggler').on('click', function() {
            $('.navbar').toggleClass('navbar-open');
        });
    
        // Chiude il menu quando si clicca su un link
        $('.navbar-nav a').on('click', function() {
            $('.navbar-collapse').collapse('hide');
            $('.navbar').removeClass('navbar-open');
        });
    });
    
});



//Anno per copyright
document.getElementById("year").textContent = new Date().getFullYear();