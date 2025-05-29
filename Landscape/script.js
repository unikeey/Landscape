// Мобильное меню

const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');

burgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    burgerMenu.classList.toggle('active');
});


// Плавная прокрутка по секциям меню

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Закрытие мобильного меню после выбора пункта
            if (window.innerWidth <= 992) {
                navMenu.classList.remove('show');
                burgerMenu.classList.remove('active');
            }
        }
    });
});


// Работа с модальным окном консультации

const modal = document.getElementById('consultationModal');
const ctaButton = document.querySelector('.cta-button');
const closeModal = document.querySelector('.close-modal');

ctaButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


// Валидация и отправка форм

const contactForm = document.getElementById('contactForm');
const consultationForm = document.getElementById('consultationForm');


// Проверка email

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Сообщение об ошибке

function createErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    return errorDiv;
}


// Удаление всех сообщений об ошибках

function removeErrorMessages(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}


// Сообщение об успехе

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    form.insertBefore(successDiv, form.firstChild);
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}


// Валидация и отправка контактной формы    

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    removeErrorMessages(contactForm);

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    let isValid = true;

    if (name.length < 2) {
        isValid = false;
        const errorMessage = createErrorMessage('Имя должно содержать минимум 2 символа');
        document.getElementById('name').parentNode.appendChild(errorMessage);
    }

    if (!validateEmail(email)) {
        isValid = false;
        const errorMessage = createErrorMessage('Пожалуйста, введите корректный email');
        document.getElementById('email').parentNode.appendChild(errorMessage);
    }

    if (!validatePhone(phone)) {
        isValid = false;
        const errorMessage = createErrorMessage('Пожалуйста, введите корректный номер телефона');
        document.getElementById('phone').parentNode.appendChild(errorMessage);
    }

    if (message.length < 10) {
        isValid = false;
        const errorMessage = createErrorMessage('Сообщение должно содержать минимум 10 символов');
        document.getElementById('message').parentNode.appendChild(errorMessage);
    }

    if (isValid) {
        // Сохранение отправленных данных
        const formData = {
            name,
            email,
            phone,
            message,
            timestamp: new Date().toISOString()
        };
        
        let storedForms = JSON.parse(localStorage.getItem('contactForms')) || [];
        storedForms.push(formData);
        localStorage.setItem('contactForms', JSON.stringify(storedForms));

        // Сообщение об успехе
        showSuccessMessage(contactForm, 'Спасибо! Ваше сообщение отправлено.');
        contactForm.reset();
    }
});

// Валидация и отправка формы консультации
consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    removeErrorMessages(consultationForm);

    const name = document.getElementById('consultName').value;
    const phone = document.getElementById('consultPhone').value;
    const service = document.getElementById('serviceType').value;

    let isValid = true;

    if (name.length < 2) {
        isValid = false;
        const errorMessage = createErrorMessage('Имя должно содержать минимум 2 символа');
        document.getElementById('consultName').parentNode.appendChild(errorMessage);
    }

    if (!validatePhone(phone)) {
        isValid = false;
        const errorMessage = createErrorMessage('Пожалуйста, введите корректный номер телефона');
        document.getElementById('consultPhone').parentNode.appendChild(errorMessage);
    }

    if (!service) {
        isValid = false;
        const errorMessage = createErrorMessage('Пожалуйста, выберите услугу');
        document.getElementById('serviceType').parentNode.appendChild(errorMessage);
    }

    if (isValid) {
        // Сохранение отправленных данных
        const formData = {
            name,
            phone,
            service,
            timestamp: new Date().toISOString()
        };
        
        let storedForms = JSON.parse(localStorage.getItem('consultationForms')) || [];
        storedForms.push(formData);
        localStorage.setItem('consultationForms', JSON.stringify(storedForms));

        // Сообщение об успехе
        showSuccessMessage(consultationForm, 'Спасибо! Мы свяжемся с вами в ближайшее время.');
        consultationForm.reset();
        modal.style.display = 'none';
    }
});


// Анимация появления блоков при скролле

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .advantage-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate-fadeIn');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);


// Эффект для шапки при прокрутке

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Скролл вниз
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Скролл вверх
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
}); 