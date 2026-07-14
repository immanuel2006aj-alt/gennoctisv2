/*==================================================
NOCTIS TECHNOLOGIES

script.js

Phase 13A-1
Core Initialization

Author : Sam Immanuel J
==================================================*/

"use strict";

/*==================================================
DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeNoctis();

});

/*==================================================
INITIALIZE WEBSITE
==================================================*/

function initializeNoctis() {

    cacheDOM();

    initializeUtilities();

    initializeNavigation();

    initializeScrollEffects();

    initializeBackToTop();

    console.log(
        "%cNoctis Technologies",
        "color:#10b981;font-size:20px;font-weight:bold;"
    );

}

/*==================================================
CACHE DOM
==================================================*/

const DOM = {};

function cacheDOM() {

    DOM.body = document.body;

    DOM.header = document.querySelector("header");

    DOM.navLinks = document.querySelectorAll("nav a");

    DOM.sections = document.querySelectorAll("section");

    DOM.backToTop = document.getElementById("backToTop");

}

/*==================================================
UTILITIES
==================================================*/

function initializeUtilities() {

    window.noctis = {

        version: "1.0.0",

        initialized: true

    };

}

/*==================================================
PLACEHOLDERS
(Implemented in upcoming phases)
==================================================*/

function initializeNavigation(){}

function initializeScrollEffects(){}

function initializeBackToTop(){}

/*==================================================
PHASE 13A-2
CORE UTILITIES
==================================================*/

/*==================================================
SMOOTH SCROLL
==================================================*/

function smoothScroll(target) {

    const element = document.querySelector(target);

    if (!element) return;

    element.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

/*==================================================
SELECTORS
==================================================*/

function $(selector) {

    return document.querySelector(selector);

}

function $$(selector) {

    return document.querySelectorAll(selector);

}

/*==================================================
DEBOUNCE
==================================================*/

function debounce(callback, delay = 200) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/*==================================================
THROTTLE
==================================================*/

function throttle(callback, limit = 100) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

}

/*==================================================
VIEWPORT CHECK
==================================================*/

function isInViewport(element) {

    const rect = element.getBoundingClientRect();

    return (

        rect.top < window.innerHeight &&

        rect.bottom > 0

    );

}

/*==================================================
CLASS HELPERS
==================================================*/

function addClass(element, className) {

    if (element)

        element.classList.add(className);

}

function removeClass(element, className) {

    if (element)

        element.classList.remove(className);

}

function toggleClass(element, className) {

    if (element)

        element.classList.toggle(className);

}

/*==================================================
PREFERS REDUCED MOTION
==================================================*/

const prefersReducedMotion =

window.matchMedia(

"(prefers-reduced-motion: reduce)"

).matches;

/*==================================================
GLOBAL OBSERVER
==================================================*/

const observer = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add(

                "in-view"

            );

        }

    });

},

{

    threshold:0.15

}

);

/*==================================================
REGISTER OBSERVER
==================================================*/

function registerRevealAnimations() {

    $$("section").forEach(section => {

        observer.observe(section);

    });

}

registerRevealAnimations();
/*==================================================
PHASE 13B-1
NAVIGATION SYSTEM
==================================================*/

function initializeNavigation() {

    setupNavigationLinks();

    setupActiveNavigation();

    setupNavbarScroll();

}

/*==================================================
SMOOTH NAVIGATION
==================================================*/

function setupNavigationLinks() {

    DOM.navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (!href || !href.startsWith("#")) return;

        link.addEventListener("click", event => {

            event.preventDefault();

            smoothScroll(href);

        });

    });

}

/*==================================================
ACTIVE SECTION
==================================================*/

function setupActiveNavigation() {

    const options = {

        root:null,

        rootMargin:"-40% 0px -45% 0px",

        threshold:0

    };

    const sectionObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(!entry.isIntersecting) return;

                const id = entry.target.getAttribute("id");

                updateActiveNavigation(id);

            });

        },

        options

    );

    DOM.sections.forEach(section => {

        sectionObserver.observe(section);

    });

}

/*==================================================
UPDATE ACTIVE LINK
==================================================*/

function updateActiveNavigation(id) {

    DOM.navLinks.forEach(link => {

        removeClass(link,"active");

        if(link.getAttribute("href")==="#" + id){

            addClass(link,"active");

        }

    });

}

/*==================================================
NAVBAR SCROLL EFFECT
==================================================*/

function setupNavbarScroll() {

    const scrollHandler = throttle(() => {

        if(window.scrollY > 40){

            addClass(DOM.header,"scrolled");

        }

        else{

            removeClass(DOM.header,"scrolled");

        }

    },50);

    window.addEventListener(

        "scroll",

        scrollHandler,

        {

            passive:true

        }

    );

          }
/*==================================================
PHASE 13B-2
MOBILE NAVIGATION
==================================================*/

