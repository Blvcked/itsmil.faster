import Swiper from "swiper";

import swiperExample from "./swiperExample";
import swiperTestimonies from "./swiperTestimonies";

// Declare an array of the configuration objects for the Swiper instances.
const swiperConfigs = [swiperExample, swiperTestimonies];

// Declare an object to keep track of the active Swiper instances. The keys are selectors and the values are Swiper instances.
const swiperInstances = {};

// Declare a function to initialize a Swiper instance. It takes a configuration object as an argument.
const initSwiper = (config) => {
    // Find the DOM target that matches the selector from the configuration object.
    const swiperElement = document.querySelector(config.selector);

    // Log the state of the swiperInstances object to the console for debugging purposes.
    // console.log(
    // 	"Before initialization:",
    // 	swiperInstances,
    // 	"Count:",
    // 	Object.keys(swiperInstances).length
    // );

    if (swiperElement) {
        // If there's already a Swiper instance associated with this selector, destroy it to make room for the new one.
        if (swiperInstances[config.selector]) {
            swiperInstances[config.selector].destroy();
        }

        // Create a new Swiper instance on the found target with the options from the configuration object.
        const swiperInstance = new Swiper(swiperElement, config.options);

        // Store the new Swiper instance in the swiperInstances object, associated with its selector.
        swiperInstances[config.selector] = swiperInstance;

        // Log the state of the swiperInstances object to the console for debugging purposes.
        // console.log(
        // 	"After initialization:",
        // 	swiperInstances,
        // 	"Count:",
        // 	Object.keys(swiperInstances).length
        // );

        // Return the new Swiper instance.
        // return swiperInstance;
    }
};

// Declare a function to initialize all Swiper instances. It loops over the swiperConfigs array and calls initSwiper on each configuration object.
export const initSwipers = () => {
    swiperConfigs.forEach(initSwiper);
};
