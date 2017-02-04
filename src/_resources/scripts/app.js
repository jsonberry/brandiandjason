$(function() {
    $('a').click(function(e) {
        var scrollTo = e.currentTarget.hash;

        $('html, body').animate({
            scrollTop: $(scrollTo).offset().top
        }, 1000);
    });
});