function initializeNavigation() {

    setupNavigationLinks();

    setupActiveNavigation();

    setupNavbarScroll();

    setupMobileMenu();

}

/*==================================================
CACHE MOBILE MENU
==================================================*/

DOM.menuButton = $("#menuToggle");

DOM.mobileMenu = $("#mobileMenu");

DOM.menuClose = $("#menuClose");

/*==================================================
SETUP MOBILE MENU
==================================================*/

function setupMobileMenu() {

    if (!DOM.menuButton || !DOM.mobileMenu) return;

    DOM.menuButton.addEventListener(

        "click",

        openMobileMenu

    );

    if (DOM.menuClose) {

        DOM.menuClose.addEventListener(

            "click",

            closeMobileMenu

        );

    }

    DOM.navLinks.forEach(link => {

        link.addEventListener(

            "click",

            closeMobileMenu

        );

    });

    document.addEventListener(

        "click",

        outsideMenuClick

    );

}

/*==================================================
OPEN
==================================================*/

function openMobileMenu() {

    addClass(

        DOM.mobileMenu,

        "active"

    );

    addClass(

        DOM.body,

        "menu-open"

    );

}

/*==================================================
CLOSE
==================================================*/

function closeMobileMenu() {

    removeClass(

        DOM.mobileMenu,

        "active"

    );

    removeClass(

        DOM.body,

        "menu-open"

    );

}

/*==================================================
OUTSIDE CLICK
==================================================*/

function outsideMenuClick(event) {

    if (

        !DOM.mobileMenu ||

        !DOM.mobileMenu.classList.contains("active")

    ) return;

    if (

        DOM.mobileMenu.contains(event.target) ||

        DOM.menuButton.contains(event.target)

    ) return;

    closeMobileMenu();

}

/*==================================================
ESC KEY
==================================================*/

document.addEventListener(

    "keydown",

    event => {

        if (

            event.key === "Escape"

        ) {

            closeMobileMenu();

        }

    }

);
/*==================================================
PHASE 13C-1
SCROLL EFFECTS
==================================================*/

function initializeScrollEffects() {

    setupScrollReveal();

    setupSectionAnimations();

}

/*==================================================
SCROLL REVEAL
==================================================*/

function setupScrollReveal() {

    const revealItems = $$(
        ".glass,.service-card,.project-card,.ai-card,.why-card,.pricing-card,.faq-item,.contact-form-card,.quick-card,.footer-column"
    );

    revealItems.forEach(item => {

        observer.observe(item);

    });

}

/*==================================================
SECTION ANIMATION
==================================================*/

function setupSectionAnimations() {

    DOM.sections.forEach(section => {

        observer.observe(section);

    });

}

/*==================================================
BACK TO TOP
==================================================*/

