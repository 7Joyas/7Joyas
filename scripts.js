(() => {
    'use strict'; // Mejora la seguridad del código

    // Throttling global para evitar múltiples clics rápidos
    const throttledClick = throttle(safeOpen, 500);

    // Delegación de eventos optimizada con manejo de errores
    document.addEventListener('click', handleButtonClick, { passive: true });

    /**
     * Manejador del evento click
     * @param {Event} event
     */
    function handleButtonClick(event) {
        try {
            const button = event.target.closest('.action-button');
            if (!button) return;

            const altText = sanitizeText(button.getAttribute('alt')); // Corregido uso de .getAttribute
            const urls = getUrls();

            if (urls.has(altText)) {
                throttledClick(urls.get(altText));
            }
        } catch (error) {
            console.error('Error al procesar el clic:', error);
        }
    }

    /**
     * Sanitiza el texto para evitar entradas maliciosas
     * @param {string} text
     * @returns {string}
     */
    function sanitizeText(text) {
        const allowedTexts = new Set([
            'Instagram', 'WhatsApp', 'Correo', 'Yappy',
            'Contacto', 'Línea BASIC', 'Línea: Rock N Doll'
        ]);
        const cleaned = text?.trim() || '';
        return allowedTexts.has(cleaned) ? cleaned : '';
    }

    /**
     * Encapsula las URLs en un Map para mayor eficiencia
     * @returns {Map<string, string>}
     */
    function getUrls() {
        return new Map([
            ['Instagram', 'https://www.instagram.com/7joyas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='],
            ['WhatsApp', 'https://wa.me/123456789'],
            ['Correo', 'mailto:tuemail@correo.com'],
            ['Yappy', 'https://yappy.com/pago'],
            ['Contacto', 'https://wa.me/123456789'],
            ['Línea BASIC', 'https://www.instagram.com/p/ChJNf6Wu9uz/'],
            ['Línea: Rock N Doll', 'https://www.instagram.com/p/CK4Si13hEa4/?img_index=1']
        ]);
    }

    /**
     * Abre enlaces de manera segura
     * @param {string} url
     */
    function safeOpen(url) {
        try {
            const validUrl = new URL(url); // Verificar si la URL es válida
            if (validUrl.protocol === 'https:' || validUrl.protocol === 'mailto:') {
                const newWindow = window.open(validUrl.href, '_blank', 'noopener,noreferrer');
                if (newWindow) newWindow.opener = null; // Evitar ataques de clickjacking
            } else {
                console.error('URL insegura: Solo se permiten HTTPS y mailto.');
            }
        } catch (error) {
            console.error('URL inválida:', error);
        }
    }

    /**
     * Implementación de throttling para evitar múltiples clics rápidos
     * @param {Function} func
     * @param {number} delay
     * @returns {Function}
     */
    function throttle(func, delay) {
        let lastCall = 0;
        let timeoutId;

        return (...args) => {
            const now = Date.now();
            const remainingTime = delay - (now - lastCall);

            if (remainingTime <= 0) {
                clearTimeout(timeoutId);
                lastCall = now;
                func(...args);
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    lastCall = Date.now();
                    func(...args);
                }, remainingTime);
            }
        };
    }
})();
