(function () {
    function showSpinner() {
        const overlay = document.getElementById("loadingOverlay");
        if (overlay) overlay.style.display = "flex";
    }

    function hideSpinner() {
        const overlay = document.getElementById("loadingOverlay");
        if (overlay) overlay.style.display = "none";
    }

    function setSelectedNav(navItem) {
        document.querySelectorAll(".left-nav .nav-item")
            .forEach(el => el.classList.remove("selected-image"));

        navItem.classList.add("selected-image");
    }

    function updateHero(selected, title) {
        const heroImage = document.getElementById("heroImage");
        const heroTitle = document.getElementById("heroTitle");

        if (!heroImage) {
            console.error("Missing #heroImage");
            return;
        }

        const imageName = (selected || "Home").trim();
        const nextTitle = title?.trim() || imageName;

        showSpinner();

        heroImage.onload = hideSpinner;
        heroImage.onerror = function () {
            hideSpinner();
            console.error("Image not found:", imageName);
        };

        heroImage.src = `./images/logo/${encodeURIComponent(imageName)}.png`;
        heroImage.title = nextTitle;
        heroImage.alt = nextTitle;

        if (heroTitle) {
            heroTitle.textContent = nextTitle;
        }
    }
	
    function init() {
        const navItems = Array.from(
            document.querySelectorAll(".left-nav .nav-item[data-selected]")
        );

        if (navItems.length === 0) {
            console.error("No nav items found. Expected .left-nav .nav-item[data-selected]");
            return;
        }

        const defaultItem =
            navItems.find(x => x.dataset.selected === "TheRevolution") ||
            navItems[0];

        setSelectedNav(defaultItem);
        updateHero(defaultItem.dataset.selected, defaultItem.dataset.title);

        navItems.forEach(item => {
            item.addEventListener("click", function () {
                //console.log("Clicked:", item.dataset.selected);
                setSelectedNav(item);
                updateHero(item.dataset.selected, item.dataset.title);
            });
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();

window.showSection = function (sectionId, message) {
    document.querySelectorAll(".content-section").forEach(section => {
        section.style.display = "none";
    });

    const selected = document.getElementById(sectionId);
    if (selected) {
        selected.style.display = "block";
    }

    const caption = document.getElementById("hero-caption");
    if (caption) {
        caption.textContent = message;
    }
};

window.selectHero = function (selected, caption) {
    const heroImage = document.getElementById("heroImage");
    const heroCaption = document.getElementById("hero-caption");

    if (!heroImage) {
        console.error("Missing #heroImage");
        return;
    }

    const imageName = (selected || "Home").trim();

    heroImage.src = `./images/logo/${encodeURIComponent(imageName)}.png`;
    heroImage.alt = caption || imageName;
    heroImage.title = caption || imageName;

    if (heroCaption) {
        heroCaption.textContent = caption || "";
    }

    document.querySelectorAll(".left-nav .nav-item").forEach(item => {
        item.classList.remove("selected-image");
    });

    const activeNav = document.querySelector(`.left-nav .nav-item[data-selected="${imageName}"]`);
    if (activeNav) {
        activeNav.classList.add("selected-image");
    }
};

window.showSection = selectHero;

document.addEventListener("DOMContentLoaded", function () {

    console.log("DOM loaded");

    document.querySelectorAll(".nav-item[data-selected]")
        .forEach(item => {

            item.addEventListener("click", function () {

                const selected = item.dataset.selected;
                const caption = item.dataset.caption;

                showSection(selected, caption);
            });

        });

});