function initializeBackToTop() {

    if (!DOM.backToTop) return;

    const scrollHandler = throttle(() => {

        if (window.scrollY > 700) {

            addClass(

                DOM.backToTop,

                "show"

            );

        }

        else {

            removeClass(

                DOM.backToTop,

                "show"

            );

        }

    },100);

    window.addEventListener(

        "scroll",

        scrollHandler,

        {

            passive:true

        }

    );

    DOM.backToTop.addEventListener(

        "click",

        () => {

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    );

}
/*==================================================
PHASE 13C-2
PREMIUM SCROLL POLISH
==================================================*/

/*==================================================
SCROLL PROGRESS
==================================================*/

createScrollProgress();

function createScrollProgress() {

    const progress = document.createElement("div");

    progress.id = "scrollProgress";

    progress.style.cssText = `

        position:fixed;
        top:0;
        left:0;
        width:0%;
        height:3px;
        z-index:99999;
        background:linear-gradient(90deg,#10b981,#34d399);
        transition:width .1s linear;

    `;

    document.body.appendChild(progress);

    window.addEventListener(

        "scroll",

        throttle(updateScrollProgress,16),

        {

            passive:true

        }

    );

}

/*==================================================
UPDATE PROGRESS
==================================================*/

function updateScrollProgress() {

    const scrollTop =

        window.scrollY;

    const pageHeight =

        document.documentElement.scrollHeight -

        window.innerHeight;

    const percent =

        (scrollTop / pageHeight) * 100;

    $("#scrollProgress").style.width =

        percent + "%";

}

/*==================================================
HEADER GLOW
==================================================*/

window.addEventListener(

    "scroll",

    throttle(() => {

        if(!DOM.header) return;

        if(window.scrollY > 120){

            DOM.header.style.boxShadow =

            "0 10px 35px rgba(16,185,129,.10)";

        }

        else{

            DOM.header.style.boxShadow =

            "none";

        }

    },60),

    {

        passive:true

    }

);

/*==================================================
STAGGER REVEAL
==================================================*/

document

.querySelectorAll(

".service-card,.project-card,.ai-card,.why-card,.pricing-card,.faq-item,.quick-card"

)

.forEach(

(element,index)=>{

element.style.transitionDelay=

(index*80)+"ms";

}

);

/*==================================================
PERFORMANCE
==================================================*/

window.addEventListener(

"load",

()=>{

document.body.classList.add(

"page-loaded"

);

console.log(

"✔ Noctis Technologies Ready"

);

}

);

/*==================================================
END OF PHASE 13
==================================================*/
/*==================================================
PHASE 14A-1
PROJECT SLIDER
==================================================*/

let projectSlider = {};

initializeProjectSlider();

/*==================================================
INITIALIZE
==================================================*/

function initializeProjectSlider(){

    projectSlider.track =

        document.querySelector(".project-track");

    projectSlider.cards =

        document.querySelectorAll(".project-card");

    projectSlider.next =

        document.querySelector(".project-next");

    projectSlider.prev =

        document.querySelector(".project-prev");

    projectSlider.dots =

        document.querySelectorAll(".project-dots span");

    if(

        !projectSlider.track ||

        projectSlider.cards.length===0

    ) return;

    projectSlider.index = 0;

    projectSlider.total =

        projectSlider.cards.length;

    projectSlider.interval = null;

    projectSlider.cardWidth =

        projectSlider.cards[0].offsetWidth;

    projectSlider.gap = 28;

    updateProjectSlider();

    startProjectAutoPlay();

    setupProjectButtons();

}

/*==================================================
UPDATE
==================================================*/

function updateProjectSlider(){

    const offset=

    (

    projectSlider.cardWidth+

    projectSlider.gap

    )

    *

    projectSlider.index;

    projectSlider.track.style.transform=

    `translateX(-${offset}px)`;

    updateProjectDots();

}

/*==================================================
DOTS
==================================================*/

function updateProjectDots(){

    projectSlider.dots.forEach(

        dot=>dot.classList.remove("active")

    );

    if(

        projectSlider.dots[

        projectSlider.index

        ]

    ){

        projectSlider.dots[

        projectSlider.index

        ].classList.add("active");

    }

}
/*==================================================
PHASE 14A-2
AUTOPLAY & CONTROLS
==================================================*/

/*==================================================
AUTOPLAY
==================================================*/

function startProjectAutoPlay(){

    stopProjectAutoPlay();

    projectSlider.interval = setInterval(()=>{

        nextProject();

    },5000);

}

/*==================================================
STOP AUTOPLAY
==================================================*/

function stopProjectAutoPlay(){

    if(projectSlider.interval){

        clearInterval(projectSlider.interval);

        projectSlider.interval = null;

    }

}

/*==================================================
NEXT
==================================================*/

function nextProject(){

    projectSlider.index++;

    if(

        projectSlider.index >=

        projectSlider.total

    ){

        projectSlider.index = 0;

    }

    updateProjectSlider();

}

/*==================================================
PREVIOUS
==================================================*/

function previousProject(){

    projectSlider.index--;

    if(

        projectSlider.index < 0

    ){

        projectSlider.index =

        projectSlider.total - 1;

    }

    updateProjectSlider();

}

/*==================================================
BUTTON EVENTS
==================================================*/

function setupProjectButtons(){

    if(projectSlider.next){

        projectSlider.next.addEventListener(

            "click",

            ()=>{

                nextProject();

                startProjectAutoPlay();

            }

        );

    }

    if(projectSlider.prev){

        projectSlider.prev.addEventListener(

            "click",

            ()=>{

                previousProject();

                startProjectAutoPlay();

            }

        );

    }

}

/*==================================================
PAUSE ON HOVER
==================================================*/

projectSlider.track?.addEventListener(

    "mouseenter",

    stopProjectAutoPlay

);

projectSlider.track?.addEventListener(

    "mouseleave",

    startProjectAutoPlay

);

/*==================================================
DOT CLICK
==================================================*/

projectSlider.dots.forEach(

    (dot,index)=>{

        dot.addEventListener(

            "click",

            ()=>{

                projectSlider.index = index;

                updateProjectSlider();

                startProjectAutoPlay();

            }

        );

    }

);
/*==================================================
PHASE 14B-1
SWIPE • DRAG • KEYBOARD
==================================================*/

let dragStartX = 0;

let dragEndX = 0;

let dragging = false;

/*==================================================
ENABLE GESTURES
==================================================*/

setupProjectGestures();

function setupProjectGestures(){

    if(!projectSlider.track) return;

    /*==============================
    TOUCH
    ==============================*/

    projectSlider.track.addEventListener(

        "touchstart",

        touchStart,

        {passive:true}

    );

    projectSlider.track.addEventListener(

        "touchmove",

        touchMove,

        {passive:true}

    );

    projectSlider.track.addEventListener(

        "touchend",

        touchEnd

    );

    /*==============================
    MOUSE
    ==============================*/

    projectSlider.track.addEventListener(

        "mousedown",

        mouseDown

    );

    window.addEventListener(

        "mousemove",

        mouseMove

    );

    window.addEventListener(

        "mouseup",

        mouseUp

    );

    /*==============================
    KEYBOARD
    ==============================*/

    document.addEventListener(

        "keydown",

        keyboardSlider

    );

}

/*==================================================
TOUCH
==================================================*/

function touchStart(event){

    dragStartX =

    event.touches[0].clientX;

}

function touchMove(event){

    dragEndX =

    event.touches[0].clientX;

}

function touchEnd(){

    checkSwipe();

}

/*==================================================
MOUSE
==================================================*/

function mouseDown(event){

    dragging = true;

    dragStartX = event.clientX;

}

function mouseMove(event){

    if(!dragging) return;

    dragEndX = event.clientX;

}

function mouseUp(){

    if(!dragging) return;

    dragging = false;

    checkSwipe();

}

/*==================================================
CHECK SWIPE
==================================================*/

function checkSwipe(){

    const distance =

    dragStartX - dragEndX;

    if(Math.abs(distance) < 60) return;

    if(distance > 0){

        nextProject();

    }

    else{

        previousProject();

    }

    startProjectAutoPlay();

}

/*==================================================
KEYBOARD
==================================================*/

function keyboardSlider(event){

    if(event.key==="ArrowRight"){

        nextProject();

        startProjectAutoPlay();

    }

    if(event.key==="ArrowLeft"){

        previousProject();

        startProjectAutoPlay();

    }

}
/*==================================================
PHASE 14B-2
PROJECT LAUNCH
==================================================*/

setupProjectLaunch();

/*==================================================
INITIALIZE
==================================================*/

function setupProjectLaunch(){

    document

    .querySelectorAll(".project-btn")

    .forEach(button=>{

        button.addEventListener(

            "click",

            launchProject

        );

    });

}

/*==================================================
LAUNCH
==================================================*/

function launchProject(event){

    event.preventDefault();

    const button = event.currentTarget;

    const url =

    button.getAttribute("href");

    if(

        !url ||

        url==="#"

    ) return;

    if(

        button.dataset.loading==="true"

    ) return;

    button.dataset.loading="true";

    const originalText=

    button.innerHTML;

    button.style.pointerEvents="none";

    button.innerHTML=

    "Launching Project...";

    button.classList.add(

        "launching"

    );

    createLaunchBar(button);

    setTimeout(()=>{

        button.innerHTML=

        "Opening Website...";

    },500);

    setTimeout(()=>{

        window.open(

            url,

            "_blank",

            "noopener"

        );

        button.innerHTML=

        originalText;

        button.dataset.loading="false";

        button.style.pointerEvents="";

        button.classList.remove(

            "launching"

        );

        removeLaunchBar(button);

    },1000);

}

/*==================================================
LOADING BAR
==================================================*/

function createLaunchBar(button){

    const bar =

    document.createElement("div");

    bar.className=

    "launch-bar";

    button.appendChild(bar);

}

function removeLaunchBar(button){

    const bar=

    button.querySelector(

        ".launch-bar"

    );

    if(bar){

        bar.remove();

    }

}
/*==================================================
PHASE 15A-1
LIVING AI CORE
==================================================*/

const aiCore = {};

initializeAICore();

/*==================================================
INITIALIZE
==================================================*/

function initializeAICore(){

    aiCore.core =

        document.querySelector(".ai-core");

    aiCore.cards =

        document.querySelectorAll(".ai-card");

    aiCore.lines =

        document.querySelectorAll(".ai-network line");

    if(

        !aiCore.core ||

        aiCore.cards.length===0

    ) return;

    aiCore.active = 0;

    aiCore.interval = null;

    setupAICardHover();

    startAICycle();

}

/*==================================================
AUTO CYCLE
==================================================*/

function startAICycle(){

    stopAICycle();

    aiCore.interval = setInterval(()=>{

        aiCore.active++;

        if(

            aiCore.active >=

            aiCore.cards.length

        ){

            aiCore.active = 0;

        }

        activateAICard(

            aiCore.active

        );

    },4000);

}

/*==================================================
STOP
==================================================*/

function stopAICycle(){

    if(aiCore.interval){

        clearInterval(

            aiCore.interval

        );

        aiCore.interval = null;

    }

}
/*==================================================
PHASE 15A-2
AI INTERACTION
==================================================*/

/*==================================================
CARD HOVER
==================================================*/

function setupAICardHover(){

    aiCore.cards.forEach(

        (card,index)=>{

            card.addEventListener(

                "mouseenter",

                ()=>{

                    stopAICycle();

                    activateAICard(index);

                }

            );

            card.addEventListener(

                "mouseleave",

                ()=>{

                    startAICycle();

                }

            );

            card.addEventListener(

                "touchstart",

                ()=>{

                    stopAICycle();

                    activateAICard(index);

                },

                {

                    passive:true

                }

            );

        }

    );

}

/*==================================================
ACTIVATE CARD
==================================================*/

function activateAICard(index){

    aiCore.active = index;

    aiCore.cards.forEach(

        card=>{

            card.classList.remove(

                "ai-active"

            );

        }

    );

    aiCore.lines.forEach(

        line=>{

            line.classList.remove(

                "line-active"

            );

        }

    );

    if(aiCore.cards[index]){

        aiCore.cards[index]

        .classList.add(

            "ai-active"

        );

    }

    if(aiCore.lines[index]){

        aiCore.lines[index]

        .classList.add(

            "line-active"

        );

    }

    pulseAICore();

}

/*==================================================
CORE PULSE
==================================================*/

function pulseAICore(){

    aiCore.core.classList.remove(

        "core-pulse"

    );

    void aiCore.core.offsetWidth;

    aiCore.core.classList.add(

        "core-pulse"

    );

}
/*==================================================
PHASE 15B-1
AI BOOT SEQUENCE
==================================================*/

initializeAIBoot();

/*==================================================
BOOT
==================================================*/

function initializeAIBoot(){

    if(!aiCore.core) return;

    const aiSection =

        document.querySelector("#ai");

    if(!aiSection) return;

    const bootObserver =

    new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(

                    entry.isIntersecting

                ){

                    bootAI();

                    bootObserver.unobserve(

                        aiSection

                    );

                }

            });

        },

        {

            threshold:.35

        }

    );

    bootObserver.observe(

        aiSection

    );

}

