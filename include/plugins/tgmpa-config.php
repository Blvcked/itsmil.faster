<?php 
add_action( 'tgmpa_register', 'seb_theme_plugins' );
function seb_theme_plugins() {
    $plugins = array(
        array(
            'name'     => 'MetaBox',
            'slug'     => 'meta-box',
            'required' => true,
        ),
    );

    $config = array(
        // TGMPA config settings.
    );

    tgmpa( $plugins, $config );
}
