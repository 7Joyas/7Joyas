(() => {
    // Uso de delegación de eventos para reducir los listeners y encapsulamos el código en un IIFE
    document.addEventListener('click', (event) => {
        const button = event.target.closest('.action-button');
        if (!button) return; // Salir si el clic no fue en un botón válido

        const altText = sanitizeText(button.alt); // Sanitizar el valor de alt
        const urls = getUrls(); // Encapsulamos las URLs

        if (urls[altText]) {
            throttle(() => safeOpen(urls[altText]), 500); // Aplicamos throttling para evitar múltiples clics rápidos
        }
    });

    // Sanitización básica del texto para evitar caracteres no deseados
    function sanitizeText(text) {
        return text?.trim().replace(/[^a-zA-Z0-9: -]/g, '') || '';
    }

    // Encapsulamos las URLs en una función para evitar exposición directa
    function getUrls() {
        return {
            'Instagram': 'https://www.instagram.com/7joyas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
            'WhatsApp': 'https://wa.me/123456789',
            'Correo': 'mailto:tuemail@correo.com',
            'Yappy': 'https://yappy.com/pago',
            'Contacto': 'https://wa.me/123456789',
            'Línea BASIC': 'https://www.instagram.com/p/ChJNf6Wu9uz/',
            'Línea: Rock N Doll': 'https://www.instagram.com/p/CK4Si13hEa4/?img_index=1'
        };
    }

    // Función segura para abrir enlaces
    function safeOpen(url) {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null; // Evitar clickjacking
    }

    // Implementación de throttling para limitar clics rápidos
    function throttle(func, delay) {
        let lastCall = 0;
        return () => {
            const now = new Date().getTime();
            if (now - lastCall >= delay) {
                lastCall = now;
                func();
            }
        };
    }
})();