/*==================================================
BOOT AI
==================================================*/

function bootAI(){

    aiCore.core.classList.add(

        "booting"

    );

    setTimeout(()=>{

        aiCore.core.classList.add(

            "boot-complete"

        );

    },2200);

    generateParticles();

}

/*==================================================
PARTICLE ENGINE
==================================================*/

function generateParticles(){

    const total = 16;

    for(

        let i=0;

        i<total;

        i++

    ){

        createParticle(i);

    }

}

function createParticle(index){

    const particle =

    document.createElement("span");

    particle.className=

    "ai-particle";

    particle.style.left=

    Math.random()*100+"%";

    particle.style.top=

    Math.random()*100+"%";

    particle.style.animationDelay=

    (Math.random()*5)+"s";

    particle.style.animationDuration=

    (5+Math.random()*4)+"s";

    aiCore.core.appendChild(

        particle

    );

}
/*==================================================
ENERGY VARIATION
==================================================*/

setInterval(()=>{

    if(!aiCore.core) return;

    const glow =

    18+

    Math.random()*18;

    aiCore.core.style.filter=

    `drop-shadow(0 0 ${glow}px rgba(16,185,129,.45))`;

},3000);
/*==================================================
PHASE 15B-2
LIVING NEURAL NETWORK
==================================================*/

