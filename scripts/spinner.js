function loadPage(imageUrl) {
    const spinner = document.getElementById('loadingOverlay');
    const heroImage = document.getElementById('heroImage');

    spinner.style.display = 'flex';

    heroImage.onload = function () {
        spinner.style.display = 'none';
    };

    heroImage.src = imageUrl;
}

