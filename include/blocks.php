<?php

// Load Blocks
add_action('init', 'load_blocks');

// Function to load block settings
function load_blocks(){
    // Define the blocks directory
    $blocks_dir = get_template_directory() . '/blocks/';
    
    // Call the recursive function to load block settings
    load_block_settings($blocks_dir);
}

// Recursive function to search for and load block settings in the specified directory and its subdirectories
function load_block_settings($dir) {
    // Search for directories in the specified directory
    $blocks = glob($dir . '*', GLOB_ONLYDIR);

    // Loop through each directory
    foreach ($blocks as $block) {
        // Define the path to the block settings file
        $settings = $block . '/settings.php';
        
        // Check if the block settings file exists
        if (file_exists($settings)) {
            // Include the block settings file
            include ($settings);
        }

        // Call the function recursively to search for block settings in subdirectories
        load_block_settings($block . '/');
    }
}

// Better Blocks
add_action( 'enqueue_block_editor_assets', 'seb_theme_better_blocks');
function seb_theme_better_blocks() {
	add_editor_style( 'dist/css/backend.css' );

    wp_enqueue_script(
        'seb-theme-better-blocks',
        get_template_directory_uri() . '/dist/js/backend.js',
        array(),
        filemtime( get_template_directory() . '/dist/js/backend.js' ),
        true
    );
}

// Custom Blocks Category
add_filter( 'block_categories_all', 'custom_block_categories', 10, 2);
function custom_block_categories( $categories, $post ) {
	
	$new_categories = array(
		array(
            'slug'	=> 'custom-layout',
            'title' => 'Layout',
        ),
        array(
            'slug'	=> 'custom-components',
            'title' => 'Components',
        ),
        array(
            'slug'	=> 'custom',
            'title' => 'Custom',
        )
	);
	
	return array_merge( $new_categories, $categories );
}

// Add Patterns As Menu Page
add_action('admin_menu', 'add_patterns_menu_page');
function add_patterns_menu_page() {
    add_menu_page(
        'Patterns',
        'Patterns',
        'read',
        'edit.php?post_type=wp_block',
        '',
        'dashicons-layout',
        30
    );
}