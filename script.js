if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js', registration =>
                console.log('Service Worker registered.')
            , error =>
                console.log('Error during Service Worker registration: ', error));
    });
}
