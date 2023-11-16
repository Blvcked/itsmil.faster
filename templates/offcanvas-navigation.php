<div 
    class="offcanvas offcanvas-end" 
    data-bs-scroll="true"
    data-bs-backdrop="true"
    tabindex="-1" 
    id="offcanvasNavigation" 
    aria-labelledby="offcanvasNavigationLabel"
>
    <div class="offcanvas-body p-60">
        <!-- Menu -->
        <?php
        if (has_nav_menu('header-navigation')) {
            wp_nav_menu([
                'theme_location' => 'header-navigation',
                'container'      => false,
                'menu_id'        => 'siteMenu',
                'menu_class'     => 'navbar-nav d-grid gap-16',
                'walker'         => new WP_Bootstrap_5_Navwalker(),
            ]);
        }
        ?>
    </div>
</div>