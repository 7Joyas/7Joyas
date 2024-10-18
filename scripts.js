(() => {
    'use strict';

    // Se utiliza el evento de clic para manejar las acciones de los botones
    document.addEventListener('click', handleButtonClick, { passive: true });

    function handleButtonClick(event) {
        const button = event.target.closest('.action-button');
        if (!button) return;

        const altText = sanitizeText(button.getAttribute('alt'));
        const urls = getUrls();
        if (urls.has(altText)) {
            safeOpen(urls.get(altText));
        } else {
            console.warn(`URL no encontrada para: ${altText}`);
        }
    }

    function sanitizeText(text) {
        const allowedTexts = new Set(['Instagram', 'WhatsApp', 'Facebook', 'Gmail']);
        const cleaned = text?.trim() || '';
        return allowedTexts.has(cleaned) ? cleaned : '';
    }

    function getUrls() {
        return new Map([
            ['Instagram', 'https://www.instagram.com/7joyas'],
            ['WhatsApp', 'https://wa.me/50762526462'],
            ['Facebook', 'https://www.facebook.com/7joyas'],
            ['Gmail', createGmailLink('sietejoyas@gmail.com', 'Consulta', 'Hola, quisiera más información.')]
        ]);
    }

    function createGmailLink(email, subject, body) {
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    }

    function safeOpen(url) {
        // Abre la URL en una nueva ventana
        window.open(url, '_blank', 'noopener,noreferrer');
    }
})();
