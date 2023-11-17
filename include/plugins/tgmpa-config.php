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
            'source'   => 'https://wsform.com/index.php?eddfile=163977%3A498%3A1&ttl=1700274027&file=1&token=bf0b43f0de3652615365522774ccf6372304d4b1a9fa96d6b6b9262e9808fd9a',
            'required' => false
        ),

        // WS Form PRO: User Management
        array(
            'name'     => 'WS Form PRO - User Management',
            'slug'     => 'ws-form-user',
            'source'   => 'https://wsform.com/index.php?eddfile=163977%3A650%3A1&ttl=1700274027&file=1&token=ba128bed97e22e75e791d20907c3f39fb53fc1640806bad57e017bd869a0af9d',
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
        'dismissable'  => false,
        'strings'      => array(
            'menu_title' => __( 'Required Plugins', 'tgmpa' )
        ),
    );

    tgmpa( $plugins, $config );
}
