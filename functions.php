<?php

// Version Control, specify in style.css
if ( ! defined( '_VER' ) ) {
	define( '_VER', wp_get_theme()->get( 'Version' ) );
}

// Enqueue Dist
add_action( 'wp_enqueue_scripts', 'enqueue_frontend_dist' );
function enqueue_frontend_dist() {
	
	wp_enqueue_style(
        'frontend',
        get_template_directory_uri() . '/dist/css/frontend.css',
        array(), _VER, 'all'
    );

	wp_enqueue_script(
        'frontend',
        get_template_directory_uri() . '/dist/js/frontend.js',
        array(), _VER, true
    );

	// Allows to pass server-side PHP variables to client-side JavaScript
    wp_localize_script( 'frontend', 'global_params', array(
        'map_api_key' => get_option( 'map_api_key', 'AIzaSyBY4Y942umBAtFyrAyHtp69JehsJRPyPSQ' )
    ));
}

// Require All PHP Files Within The Include Folder
foreach ( glob( get_template_directory() . '/include/**/*.php' ) as $file ) {
    require_once $file;
}