<?php

add_action( 'tgmpa_register', 'seb_theme_plugins' );
function seb_theme_plugins() {

    $plugins = array(
        // MetaBox Core
        array(
            'name'     => 'MetaBox',
            'slug'     => 'meta-box',
            'required' => true
        ),
        
        // MetaBox AIO
        array(
            'name'         => 'Meta Box AIO',
            'slug'         => 'meta-box-aio',
            'required'     => true,
            'source'       => 'https://metabox.io/?action=download&product=meta-box-aio&api_key=70d55fd2f5b4136b969b9794f9e016bd',
        ),
    );

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