initializeNeuralNetwork();

/*==================================================
INITIALIZE
==================================================*/

function initializeNeuralNetwork(){

    if(

        !aiCore.lines ||

        aiCore.lines.length===0

    ) return;

    startNeuralFlow();

}

/*==================================================
FLOW
==================================================*/

function startNeuralFlow(){

    setInterval(()=>{

        flowNeuralEnergy();

    },2200);

}

/*==================================================
ENERGY FLOW
==================================================*/

function flowNeuralEnergy(){

    if(

        !aiCore.lines ||

        aiCore.lines.length===0

    ) return;

    aiCore.lines.forEach(

        line=>{

            line.classList.remove(

                "energy-flow"

            );

        }

    );

    const index =

    aiCore.active %

    aiCore.lines.length;

    if(aiCore.lines[index]){

        animateLine(

            aiCore.lines[index]

        );

    }

}

/*==================================================
LINE ANIMATION
==================================================*/

function animateLine(line){

    line.classList.add(

        "energy-flow"

    );

    setTimeout(()=>{

        line.classList.remove(

            "energy-flow"

        );

    },1800);

    sendEnergyPulse();

}

/*==================================================
CORE ENERGY
==================================================*/

function sendEnergyPulse(){

    aiCore.core.classList.remove(

        "energy-pulse"

    );

    void aiCore.core.offsetWidth;

    aiCore.core.classList.add(

        "energy-pulse"

    );

}

/*==================================================
CARD ENERGY
==================================================*/

setInterval(()=>{

    if(

        !aiCore.cards ||

        aiCore.cards.length===0

    ) return;

    const card =

    aiCore.cards[

        aiCore.active

    ];

    if(!card) return;

    card.classList.remove(

        "card-energy"

    );

    void card.offsetWidth;

    card.classList.add(

        "card-energy"

    );

},4000);

