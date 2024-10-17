// scripts.js

// Uso de delegación de eventos para reducir los listeners
document.addEventListener('click', (event) => {
    const button = event.target.closest('.action-button');
    if (!button) return; // Salir si el clic no fue en un botón válido

    const altText = button.alt?.trim(); // Validar que exista y limpiar el texto
    const urls = {
        'Instagram': 'https://www.instagram.com/7joyas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        'WhatsApp': 'https://wa.me/123456789',
        'Correo': 'mailto:tuemail@correo.com',
        'Yappy': 'https://yappy.com/pago',
        'Contacto': 'https://wa.me/123456789',
        'Línea BASIC': 'https://www.instagram.com/p/ChJNf6Wu9uz/',
        'Línea: Rock N Doll': 'https://www.instagram.com/p/CK4Si13hEa4/?img_index=1'
    };

    const url = urls[altText];
    if (url) {
        safeOpen(url); // Usar función segura para abrir enlaces
    }
});

// Función segura para abrir enlaces
function safeOpen(url) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null; // Evitar clickjacking
}

