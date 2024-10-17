// scripts.js
const buttons = document.querySelectorAll('.action-button');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const altText = event.target.alt;
        switch (altText) {
            case 'Instagram':
                window.open('https://www.instagram.com/TuCuenta', '_blank');
                break;
            case 'WhatsApp':
                window.open('https://wa.me/123456789', '_blank');
                break;
            case 'Correo':
                window.location.href = 'mailto:tuemail@correo.com';
                break;
            case 'Yappy':
                window.open('https://yappy.com/pago', '_blank');
                break;
            case 'Contacto'
                window.open('https://wa.me/123456789', '_blank');
                break; 
                case 'Línea BASIC':
                window.open('https://www.instagram.com/p/ChJNf6Wu9uz/', '_blank');
                break;
                case 'Línea: Rock N Doll':
                window.open('https://www.instagram.com/p/CK4Si13hEa4/?img_index=1', '_blank');
                break;
                case 'Línea Basics':
                window.open('https://www.instagram.com/p/CKpmD6ABaiD/?img_index=1', '_blank');
                break;
                case 'Línea Amulettos ♾ Amor y protección en un solo cordón':
                window.open('https://www.instagram.com/p/CK7IqIMBfJF/?img_index=1', '_blank');
                break;

           
    });
});
