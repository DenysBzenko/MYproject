
class Validator {
  static validateEmail(email) {
      const re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return re.test(String(email).toLowerCase());
  }

  static validateName(name) {
      return name.length >= 2;
  }
}

class Modal {
  static open(selector) {
      $(selector).show();
  }

  static close(selector) {
      $(selector).hide();
  }
}

class Gallery {
  static loadNewDog() {
      fetch('https://dog.ceo/api/breeds/image/random')
          .then(response => response.json())
          .then(data => {
              let img = $('<img>', {src: data.message, alt: 'Happy Dog', class: 'dog-image-gallery'});
              $('#dogImagesContainer').append(img);
              $('#dogImagesContainer').scrollLeft($('#dogImagesContainer')[0].scrollWidth);
          })
          .catch(error => {
              console.error('Error fetching dog image:', error);
          });
  }
}



$(document).ready(function() {
  handleRouting();

  $('.close').on('click', function() {
    Modal.close('#bookingModal');
    Modal.close('#successModal');
  });

  $('.book-now-top, .book-now-main').on('click', function() {
    let email = $('header input[type="email"]').val();  
    $('#emailInput').val(email);  
    Modal.open('#bookingModal');
  });

  $('#submitButton').on('click', function() {
    let nameValid = Validator.validateName($('#nameInput').val());
    let surnameValid = Validator.validateName($('#surnameInput').val());
    let emailValid = Validator.validateEmail($('#emailInput').val());

    $('#nameTooltip').toggle(!nameValid);
    $('#surnameTooltip').toggle(!surnameValid);
    $('#emailTooltip').toggle(!emailValid);
    $('#submitTooltip').toggle(!(nameValid && surnameValid && emailValid));

    if (nameValid && surnameValid && emailValid) {
      Modal.close('#bookingModal');
      Modal.open('#successModal');

      setTimeout(function() {
        Modal.close('#successModal');
      }, 3000);
    }
  });

  $("ul.menu li a:contains('Gallery')").on('click', function(e) {
    e.preventDefault();
    $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section').hide();
    $('#dogGallery').show();
    Gallery.loadNewDog();
  });

  $('#nextDog').on('click', function() {
    Gallery.loadNewDog();
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

  $('.faq-list li span:nth-child(2)').on('click', function() {
    $(this).next('.faq-answer').slideToggle();
    $(this).text($(this).text() === '+' ? '-' : '+');
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

  $("ul.menu li a:contains('Service')").on('click', function(e) {
    e.preventDefault();
    $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section, #dogGallery').hide();
    $('#service').show();
  });

  $('#backFromservice').on('click', function() {
    $('#service').hide();
    $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section').show();
  });

 
  $(window).on('hashchange', handleRouting);
});




function handleRouting() {
    // Hide all the sections
    $('.page').hide();
    
    // Get the current hash from the URL
    const hash = window.location.hash || '#home';
    
    // Show the section that corresponds to the hash
    $(hash).show();
    
    // Update the navigation menu to reflect the current section
    $('ul.menu li a').each(function() {
        $(this).parent().toggleClass('active', $(this).attr('href') === hash);
    });
}
