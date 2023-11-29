/**
 * Force WS Form's to Init/re-Render
 * Used in Barba.js hooks to avoid the AJAX conflict.
 */
const initForms = () => {
	wsf_form_init();
};

export default initForms;
