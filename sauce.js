
document.getElementById('enquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

//Forms Functions
    // Validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    let valid = true;

    if (name === '') {
        showError('nameError', 'Name is required');
        valid = false;
    }

    if (!validateEmail(email)) {
        showError('emailError', 'Invalid email format');
        valid = false;
    }

    if (subject === '') {
        showError('subjectError', 'Subject is required');
        valid = false;
    }

    if (message === '') {
        showError('messageError', 'Message is required');
        valid = false;
    }

    if (valid) {
        alert('Thank you! Your enquiry has been sent successfully.');
        document.getElementById('enquiryForm').reset();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = '#FF4500';
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
}
