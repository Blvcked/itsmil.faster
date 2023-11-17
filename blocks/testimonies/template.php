<?php
$testimonies = mb_get_block_field( 'testimonies' ) ?? [];
?>

<div class="swiper swiper-testimonies">
    <div class="swiper-wrapper">
        <!-- Slides -->
        <?php foreach ( $testimonies as $testimony ) : ?>

            <?php 
            $review = $testimony['review'] ?? '';
            $author = $testimony['author'] ?? '';
            $author_tagline = $testimony['author-tagline'] ?? '';
            ?>

            <?php if ( $review ) : ?>

                <div class="swiper-slide">
                    <p class="fs-20"><?= $review ?></p>
                    <?= $author ? "<p class='fw-bolder mb-0'>$author</p>" : '' ?>
                    <?= $author_tagline ? "<p class='fs-14'>$author_tagline</p>" : '' ?>
                </div>

            <?php endif ?>

        <?php endforeach ?>
    </div>

    <!-- Navigation + Pagination -->
    <div class="d-flex align-items-center justify-content-md-center gap-10 mt-40">
        <!-- Navigation Prev -->
        <button 
            class="swiper-button swiper-button--prev"
            type="button"
            title="<?php _e( 'Anterior grupo de reseñas', 'seb-theme' ) ?>"
        >
            <svg class="inline-svg inline-svg--stroke swiper-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <g stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <line class="swiper-arrow__shaft" x1="15.5" y1="8" x2="0.5" y2="8"></line>
                    <polyline points="5.5 13 0.5 8 5.5 3"></polyline>
                </g>
            </svg>
        </button>
        <!-- Pagination -->
        <div class="swiper-pagination fs-16 fw-bolder"></div>
        <!-- Navigation Next -->
        <button 
            class="swiper-button swiper-button--next"
            type="button"
            title="<?php _e( 'Siguiente grupo de reseñas', 'seb-theme' ) ?>"
        >
            <svg class="inline-svg inline-svg--stroke swiper-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <g stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <line class="swiper-arrow__shaft" x1="0.5" y1="8" x2="15.5" y2="8"></line>
                    <polyline points="10.5 3 15.5 8 10.5 13"></polyline>
                </g>
            </svg>
        </button>
    </div>
</div>