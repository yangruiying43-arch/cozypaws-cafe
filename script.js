document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const cityInput = document.getElementById('city');
        const emailInput = document.getElementById('email');
        const zipCodeInput = document.getElementById('zipCode');
        const phoneInput = document.getElementById('phone');

        const errorContainer = document.createElement('div');
        errorContainer.id = 'formErrors';
        errorContainer.style.cssText = 'margin-bottom: 1.5rem; padding: 1rem; border-radius: 5px; display: none;';
        contactForm.insertBefore(errorContainer, contactForm.firstChild);

        const successContainer = document.createElement('div');
        successContainer.id = 'formSuccess';
        successContainer.style.cssText = 'margin-bottom: 1.5rem; padding: 1rem; border-radius: 5px; display: none;';
        contactForm.insertBefore(successContainer, contactForm.firstChild);

        function capitalizeWords(str) {
            return str.toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validateZipCode(zipCode) {
            const re = /^\d{5}$/;
            return re.test(zipCode);
        }

        function validatePhone(phone) {
            if (!phone) return true;
            const re = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
            return re.test(phone.replace(/\s/g, ''));
        }

        function showErrors(errors) {
            errorContainer.innerHTML = `
                <strong style="color: #dc3545;">Please fix the following errors:</strong>
                <ul style="margin-top: 0.5rem; margin-bottom: 0; padding-left: 1.5rem; color: #dc3545;">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            `;
            errorContainer.style.display = 'block';
            errorContainer.style.backgroundColor = '#f8d7da';
            errorContainer.style.border = '1px solid #f5c6cb';
            errorContainer.style.color = '#721c24';

            successContainer.style.display = 'none';
        }

        function showSuccess(message) {
            successContainer.innerHTML = `<strong style="color: #155724;">${message}</strong>`;
            successContainer.style.display = 'block';
            successContainer.style.backgroundColor = '#d4edda';
            successContainer.style.border = '1px solid #c3e6cb';
            successContainer.style.color = '#155724';

            errorContainer.style.display = 'none';
        }

        function clearMessages() {
            errorContainer.style.display = 'none';
            successContainer.style.display = 'none';
        }

        [firstNameInput, lastNameInput, cityInput].forEach(input => {
            if (input) {
                input.addEventListener('blur', function () {
                    this.value = capitalizeWords(this.value);
                });
            }
        });

        if (emailInput) {
            emailInput.addEventListener('blur', function () {
                if (this.value && !validateEmail(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = this.value ? '#28a745' : '#a1887f';
                }
            });

            emailInput.addEventListener('input', function () {
                this.style.borderColor = '#a1887f';
            });
        }

        if (zipCodeInput) {
            zipCodeInput.addEventListener('blur', function () {
                if (this.value && !validateZipCode(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = this.value ? '#28a745' : '#a1887f';
                }
            });

            zipCodeInput.addEventListener('input', function () {
                this.style.borderColor = '#a1887f';
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('blur', function () {
                if (this.value && !validatePhone(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = this.value ? '#28a745' : '#a1887f';
                }
            });

            phoneInput.addEventListener('input', function () {
                this.style.borderColor = '#a1887f';
            });
        }

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            clearMessages();

            const errors = [];

            if (firstNameInput && !firstNameInput.value.trim()) {
                errors.push('First name is required.');
                firstNameInput.style.borderColor = '#dc3545';
            }

            if (lastNameInput && !lastNameInput.value.trim()) {
                errors.push('Last name is required.');
                lastNameInput.style.borderColor = '#dc3545';
            }

            if (cityInput && !cityInput.value.trim()) {
                errors.push('City is required.');
                cityInput.style.borderColor = '#dc3545';
            }

            if (emailInput) {
                if (!emailInput.value.trim()) {
                    errors.push('Email address is required.');
                    emailInput.style.borderColor = '#dc3545';
                } else if (!validateEmail(emailInput.value)) {
                    errors.push('Please enter a valid email address (e.g., name@example.com).');
                    emailInput.style.borderColor = '#dc3545';
                }
            }

            if (zipCodeInput) {
                if (!zipCodeInput.value.trim()) {
                    errors.push('Zip code is required.');
                    zipCodeInput.style.borderColor = '#dc3545';
                } else if (!validateZipCode(zipCodeInput.value)) {
                    errors.push('Please enter a valid 5-digit zip code.');
                    zipCodeInput.style.borderColor = '#dc3545';
                }
            }

            if (phoneInput && phoneInput.value.trim() && !validatePhone(phoneInput.value)) {
                errors.push('Please enter a valid phone number (e.g., 123-456-7890 or 1234567890).');
                phoneInput.style.borderColor = '#dc3545';
            }

            if (errors.length > 0) {
                showErrors(errors);
                errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                [firstNameInput, lastNameInput, cityInput].forEach(input => {
                    if (input && input.value) {
                        input.value = capitalizeWords(input.value);
                    }
                });

                showSuccess('Thank you! Your message has been sent successfully.');

                const allInputs = contactForm.querySelectorAll('input, select, textarea');
                allInputs.forEach(input => {
                    input.style.borderColor = '#a1887f';
                });

                setTimeout(() => {
                    contactForm.reset();
                    clearMessages();
                }, 3000);
            }
        });

        const allInputs = contactForm.querySelectorAll('input, select, textarea');
        allInputs.forEach(input => {
            input.addEventListener('input', function () {
                this.style.borderColor = '#a1887f';
            });
        });
    }
})