<?php

add_filter( 'mb_aio_extensions', function( $extensions ) {
    return [
        'mb-blocks',
        'meta-box-group',
        'meta-box-conditional-logic',
        // 'mb-settings-page',
        // 'mb-term-meta',
        // 'mb-user-meta',
        // 'mb-relationships',
    ];
} );

add_filter( 'mb_aio_show_settings', '__return_false' );