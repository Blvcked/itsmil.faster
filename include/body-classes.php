<?php

add_filter( 'rwmb_meta_boxes', 'seb_theme_register_meta_boxes' );
function seb_theme_register_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'      => 'Custom Settings',
        'post_types' => 'page',
        'fields'     => array(
            array(
                'name' => 'Custom Body Class',
                'id'   => 'custom-body-class',
                'type' => 'text',
            ),
        ),
    );
    return $meta_boxes;
}

add_filter('body_class', 'add_custom_body_class');
function add_custom_body_class($classes) {
    if (is_page() || is_single() || is_front_page()) {
        $custom_class = get_post_meta(get_queried_object_id(), 'custom-body-class', true);
        
        if ($custom_class) {
            $classes[] = $custom_class;
        }
    }
    return $classes;
}
