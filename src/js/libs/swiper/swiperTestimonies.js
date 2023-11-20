import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

export default {
    selector: ".swiper-testimonies",
    options: {
        modules: [Navigation, Pagination, Autoplay],

        // Params
        spaceBetween: 50,

        // Auto
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },

        // Navigation
        navigation: {
            prevEl: ".swiper-button--prev",
            nextEl: ".swiper-button--next",
        },

        // Pagination
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },

        // Responsive
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 100,
            },
            1600: {
                slidesPerView: 2,
                spaceBetween: 300,
            },
        },
    },
};
