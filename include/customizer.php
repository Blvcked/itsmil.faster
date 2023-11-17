<?php

add_action( 'customize_register', 'seb_theme_register_customize' );
function seb_theme_register_customize( $wp_customize ) {

    // Theme Settings
    $wp_customize->add_section( 'theme_settings', array(
        'title'    => __( 'Theme Settings', 'seb-theme' ),
        'priority' => 30,
    ) );

    // Loader
    $wp_customize->add_setting( 'enable_loader', array(
        'default' => true,
    ) );
    $wp_customize->add_control( 'enable_loader', array(
        'label'    => __( 'Enable Loader', 'seb-theme' ),
        'section'  => 'theme_settings',
        'type'     => 'checkbox',
    ) );

    // Decoration Filter
    $wp_customize->add_setting( 'enable_decoration-filter', array(
        'default' => true,
    ) );
    $wp_customize->add_control( 'enable_decoration-filter', array(
        'label'    => __( 'Enable Decoration Filter', 'seb-theme' ),
        'section'  => 'theme_settings',
        'type'     => 'checkbox',
    ) );

    // Decoration Grid
    $wp_customize->add_setting( 'enable_decoration-grid', array(
        'default' => true,
    ) );
    $wp_customize->add_control( 'enable_decoration-grid', array(
        'label'    => __( 'Enable Decoration Grid', 'seb-theme' ),
        'section'  => 'theme_settings',
        'type'     => 'checkbox',
    ) );

    // Decoration Noise
    $wp_customize->add_setting( 'enable_decoration-noise', array(
        'default' => true,
    ) );
    $wp_customize->add_control( 'enable_decoration-noise', array(
        'label'    => __( 'Enable Decoration Noise', 'seb-theme' ),
        'section'  => 'theme_settings',
        'type'     => 'checkbox',
    ) );

    // Scroll Progress
    $wp_customize->add_setting( 'enable_scroll-progress-indicator', array(
        'default' => true,
    ) );
    $wp_customize->add_control( 'enable_scroll-progress-indicator', array(
        'label'    => __( 'Enable Scroll Progress Indicator', 'seb-theme' ),
        'section'  => 'theme_settings',
        'type'     => 'checkbox',
    ) );
    
    // Map Settings
    $wp_customize->add_setting( 'map_api_key', [
        'type' => 'option',
    ] );
    $wp_customize->add_control( 'map_api_key', [
        'type'      => 'text',
        'section'   => 'theme_settings',
        'label'     => __( 'Google Maps API Key', 'seb-theme' ),
    ] );
}

// Push Classes to Body
add_filter( 'body_class', 'push_body_classes' );
function push_body_classes( $classes ) {
    if( get_theme_mod( 'enable_decoration-grid', true ) ) {
        $classes[] = 'decoration-grid--enabled';
    }
    return $classes;
}