$(document).ready(function() {
    $('.faq-list li').click(function() {
        $(this).find('.faq-answer').slideToggle();
        $(this).find('span:last-child').toggleClass('open');
    });

    $('.book-now-main, .book-now-top').click(function() {
        $('#bookingModal').fadeIn();
    });

    $('.close').click(function() {
        $('#bookingModal').fadeOut();
    });
});

document.getElementById("submitButton").addEventListener("click", function() {
    if (validateFormData()) {
        var serviceName = document.getElementById("serviceSelection").value;
        var name = document.getElementById("nameInput").value;
        var surname = document.getElementById("surnameInput").value;
        var email = document.getElementById("emailInput").value;

        console.log("Selected Service:", serviceName);
        console.log("Name:", name);
        console.log("Surname:", surname);
        console.log("Email:", email);
    }
});

var bookingModal = document.getElementById("bookingModal");
var closeModal = document.querySelector(".close");

closeModal.addEventListener("click", function() {
    bookingModal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target == bookingModal) {
        bookingModal.style.display = "none";
    }
}

function validateFormData() {
    let isValid = true;

    const name = document.getElementById("nameInput");
    const surname = document.getElementById("surnameInput");
    const email = document.getElementById("emailInput");
    
    const hasNumbers = /\d/;
    
    if(hasNumbers.test(name.value)) {
        name.classList.add("invalid");
        document.getElementById("nameTooltip").style.display = "block";
        isValid = false;
    } else {
        name.classList.remove("invalid");
        document.getElementById("nameTooltip").style.display = "none";
    }
    
    if(hasNumbers.test(surname.value)) {
        surname.classList.add("invalid");
        document.getElementById("surnameTooltip").style.display = "block";
        isValid = false;
    } else {
        surname.classList.remove("invalid");
        document.getElementById("surnameTooltip").style.display = "none";
    }
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailPattern.test(email.value)) {
        email.classList.add("invalid");
        document.getElementById("emailTooltip").style.display = "block";
        isValid = false;
    } else {
        email.classList.remove("invalid");
        document.getElementById("emailTooltip").style.display = "none";
    }

    if (!isValid) {
        document.getElementById("submitTooltip").style.display = "block";
    } else {
        document.getElementById("submitTooltip").style.display = "none";
    }

    return isValid;
}
function submitForm() {
    if (validateFormData()) {
        // Here you can add the logic to send the data to your server...
        
        // Display the success modal
        document.getElementById("successModal").style.display = "block";

        // Hide the success modal after 3 seconds
        setTimeout(() => {
            document.getElementById("successModal").style.display = "none";
        }, 3000);
    }
}
