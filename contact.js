// contact.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formMessage = document.getElementById('formMessage');
    const honeypot = document.getElementById('website');

    // Simple Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // 1. Spam Protection: Check Honeypot
        if (honeypot.value !== '') {
            console.log('Bot detected via honeypot.');
            return;
        }

        // 2. Get Form Data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // 3. Client-side Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // 4. UI Loading State
        setLoadingState(true);
        clearFormMessage();

        try {
            // Send to Formspree
            const response = await fetch("https://formspree.io/f/xeaalyla", {
                method: "POST",
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message.');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Something went wrong. Please try again later.', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    // Helper: Toggle Loading State
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-flex';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    // Helper: Show Message
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // Helper: Clear Message
    function clearFormMessage() {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    }
});