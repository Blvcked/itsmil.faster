<?php

// Theme Setup
add_action( 'after_setup_theme', 'seb_theme_setup' );
function seb_theme_setup() {
    /*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

    /*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support( 'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);

    /**
	 * Add support for Backend CSS.
	 *
	 * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#editor-styles
	 */
    add_theme_support( 'editor-styles' );
}

// Enqueue Backend CSS
add_action( 'admin_init', 'enqueue_backend_style' );
function enqueue_backend_style() {
    add_editor_style( 'dist/css/backend.css' );
}

// Register Menus
register_nav_menus(
	array(
		'header-navigation' => esc_html__( 'Header Navigation', 'seb-theme' ),
		'footer-navigation' => esc_html__( 'Footer Navigation', 'seb-theme' ),
	)
);