
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

//About Sauce Ages Learn More Button Functions
// About Section Toggle
document.querySelector('.about-btn').addEventListener('click', function() {
    const moreContent = document.querySelector('.more-content');
    const btn = document.querySelector('.about-btn');
    
    if (moreContent.style.display === 'none') {
        moreContent.style.display = 'block';
        btn.textContent = 'Show Less';
        // Optional smooth scroll to accommodate new content
        document.querySelector('.about-content').scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    } else {
        moreContent.style.display = 'none';
        btn.textContent = 'Learn More';
    }
});