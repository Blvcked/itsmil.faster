<?php

add_action( 'tgmpa_register', 'seb_theme_plugins' );
function seb_theme_plugins() {

    $plugins = array(
        // MetaBox: Core
        array(
            'name'     => 'MetaBox',
            'slug'     => 'meta-box',
            'required' => true
        ),
        
        // MetaBox: AIO
        array(
            'name'     => 'Meta Box AIO',
            'slug'     => 'meta-box-aio',
            'source'   => 'https://metabox.io/?action=download&product=meta-box-aio&api_key=70d55fd2f5b4136b969b9794f9e016bd',
            'required' => true
        ),

        // WS Form PRO: Core
        array(
            'name'     => 'WS Form PRO',
            'slug'     => 'ws-form-pro',
            'source'   => 'https://wsform.com/index.php?eddfile=172337%3A498%3A1&ttl=1703258600&file=1&token=fd467bdb270f0cd86d509669732ea0a5da8fe99449a42d1836d87d57539c2024',
            'required' => false
        ),

        // WS Form PRO: User Management
        array(
            'name'     => 'WS Form PRO - User Management',
            'slug'     => 'ws-form-user',
            'source'   => 'https://wsform.com/index.php?eddfile=172337%3A650%3A1&ttl=1703258600&file=1&token=9408e8ab1febf9f11f35f796630a59a8736831b4f66862fc4e29c6bb5b6f5e88',
            'required' => false
        ),

        // WPS: Limit Login
        array(
            'name'     => 'WPS Limit Login',
            'slug'     => 'wps-limit-login',
            'required' => false
        ),

        // WPS: Hide Login
        array(
            'name'     => 'WPS Hide Login',
            'slug'     => 'wps-hide-login',
            'required' => false
        ),
    );

    // Global Config
    $config = array(
        'id'           => 'seb-theme',
        'parent_slug'  => 'plugins.php',
        'menu'         => 'tgmpa',
        'capability'   => 'edit_theme_options',
        'is_automatic' => true,
        'has_notices'  => true,
        'dismissable'  => true,
        'strings'      => array(
            'menu_title' => __( 'Required Plugins', 'tgmpa' )
        ),
    );

    tgmpa( $plugins, $config );
}
