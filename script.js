document.addEventListener('DOMContentLoaded', () => {
    const videoFeed = document.querySelector('.video-feed');

    // Utiliser uniquement des vidéos .webm qui fonctionnent dans l'environnement de test
    const videos = [
        'https://raw.githubusercontent.com/mediaelement/mediaelement-files/master/big_buck_bunny.webm',
        'https://raw.githubusercontent.com/mediaelement/mediaelement-files/master/echo-hereweare.webm',
        'https://raw.githubusercontent.com/mediaelement/mediaelement-files/master/big_buck_bunny.webm',
        'https://raw.githubusercontent.com/mediaelement/mediaelement-files/master/echo-hereweare.webm'
    ];

    videos.forEach(videoSrc => {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';

        const videoElement = document.createElement('video');
        videoElement.src = videoSrc;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;

        videoContainer.appendChild(videoElement);
        videoFeed.appendChild(videoContainer);
    });

    const options = {
        root: document.querySelector('.app-container'),
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (entry.isIntersecting) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("La lecture automatique a été bloquée par le navigateur.");
                    });
                }
            } else {
                video.pause();
            }
        });
    }, options);

    document.querySelectorAll('.video-container').forEach(container => {
        observer.observe(container);
    });
});
