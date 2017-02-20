$(function() {
    $('a').click(function(e) {
        let scrollTo = e.currentTarget.hash;
        let scrollToPosition = $(scrollTo).offset().top - 61;

        $('html, body').animate({
            scrollTop: scrollToPosition
        }, 1000);
    });

    $('#rsvp-form').on('submit',function(e) {
        e.preventDefault;
        let baseURL = 'https://docs.google.com/forms/d/e/';
        let formId = '1FAIpQLSdGUf3zSOVNZJ0zPsayqP4U1VuGvrhFUQh09Z0oP905JU-yXg/';
        let submitRef = 'submit=8869835504486836160';

        let gInputIds = [
            '216944502',
            '2016456273',
            '971476322',
            '597427551',
            '1223284537'
        ];

        $('.loader').addClass('loader-default is-active');
        $('.loader').attr({
            'data-half': '',
            'data-text': 'Submitting your RSVP'
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
            pauseOnHover: true,
            onOpened: function() {
                console.log('i opened');
            },
            onClosed: function() {
                $('#rsvp').fadeOut();
                $('a[href="#rsvp"]').fadeOut();
            }
        });

        setTimeout(success, 3000);
        //  data-half data-blink data-text="Submitting your RSVP..."

        let formData = $(this).serializeArray();
        let responseData = formData.reduce((a, v, i) => a + `entry.${gInputIds[i]}=${encodeURIComponent(v.value)}&`, new String);
        let data = `${responseData}${submitRef}`;
        let submitURL = `${baseURL}${formId}formResponse?${responseData}${submitRef}`;
        console.log(submitURL);
        $(this)[0].action = submitURL;
        // $.ajax({
        //     url: 'https://docs.google.com/forms/d/e/1FAIpQLSdGUf3zSOVNZJ0zPsayqP4U1VuGvrhFUQh09Z0oP905JU-yXg/formResponse?',
        //     method: 'POST',
        //     data: data
        // })
        // .always(function(e) {
        //     console.log(e);
        // });
    });

    $('.block-heading-container').on('click', function(e) {
        $(this).children().filter('svg').toggleClass('open');
        $(this).next('.block-info-container').slideToggle();
    });

});

function success() {
    $('.loader').removeClass('loader-default is-active');
    $('.loader').removeAttr('data-half');
    $('.loader').removeAttr('data-text');
    setTimeout(removeStuff, 500);
}

function removeStuff() {
    $('#modal').iziModal('open');
}
