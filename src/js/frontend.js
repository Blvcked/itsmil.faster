// ======================
// GLOBALS
// ======================

window.DEBUG = false;
if (window.DEBUG) document.body.classList.add("debug--enabled");

window.cursorPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// ======================
// IMPORTS
// ======================

// CSS
import "../scss/libs/bootstrap/_my-bs.scss";
import "../scss/frontend.scss";

// Barba
import barba from "@barba/core";
import initBarba from "./libs/barba/initBarba";
import barbaUpdateClasses from "./barba/barbaUpdateClasses.js";
// import barbaBackButton from "./barba/barbaBackButton";

// GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger";
import initGsap from "./libs/gsap/initGsap";
import initTriggers from "./libs/gsap/initTriggers";
import {
    killTriggers,
    // refreshTriggers,
    updateTriggers,
    updateEffects,
    scrollTo,
} from "./libs/gsap/gsapUtils";

// Swiper
import { initSwipers } from "./libs/swiper/initSwipers";

// Mouse Follower
import initMouseFollower from "./libs/mouseFollower";

// GLightbox
import initGLightbox from "./libs/gLightbox";

// Utilities
import getHeight from "./utils/getHeight";
import initVideos from "./utils/initVideos";
import initMaps from "./utils/initMaps";
import initForms from "./utils/initForms";
import exitLoader from "./utils/exitLoader";
import betterOffcanvas from "./utils/betterOffcanvas";
import getScrollProgress from "./utils/getScrollProgress";
import {
    anchorSetupListeners,
    anchorExecuteExternal,
} from "./utils/anchorsManager";
import FPSMeter from "./utils/fpsMeter.js";

// ======================
// EVENT LISTENERS
// ======================

// DOC Ready
function documentReady() {
    initBarba();
    getHeight("#siteHeader", "#siteNavbar", "#siteFooter");

    initGsap();
    initSwipers();
    initVideos();
    if (!ScrollTrigger.isTouch) initMouseFollower();

    anchorSetupListeners();

    new FPSMeter();
}
document.addEventListener(`DOMContentLoaded`, documentReady, false);

// WINDOW Load
function windowLoad() {
    initTriggers();

    initGLightbox();
    initMaps();
    betterOffcanvas();

    exitLoader();
}
window.addEventListener(`load`, windowLoad, false);

// WINDOW Scroll
function windowScroll() {
    getScrollProgress();
}
window.addEventListener(`scroll`, windowScroll, { passive: true });

// DOC Move
function mouseMove(e) {
    window.cursorPosition = { x: e.clientX, y: e.clientY };
}
document.addEventListener("mousemove", mouseMove, false);

// ======================
// WS Forms (Requires jQuery)
// ======================

// (function ($) {
// 	function scrollToForm(event, form_object, form_id, instance_id) {
// 		const formElement = document.getElementById("ws-form-" + instance_id);
// 		scrollTo(formElement);
// 	}
// 	$(document)
// 		.on("wsf-validate-after", scrollToForm)
// 		.on("wsf-submit-success", initTriggers);
// })(jQuery);

// ======================
// BARBA HOOKS
// ======================

barba.hooks.beforeOnce(() => {
    if (DEBUG) console.log(`beforeOnce`);
});

barba.hooks.once(() => {
    if (DEBUG) console.log(`once`);
});

barba.hooks.afterOnce(() => {
    if (DEBUG) console.log(`afterOnce`);
});

barba.hooks.before(() => {
    if (DEBUG) console.log(`before`);
});

barba.hooks.beforeLeave(() => {
    if (DEBUG) console.log(`beforeLeave`);
});

barba.hooks.leave((data) => {
    if (DEBUG) console.log(`Leaving: ${data.current.namespace}`);
});

barba.hooks.afterLeave(() => {
    if (DEBUG) console.log("afterLeave");
    killTriggers();
});

barba.hooks.beforeEnter((data) => {
    if (DEBUG) console.log(`beforeEnter`);

    barbaUpdateClasses(data.next.html);
});

barba.hooks.enter((data) => {
    if (DEBUG) console.log(`Entering: ${data.next.namespace}`);
});

barba.hooks.afterEnter(() => {
    if (DEBUG) console.log(`afterEnter`);
});

barba.hooks.after(() => {
    if (DEBUG) console.log("after");

    // Reattach event listeners for anchor links
    anchorSetupListeners();

    // Other setup after entering a new page
    if (!ScrollTrigger.isTouch) initMouseFollower();

    initTriggers();
    updateEffects();
    updateTriggers();

    initSwipers();
    initVideos();
    initGLightbox();
    initMaps();
    initForms();
    // barbaBackButton();

    // if (!window.isBackButtonClicked) {
    scrollTo(0, false);
    // }
    // window.isBackButtonClicked = false;

    anchorExecuteExternal();
});