/*==================================================
RANDOM DATA BURST
==================================================*/

setInterval(()=>{

    if(!aiCore.core) return;

    aiCore.core.classList.remove(

        "data-burst"

    );

    void aiCore.core.offsetWidth;

    aiCore.core.classList.add(

        "data-burst"

    );

},7000);
/*==================================================
PHASE 16A-1
PRICING COUNTER
==================================================*/

const pricingCounter = {};

initializePricingCounter();

/*==================================================
INITIALIZE
==================================================*/
function initializePricingCounter(){

    pricingCounter.section =
        document.querySelector("#pricing");

    pricingCounter.number =
        document.getElementById("priceCounter");

    if(
        !pricingCounter.section ||
        !pricingCounter.number
    ) return;

    pricingCounter.started = false;

    function startCounter(){

        if(pricingCounter.started) return;

        pricingCounter.started = true;

        animatePriceCounter();

    }

    /* IntersectionObserver */

    if("IntersectionObserver" in window){

        const observer = new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting){

                        startCounter();

                        observer.disconnect();

                    }

                });

            },

            {

                threshold: 0,
                rootMargin: "0px 0px -20% 0px"

            }

        );

        observer.observe(pricingCounter.section);

    }

    /* Mobile Scroll Fallback */

    window.addEventListener(

        "scroll",

        function checkPricing(){

            if(pricingCounter.started) return;

            const rect =
                pricingCounter.section.getBoundingClientRect();

            if(rect.top < window.innerHeight * 0.8){

                startCounter();

                window.removeEventListener(

                    "scroll",

                    checkPricing

                );

            }

        },

        {

            passive:true

        }

    );

}
/*==================================================
COUNTER
==================================================*/

function animatePriceCounter(){

    const start = 0;

    const end = 1999;

    const duration = 1800;

    const startTime =

    performance.now();

    function update(time){

        const progress =

        Math.min(

            (time-startTime)/duration,

            1

        );

        const eased =

        easeOutCubic(

            progress

        );

        const value =

        Math.floor(

            start+

            (end-start)*eased

        );

        pricingCounter.number.textContent=

        value.toLocaleString(

            "en-IN"

        );

        if(progress<1){

            requestAnimationFrame(

                update

            );

        }

        else{

            pricingCounter.number.textContent=

            "1,999";

            finishPricingCounter();

        }

    }

    requestAnimationFrame(

        update

    );

}
/*==================================================
PHASE 16A-2
PRICING REVEAL
==================================================*/

/*==================================================
EASING
==================================================*/

function easeOutCubic(x){

    return 1 - Math.pow(1 - x,3);

}

/*==================================================
FINISH
==================================================*/

function finishPricingCounter(){

    pricingCounter.section.classList.add(

        "pricing-complete"

    );

    pulsePricingHero();

    revealPricingCards();

}

/*==================================================
PULSE
==================================================*/

function pulsePricingHero(){

    const hero =

    document.querySelector(

        ".pricing-hero"

    );

    if(!hero) return;

    hero.classList.remove(

        "price-pulse"

    );

    void hero.offsetWidth;

    hero.classList.add(

        "price-pulse"

    );

}

/*==================================================
REVEAL CARDS
==================================================*/

function revealPricingCards(){

    const cards =

    document.querySelectorAll(

        ".pricing-card"

    );

    cards.forEach(

        (card,index)=>{

            setTimeout(()=>{

                card.classList.add(

                    "price-card-show"

                );

            },

            index*180);

        }

    );

}

/*==================================================
BUTTON GLOW
==================================================*/

setTimeout(()=>{

    document

    .querySelectorAll(

        ".pricing-btn"

    )

    .forEach(button=>{

        button.classList.add(

            "price-button-ready"

        );

    });

},2200);

/*==================================================
REPLAY PROTECTION
==================================================*/

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(

            document.hidden

        ) return;

        if(

            pricingCounter.started

        ){

            pricingCounter.number.textContent=

            "1,999";

        }

    }

);

/*==================================================
END PHASE 16
==================================================*/
/*==================================================
PHASE 17A-1
FAQ ENGINE
==================================================*/

const faq = {};

initializeFAQ();

/*==================================================
INITIALIZE
==================================================*/

function initializeFAQ(){

    faq.items =

        document.querySelectorAll(".faq-item");

    if(

        faq.items.length===0

    ) return;

    faq.openItem = null;

    faq.typed = new WeakSet();

    faq.items.forEach(item=>{

        const button =

        item.querySelector(

            ".faq-question"

        );

        button.addEventListener(

            "click",

            ()=>{

                toggleFAQ(item);

            }

        );

    });

}

/*==================================================
TOGGLE
==================================================*/

