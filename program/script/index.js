$(document).ready(function() {
    // FAQ Toggle
    $('.faq-list li').click(function() {
        $(this).find('.faq-answer').slideToggle();
        $(this).find('span:last-child').toggleClass('open');
    });

    // Open Booking Modal
    $('.book-now-main, .book-now-top').click(function() {
        $('#bookingModal').fadeIn();
    });

    // Close Booking Modal
    $('#bookingModal .close, #bookingModal').click(function(e) {
        if (e.target !== this) return;
        $('#bookingModal').fadeOut();
    });

    // Submit Button
    $("#submitButton").click(function() {
        if (validateFormData()) {
            var serviceName = $("#serviceSelection").val();
            var name = $("#nameInput").val();
            var surname = $("#surnameInput").val();
            var email = $("#emailInput").val();

            console.log("Selected Service:", serviceName);
            console.log("Name:", name);
            console.log("Surname:", surname);
            console.log("Email:", email);
            
            submitForm();  // Call the submitForm function after validation
        }
    });
});

function validateFormData() {
    let isValid = true;

    const name = $("#nameInput");
    const surname = $("#surnameInput");
    const email = $("#emailInput");
    
    const hasNumbers = /\d/;
    
    if(hasNumbers.test(name.val())) {
        name.addClass("invalid");
        $("#nameTooltip").show();
        isValid = false;
    } else {
        name.removeClass("invalid");
        $("#nameTooltip").hide();
    }
    
    if(hasNumbers.test(surname.val())) {
        surname.addClass("invalid");
        $("#surnameTooltip").show();
        isValid = false;
    } else {
        surname.removeClass("invalid");
        $("#surnameTooltip").hide();
    }
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailPattern.test(email.val())) {
        email.addClass("invalid");
        $("#emailTooltip").show();
        isValid = false;
    } else {
        email.removeClass("invalid");
        $("#emailTooltip").hide();
    }

    if (!isValid) {
        $("#submitTooltip").show();
    } else {
        $("#submitTooltip").hide();
    }

    return isValid;
}

function submitForm() {
    // Here you can add the logic to send the data to your server...
    
    // Close the booking modal
    $("#bookingModal").fadeOut();
    
    // Display the success modal
    $("#successModal").show();

    // Hide the success modal after 3 seconds
    setTimeout(() => {
        $("#successModal").hide();
    }, 3000);
}
document.getElementById('gallery').addEventListener('click', function() {
    // Приховуємо основний контент
    document.getElementById('mainContent').style.display = 'none';
  
    // Завантажуємо фотографію собаки
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        let dogImage = document.createElement('img');
        dogImage.src = data.message;
        document.getElementById('dogImagesContainer').appendChild(dogImage);
  
        // Відображаємо галерею
        document.getElementById('dogGallery').style.display = 'block';
      })
      .catch(error => console.error('Error fetching dog image:', error));
  });
  
  // Кнопка "Назад"
  document.getElementById('backToMain').addEventListener('click', function() {
    document.getElementById('dogGallery').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
  });
  