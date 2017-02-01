$(function() {
    $('a[href^="#home"]').click(function() {
        $('html, body').animate({
            scrollTop: $('#home').offset().top
        }, 1000);
    });

    $('a[href^="#rsvp"]').click(function() {
        $('html, body').animate({
            scrollTop: $('#rsvp').offset().top
        }, 1000);
    });
});