function toggleFAQ(item){

    if(

        faq.openItem===item

    ){

        closeFAQ(item);

        faq.openItem=null;

        return;

    }

    if(faq.openItem){

        closeFAQ(

            faq.openItem

        );

    }

    openFAQ(item);

    faq.openItem=item;

}

/*==================================================
OPEN
==================================================*/

function openFAQ(item){

    item.classList.add(

        "active"

    );

    const answer =

    item.querySelector(

        ".typing-text"

    );

    if(!answer) return;

    if(

        faq.typed.has(answer)

    ) return;

    typeAnswer(answer);

}

/*==================================================
CLOSE
==================================================*/

function closeFAQ(item){

    item.classList.remove(

        "active"

    );

        }
/*==================================================
PHASE 17A-2
AI TYPEWRITER
==================================================*/

/*==================================================
TYPE ANSWER
==================================================*/

function typeAnswer(element){

    const fullText =

    element.textContent.trim();

    element.textContent = "";

    let index = 0;

    const speed = 18;

    const cursor =

    document.createElement("span");

    cursor.className =

    "typing-cursor";

    cursor.textContent = "|";

    element.appendChild(cursor);

    function type(){

        if(index < fullText.length){

            cursor.insertAdjacentText(

                "beforebegin",

                fullText.charAt(index)

            );

            index++;

            setTimeout(

                type,

                speed

            );

        }

        else{

            cursor.remove();

            faq.typed.add(

                element

            );

            finishTyping(

                element

            );

        }

    }

    type();

}

/*==================================================
FINISH
==================================================*/

function finishTyping(element){

    element.classList.add(

        "typing-complete"

    );

    const item =

    element.closest(

        ".faq-item"

    );

    if(item){

        item.classList.add(

            "faq-ready"

        );

    }

}

/*==================================================
RESET (OPTIONAL)
==================================================*/

function resetFAQTyping(){

    faq.items.forEach(item=>{

        const answer =

        item.querySelector(

            ".typing-text"

        );

        if(answer){

            answer.classList.remove(

                "typing-complete"

            );

        }

    });

}

/*==================================================
KEYBOARD ACCESSIBILITY
==================================================*/

faq.items.forEach(item=>{

    const button =

    item.querySelector(

        ".faq-question"

    );

    if(!button) return;

    button.addEventListener(

        "keydown",

        event=>{

            if(

                event.key==="Enter" ||

                event.key===" "

            ){

                event.preventDefault();

                toggleFAQ(item);

            }

        }

    );

});
/*==================================================
PHASE 18A-1
SMART CONTACT FORM
==================================================*/

const contact = {};

initializeContactForm();

/*==================================================
INITIALIZE
==================================================*/

function initializeContactForm(){

    contact.form =

        document.getElementById(

            "contactForm"

        );

    contact.phone =

        document.getElementById(

            "phoneInput"

        );

    contact.button =

        document.querySelector(

            ".contact-submit"

        );

    if(

        !contact.form ||

        !contact.phone

    ) return;

    setupPhoneInput();

    setupContactForm();

}

/*==================================================
PHONE INPUT
==================================================*/

function setupPhoneInput(){

    contact.phone.addEventListener(

        "input",

        formatPhoneNumber

    );

    contact.phone.addEventListener(

        "blur",

        validatePhoneNumber

    );

}

/*==================================================
FORMAT
==================================================*/

function formatPhoneNumber(event){

    let value =

    event.target.value

    .replace(/\D/g,"");

    if(

        value.startsWith("91")

    ){

        value = value.substring(2);

    }

    value = value.substring(0,10);

    if(

        value.length > 5

    ){

        value =

        value.substring(0,5)

        +" "+

        value.substring(5);

    }

    event.target.value =

    value;

}

/*==================================================
VALIDATE
==================================================*/

function validatePhoneNumber(){

    const digits =

    contact.phone.value

    .replace(/\D/g,"");

    if(

        digits.length===10

    ){

        contact.phone.classList.add(

            "valid-phone"

        );

        contact.phone.classList.remove(

            "invalid-phone"

        );

        return true;

    }

    contact.phone.classList.remove(

        "valid-phone"

    );

    contact.phone.classList.add(

        "invalid-phone"

    );

    return false;

    }
/*==================================================
PHASE 18A-2
FORM SUBMISSION ENGINE
==================================================*/

/*==================================================
FORM
==================================================*/

function setupContactForm(){

    contact.form.addEventListener(

        "submit",

        submitContactForm

    );

}

/*==================================================
SUBMIT
==================================================*/

function submitContactForm(event){

    event.preventDefault();

    if(

        !validatePhoneNumber()

    ){

        contact.phone.focus();

        triggerInvalidPhone();

        return;

    }

    startSubmitAnimation();

}

/*==================================================
BUTTON
==================================================*/

