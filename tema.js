(() => {
    const key = 'fernanda-tema';
    const root = document.documentElement;
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    let preference = null;
    try { preference = localStorage.getItem(key); } catch (_) { /* Storage may be unavailable. */ }
    if (preference !== 'light' && preference !== 'dark') preference = null;

    function apply(theme) {
        root.dataset.theme = theme;
        const button = document.querySelector('.tema-toggle');
        if (button) {
            const dark = theme === 'dark';
            button.setAttribute('aria-pressed', String(dark));
            button.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
            button.title = button.getAttribute('aria-label');
        }
    }
    apply(preference || (system.matches ? 'dark' : 'light'));
    document.addEventListener('DOMContentLoaded', () => {
        const button = document.querySelector('.tema-toggle');
        if (!button) return;
        button.hidden = false;
        apply(root.dataset.theme);
        button.addEventListener('click', () => {
            preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
            apply(preference);
            try { localStorage.setItem(key, preference); } catch (_) { /* Keep the current page usable. */ }
        });
    });
    system.addEventListener('change', event => {
        if (!preference) apply(event.matches ? 'dark' : 'light');
    });
    window.addEventListener('storage', event => {
        if (event.key !== key && event.key !== null) return;
        preference = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
        apply(preference || (system.matches ? 'dark' : 'light'));
    });
})();
