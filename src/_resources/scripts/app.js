$(function() {

    /*
    *   Anchor Scroll Animation
    */
    $('a').on('click', function(e) {
        // Always hide the mobile nav upon hitting a nav item
        $('.nav-mobile').fadeOut();
        let scrollTo = e.currentTarget.hash;
        let scrollToPosition = $(scrollTo).offset().top - 61;

        $('html, body').animate({
            scrollTop: scrollToPosition
        }, 1000);
    });

    /*
    *   Fade the Mobile Nav in
    */
    $('.nav-mobile-toggle').on('click', function(e) {
        $('.nav-mobile').fadeIn();
    });

    /*
    *   Toggle for reveal sections
    */
    $('.block-heading-container').on('click', function(e) {
        $(this).children().filter('svg').toggleClass('open');
        $(this).next('.block-info-container').slideToggle();
    });

    $('#modal').iziModal({
        title: 'RSVP Successful! Thank you!',
        icon: 'icon-check',
        headerColor: '#00af66',
        width: 600,
        timeout: 10000,
        timeoutProgressbar: true,
        transitionIn: 'fadeInUp',
        transitionOut: 'fadeOutDown',
        pauseOnHover: true
    });

    $('#rsvp-form').one('submit', function(e) {
        e.preventDefault();
        $('.loader').addClass('loader-default is-active');
        $('.loader').attr({
            'data-half': '',
            'data-text': 'Submitting your RSVP'
        });


        let gInputIds = [
            '216944502',
            '2016456273',
            '971476322',
            '597427551',
            '1223284537'
        ];

        let submitRef = 'submit=8869835504486836160';
        let formData = $(this).serializeArray();
        let responseData = formData.reduce((a, v, i) => a + `entry.${gInputIds[i]}=${encodeURIComponent(v.value)}&`, new String);
        let data = `${responseData}${submitRef}`;

        $.ajax({
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSdGUf3zSOVNZJ0zPsayqP4U1VuGvrhFUQh09Z0oP905JU-yXg/formResponse?',
            method: 'POST',
            data: data
        })
        .always(function(e) {
            setTimeout(onSuccess, 2000);
        });

        function onSuccess() {
            $('.loader').removeClass('loader-default is-active');
            $('.loader').removeAttr('data-half');
            $('.loader').removeAttr('data-text');
            setTimeout(successModal, 500);
        }

        function successModal() {
            $('#modal').iziModal('open');
        }
    });

});
