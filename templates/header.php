<header id="siteHeader">
    <div class="container">

        <!-- Site Navbar -->
        <nav id="siteNavbar" class="py-24 d-flex align-items-center justify-content-between">

            <!-- Logo -->
            <?php the_custom_logo() ?>

            <!-- Menu -->
            <div class="d-none d-xl-block">
                <?php
                if (has_nav_menu('header-navigation')) {
                    wp_nav_menu([
                        'theme_location' => 'header-navigation',
                        'container'      => false,
                        'menu_id'        => 'siteMenu',
                        'menu_class'     => 'navbar-nav d-flex gap-30',
                        'walker'         => new WP_Bootstrap_5_Navwalker(),
                    ]);
                }
                ?>
            </div>
        </nav>

    </div>
</header>