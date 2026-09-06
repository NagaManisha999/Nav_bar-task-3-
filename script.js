// ========================================
// Select Elements
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");


// ========================================
// Open / Close Mobile Menu
// ========================================

function toggleMenu() {

    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

}


// ========================================
// Menu Button Click
// ========================================

menuToggle.addEventListener(
    "click",
    toggleMenu
);


// ========================================
// Close Menu Function
// ========================================

function closeMenu() {

    navMenu.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}


// ========================================
// Close Menu After Clicking Link
// ========================================

navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            closeMenu();

        }
    );

});


// ========================================
// Close Menu With Escape Key
// ========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            navMenu.classList.contains("active")
        ) {

            closeMenu();

            menuToggle.focus();

        }

    }
);


// ========================================
// Close Menu When Clicking Outside
// ========================================

document.addEventListener(
    "click",
    function (event) {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            navMenu.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            closeMenu();

        }

    }
);


// ========================================
// Active Navigation Link
// ========================================

const sections =
    document.querySelectorAll("section[id]");


const observerOptions = {
    root: null,

    rootMargin: "-30% 0px -60% 0px",

    threshold: 0
};


const sectionObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute("id");


                    navLinks.forEach(
                        function (link) {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute("href") ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }

            });

        },
        observerOptions
    );


sections.forEach(function (section) {

    sectionObserver.observe(section);

});


// ========================================
// Close Menu When Screen Becomes Desktop
// ========================================

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 768) {

            closeMenu();

        }

    }
);