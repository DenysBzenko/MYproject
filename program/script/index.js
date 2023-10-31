$(document).ready(function() {
    $('.faq-list li').click(function() {
        $(this).find('.faq-answer').slideToggle();
        $(this).find('span:last-child').toggleClass('open');
    });
});

$(document).ready(function() {
    $('.book-now-main, .book-now-top').click(function() {
        $('#bookingModal').fadeIn();
    });

    $('.close-btn').click(function() {
        $('#bookingModal').fadeOut();
    });
});

document.getElementById("submitBtn").addEventListener("click", function() {
    var serviceName = document.getElementById("serviceSelection").value;
    var name = document.getElementById("nameInput").value;
    var surname = document.getElementById("surnameInput").value;
    var email = document.getElementById("emailInput").value;

    console.log("Selected Service:", serviceName);
    console.log("Name:", name);
    console.log("Surname:", surname);
    console.log("Email:", email);
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
    if(hasNumbers.test(name.value) || hasNumbers.test(surname.value)) {
        name.classList.add("invalid");
        surname.classList.add("invalid");
        isValid = false;
    } else {
        name.classList.remove("invalid");
        name.classList.add("valid");
        surname.classList.remove("invalid");
        surname.classList.add("valid");
    }
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailPattern.test(email.value)) {
        email.classList.add("invalid");
        isValid = false;
    } else {
        email.classList.remove("invalid");
        email.classList.add("valid");
    }

    document.getElementById("submitButton").disabled = !isValid;

    return isValid;
}

function submitForm() {
    if (validateFormData()) {
        // Тут можна додати додатковий код, який ви хочете виконати після успішної валідації
        console.log("Форма відправлена!");
    }
}
