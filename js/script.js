/* =========================================================
   CHIRAG MEDIA HOUSE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const header = document.getElementById("siteHeader");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNav");
    const currentYear = document.getElementById("currentYear");


    /* =====================================================
       02. CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       03. STICKY HEADER
    ===================================================== */

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    handleHeader();

    window.addEventListener("scroll", handleHeader, {
        passive: true
    });


    /* =====================================================
       04. MOBILE MENU
    ===================================================== */

    if (mobileMenuBtn && mobileNav) {

        mobileMenuBtn.addEventListener("click", () => {

            const isOpen =
                mobileNav.classList.toggle("active");

            mobileMenuBtn.classList.toggle(
                "active",
                isOpen
            );

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* Close menu when clicking navigation link */

        const mobileLinks =
            mobileNav.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");

                mobileMenuBtn.classList.remove("active");

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });


        /* Close menu with Escape */

        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                mobileNav.classList.contains("active")
            ) {

                mobileNav.classList.remove("active");

                mobileMenuBtn.classList.remove("active");

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        });

    }


    /* =====================================================
       05. SCROLL REVEAL ANIMATION
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
                                "visible"
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

            element.classList.add("visible");

        });

    }


    /* =====================================================
       06. ANIMATED COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter-number[data-target]"
        );


    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target);

        if (
            Number.isNaN(target) ||
            target <= 0
        ) {
            return;
        }


        const duration = 1800;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /*
             * Ease-out animation
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

        }


        requestAnimationFrame(updateCounter);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            const counter =
                                entry.target;

                            animateCounter(counter);

                            observer.unobserve(
                                counter
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach((counter) => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       07. SMOOTH ANCHOR LINKS
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


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       08. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document.getElementById("name")?.value.trim();

                const business =
                    document.getElementById("business")?.value.trim();

                const phone =
                    document.getElementById("phone")?.value.trim();

                const service =
                    document.getElementById("service")?.value;

                const message =
                    document.getElementById("message")?.value.trim();


                /*
                 * Basic validation
                 */

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


                /*
                 * Temporary WhatsApp enquiry flow.
                 *
                 * Later this can be replaced with a proper
                 * backend/form service without changing the UI.
                 */

                const whatsappNumber =
                    "916375637357";


                const whatsappMessage =
                    `Hi Chirag Media House,

Name: ${name}
Business: ${business}
Phone: ${phone}
Service: ${service}

Message:
${message}`;


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=` +
                    encodeURIComponent(whatsappMessage);


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =====================================================
       09. IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add(
                "image-not-found"
            );

        });

    });


    /* =====================================================
       10. RESIZE HANDLING
    ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);


            resizeTimer = setTimeout(() => {

                /*
                 * Close mobile menu if viewport becomes
                 * desktop size.
                 */

                if (
                    window.innerWidth > 900 &&
                    mobileNav &&
                    mobileNav.classList.contains("active")
                ) {

                    mobileNav.classList.remove(
                        "active"
                    );

                    mobileMenuBtn?.classList.remove(
                        "active"
                    );

                    mobileMenuBtn?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }

            }, 150);

        }
    );


    /* =====================================================
       11. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
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
                            entry.target.getAttribute("id");


                        navLinks.forEach((link) => {

                            link.classList.remove(
                                "active"
                            );


                            const href =
                                link.getAttribute("href");


                            if (
                                href ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-25% 0px -65% 0px"
                }
            );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       12. PHONE NUMBER NORMALIZATION
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
       13. EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach((link) => {

        const rel =
            link.getAttribute("rel") || "";


        if (!rel.includes("noopener")) {

            link.setAttribute(
                "rel",
                `${rel} noopener noreferrer`.trim()
            );

        }

    });


    /* =====================================================
       14. PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});
