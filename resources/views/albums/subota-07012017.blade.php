@extends('layouts.master')

@section('content')

<!--nije bitan broj slika u galeriji -->
                <section id="gallery" class="pages">

                    <div class="owl-carousel">
                    
                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/1.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/2.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/3.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/4.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/5.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/6.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/7.jpg" alt=""> </div>
						
						<div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/8.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/9.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/10.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-07012017/11.jpg" alt=""> </div>
                        
                        <!-- ...itd proizvoljan broj slika -->
                    </div>

                </section>
                <!-- / end GALLERY --> 

@stop

@section('scripts')
        <script src="<?php echo url("") ?>/js/jquery-1.12.4.min.js"></script>
        <script src="<?php echo url("") ?>/js/jquery-ui.min.js"></script>
        <script src="<?php echo url("") ?>/js/bootstrap.js"></script>
        <script src="<?php echo url("") ?>/js/bootstrap-tabcollapse.js"></script>
        <script src="<?php echo url("") ?>/js/multi.level.menu.js"></script>
        <script src="<?php echo url("") ?>/js/multi.level.menu.js"></script>
        <script src="<?php echo url("") ?>/js/owl.carousel.min.js"></script>
        <script src="<?php echo url("") ?>/js/velocity.min.js"></script>
        <script src="<?php echo url("") ?>/js/jquery.animsition.js"></script>
        <script src="<?php echo url("") ?>/js/custom.js"></script>
@stop
