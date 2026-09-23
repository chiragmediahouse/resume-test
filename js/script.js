/* =========================================================
   CHIRAG MEDIA HOUSE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("page-ready");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("siteHeader");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenuToggle =
        document.getElementById("mobileMenuToggle");

    const mobileNav =
        document.getElementById("mobileNav");


    if (mobileMenuToggle && mobileNav) {

        mobileMenuToggle.addEventListener("click", () => {

            const isOpen =
                mobileNav.classList.toggle("open");

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close menu when clicking a link */

        const mobileLinks =
            mobileNav.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                mobileMenuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu with Escape */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                mobileNav.classList.remove("open");

                mobileMenuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    const animateCounter = (counter) => {

        const target =
            Number(counter.getAttribute("data-target"));

        if (!Number.isFinite(target)) {
            return;
        }

        const duration = 1600;

        const startTime = performance.now();


        const updateCounter = (currentTime) => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /*
             * Smooth easing
             */

            const eased =
                1 - Math.pow(1 - progress, 3);


            const currentValue =
                Math.floor(target * eased);


            counter.textContent =
                currentValue.toLocaleString("en-IN");


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString("en-IN");

            }

        };


        requestAnimationFrame(updateCounter);

    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.4
                }
            );


        counters.forEach((counter) => {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach((counter) => {

            const target =
                Number(
                    counter.getAttribute(
                        "data-target"
                    )
                );

            counter.textContent =
                target.toLocaleString("en-IN");

        });

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const targetElement =
                document.querySelector(targetId);


            if (!targetElement) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       CONTACT FORM → WHATSAPP
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document.getElementById("name")
                    ?.value
                    .trim() || "";


                const business =
                    document.getElementById("business")
                    ?.value
                    .trim() || "";


                const phone =
                    document.getElementById("phone")
                    ?.value
                    .trim() || "";


                const service =
                    document.getElementById("service")
                    ?.value
                    .trim() || "";


                const message =
                    document.getElementById("message")
                    ?.value
                    .trim() || "";


                if (
                    !name ||
                    !business ||
                    !phone ||
                    !service ||
                    !message
                ) {

                    alert(
                        "Please fill in all the required fields."
                    );

                    return;

                }


                const whatsappMessage =
`Hello Chirag Media House,

I would like to discuss a project.

Name: ${name}
Business: ${business}
Phone: ${phone}
Service Required: ${service}

Project Details:
${message}`;


                const whatsappURL =
                    "https://wa.me/916375637357?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.style.display = "none";

            const parent =
                image.parentElement;


            if (parent) {

                parent.classList.add(
                    "image-missing"
                );

            }

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            '.desktop-nav a[href^="#"]'
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const currentId =
                            entry.target.id;


                        navLinks.forEach((link) => {

                            const href =
                                link.getAttribute("href");


                            if (
                                href ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            } else {

                                link.classList.remove(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    threshold: 0.35
                }
            );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       PHONE LINK
    ===================================================== */

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );


    phoneLinks.forEach((link) => {

        link.setAttribute(
            "aria-label",
            "Call Chirag Media House"
        );

    });


    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 900 &&
            mobileNav &&
            mobileMenuToggle
        ) {

            mobileNav.classList.remove("open");

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "Chirag Media House website loaded successfully."
    );

});
