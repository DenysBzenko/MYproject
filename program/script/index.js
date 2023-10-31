function validateEmail(email) {
    var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return re.test(String(email).toLowerCase());
}


function validateName(name) {
    return name.length >= 2;
}


function openModal() {
    $('#bookingModal').show();
}

function closeModal() {
    $('#bookingModal').hide();
    $('#successModal').hide();
}


$(document).ready(function() {

    
    $('.close').on('click', function() {
        closeModal();
    });

    $('.book-now-top, .book-now-main').on('click', function() {
        openModal();
    });

    
    $('#submitButton').on('click', function() {
        let nameValid = validateName($('#nameInput').val());
        let surnameValid = validateName($('#surnameInput').val());
        let emailValid = validateEmail($('#emailInput').val());

        $('#nameTooltip').toggle(!nameValid);
        $('#surnameTooltip').toggle(!surnameValid);
        $('#emailTooltip').toggle(!emailValid);
        $('#submitTooltip').toggle(!(nameValid && surnameValid && emailValid));

        if (nameValid && surnameValid && emailValid) {
            closeModal();
            $('#successModal').show();

            
            setTimeout(function() {
                $('#successModal').hide();
            }, 3000);
        }
    });

    
    $("ul.menu li a:contains('Gallery')").on('click', function(e) {
        e.preventDefault();
        $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section').hide();
        $('#dogGallery').show();

       
        loadNewDog();
    });

    $('#nextDog').on('click', function() {
        loadNewDog();
    });

    $('#prevDog').on('click', function() {
        let images = $('#dogImagesContainer img');
        if (images.length > 1) {
            images.last().remove();
        }
    });

    
    $('#backToMain').on('click', function() {
        $('#dogGallery').hide();
        $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section').show();
    });
});

function loadNewDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            let img = $('<img>', {src: data.message, alt: 'Happy Dog', class: 'dog-image-gallery'});
            $('#dogImagesContainer').append(img);

           
            $('#dogImagesContainer').scrollLeft($('#dogImagesContainer')[0].scrollWidth);
        })
        .catch(error => {
            console.log('Error fetching dog image:', error);
        });
}
   
    $('.faq-list li span:nth-child(2)').on('click', function() {
        $(this).next('.faq-answer').slideToggle();
        if ($(this).text() === '+') {
            $(this).text('-');
        } else {
            $(this).text('+');
        }
    });
    $("ul.menu li a:contains('Contact')").on('click', function(e) {

        e.preventDefault();
        $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section, #dogGallery').hide();
        $('#contactSection').show();
    });
    
    $('#backFromContact').on('click', function() {
        $('#contactSection').hide();
        $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section').show();
    });
    