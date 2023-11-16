<?php

add_filter( 'mb_aio_extensions', function( $extensions ) {
    return [
        'mb-blocks',
        'meta-box-group',
        'meta-box-conditional-logic',
    ];
} );

// add_filter( 'mb_aio_show_settings', '__return_false' );