function startSubmitAnimation(){

    contact.button.disabled = true;

    contact.button.classList.add(

        "sending"

    );

    contact.button.textContent =

        "Sending...";

    setTimeout(()=>{

        submitSuccess();

    },1800);

}

/*==================================================
SUCCESS
==================================================*/

function submitSuccess(){

    contact.button.classList.remove(

        "sending"

    );

    contact.button.classList.add(

        "success"

    );

    contact.button.textContent =

        "✓ Enquiry Received";

    contact.form.classList.add(

        "form-success"

    );

    setTimeout(()=>{

        contact.form.reset();

        contact.phone.classList.remove(

            "valid-phone",

            "invalid-phone"

        );

        contact.button.classList.remove(

            "success"

        );

        contact.button.disabled = false;

        contact.button.textContent =

            "Start My Project";

    },3000);

}

/*==================================================
INVALID PHONE
==================================================*/

function triggerInvalidPhone(){

    contact.phone.classList.remove(

        "phone-shake"

    );

    void contact.phone.offsetWidth;

    contact.phone.classList.add(

        "phone-shake"

    );

}

/*==================================================
READY FOR BACKEND
==================================================*/

function sendToBackend(formData){

    console.log(

        "Backend Integration Pending",

        formData

    );

        }
/*==================================================
PHASE 19A-1
PREMIUM ENGINE
==================================================*/

initializePremiumEngine();

/*==================================================
INITIALIZE
==================================================*/

function initializePremiumEngine(){

    setupPageLoader();

    setupFooterSignature();

    setupBackToTopEffects();

    setupPerformanceMode();

}

/*==================================================
PAGE LOADER
==================================================*/

function setupPageLoader(){

    window.addEventListener(

        "load",

        ()=>{

            document.body.classList.add(

                "page-ready"

            );

        },

        {

            once:true

        }

    );

}

/*==================================================
FOOTER SIGNATURE
==================================================*/

function setupFooterSignature(){

    const footer =

    document.querySelector(".footer");

    if(!footer) return;

    const observer =

    new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    footer.classList.add(

                        "footer-visible"

                    );

                }

            });

        },

        {

            threshold:.7

        }

    );

    observer.observe(footer);

}

/*==================================================
BACK TO TOP
==================================================*/

function setupBackToTopEffects(){

    if(!DOM.backToTop) return;

    DOM.backToTop.addEventListener(

        "mouseenter",

        ()=>{

            DOM.backToTop.classList.add(

                "top-hover"

            );

        }

    );

    DOM.backToTop.addEventListener(

        "mouseleave",

        ()=>{

            DOM.backToTop.classList.remove(

                "top-hover"

            );

        }

    );

}

/*==================================================
PERFORMANCE
==================================================*/

function setupPerformanceMode(){

    if(prefersReducedMotion){

        document.body.classList.add(

            "reduce-motion"

        );

    }

        }
/*==================================================
PHASE 19A-2
FINAL PRODUCTION POLISH
==================================================*/

/*==================================================
ERROR HANDLER
==================================================*/

window.addEventListener(

    "error",

    event=>{

        console.warn(

            "Noctis JS Warning:",

            event.message

        );

    }

);

/*==================================================
UNHANDLED PROMISES
==================================================*/

window.addEventListener(

    "unhandledrejection",

    event=>{

        console.warn(

            "Unhandled Promise:",

            event.reason

        );

    }

);

/*==================================================
PAGE VISIBILITY
==================================================*/

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            stopProjectAutoPlay();

            stopAICycle();

        }

        else{

            startProjectAutoPlay();

            startAICycle();

        }

    }

);

/*==================================================
KEYBOARD SHORTCUTS
==================================================*/

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.ctrlKey &&

            event.shiftKey &&

            event.key==="D"

        ){

            console.clear();

            console.table({

                Website:"Noctis Technologies",

                Version:"1.0.0",

                Status:"Production Ready",

                Author:"Sam Immanuel J"

            });

        }

    }

);

/*==================================================
EASTER EGG
==================================================*/

let easterEggTimer;

const footer =

document.querySelector(

    ".footer"

);

if(footer){

    footer.addEventListener(

        "mouseenter",

        ()=>{

            easterEggTimer=

            setTimeout(()=>{

                console.log(

`✨ Dream.
✨ Design.
✨ Develop.
✨ Deploy.

NOCTIS TECHNOLOGIES`

                );

            },5000);

        }

    );

    footer.addEventListener(

        "mouseleave",

        ()=>{

            clearTimeout(

                easterEggTimer

            );

        }

    );

}

/*==================================================
VERSION
==================================================*/

window.noctis.version =

"1.0.0";

/*==================================================
READY
==================================================*/

console.log(

"%c✔ Noctis Technologies v1.0.0 Ready",

"color:#10b981;font-size:16px;font-weight:bold;"

);

/*==================================================
END OF SCRIPT.JS
==================================================*/
