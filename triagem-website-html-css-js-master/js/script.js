// navbar toggling
const navbarShowBtn = document.querySelector('.navbar-show-btn');
const navbarCollapseDiv = document.querySelector('.navbar-collapse');
const navbarHideBtn = document.querySelector('.navbar-hide-btn');

navbarShowBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.add('navbar-show');
});
navbarHideBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.remove('navbar-show');
});

// changing search icon image on window resize
window.addEventListener('resize', changeSearchIcon);
function changeSearchIcon(){
    let winSize = window.matchMedia("(min-width: 1200px)");
    if(winSize.matches){
        document.querySelector('.search-icon img').src = "images/search-icon.png";
    } else {
        document.querySelector('.search-icon img').src = "images/search-icon-dark.png";
    }
}
changeSearchIcon();

// stopping all animation and transition
let resizeTimer;
window.addEventListener('resize', () =>{
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// script.js

// Função para animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação para cards aparecerem conforme scroll
const observerCards = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.card').forEach((card) => {
    observerCards.observe(card);
});

// Validação do formulário de login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!validateEmail(email)) {
            showAlert('Por favor, insira um email válido');
            return;
        }
        
        if (password.length < 6) {
            showAlert('A senha deve ter pelo menos 6 caracteres');
            return;
        }
        
        // Aqui você pode adicionar a lógica de autenticação
        console.log('Login válido');
    });
}

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Sistema de notificações
function showAlert(message, type = 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Menu mobile
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
});

// Loader da página
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('loader-hidden');
    }
});

// Sistema de tema claro/escuro
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.querySelector('nav').appendChild(themeToggle);

let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', toggleDarkMode);

// Aplicar tema salvo
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Adicionar estilos CSS necessários
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
    }
    
    .alert-error {
        background-color: #ff4444;
        color: white;
    }
    
    .alert-success {
        background-color: #00C851;
        color: white;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s, transform 0.5s;
    }
    
    .card-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    .theme-toggle {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 15px;
    }
    
    .dark-mode {
        background-color: #1a1a1a;
        color: #ffffff;
    }
    
    .dark-mode .card {
        background-color: #2d2d2d;
        color: #ffffff;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        nav ul {
            display: none;
            width: 100%;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: var(--primary-color);
            flex-direction: column;
            padding: 1rem;
        }
        
        nav ul.show {
            display: flex;
        }
        
        nav ul li {
            margin: 10px 0;
        }
    }
`;

document.head.appendChild(styleSheet);

// Adicionar loader ao HTML
const loaderHTML = `
    <div class="loader">
        <div class="loader-spinner"></div>
    </div>
`;

document.body.insertAdjacentHTML('afterbegin', loaderHTML);

// Adicionar estilos do loader
const loaderStyles = document.createElement('style');
loaderStyles.textContent = `
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.3s;
    }
    
    .loader-hidden {
        opacity: 0;
        pointer-events: none;
    }
    
    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(loaderStyles);