@extends('layouts.master')

@section('content')

<!--nije bitan broj slika u galeriji -->
                <section id="gallery" class="pages">

                    <div class="owl-carousel">
                    
                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/1.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/2.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/3.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/4.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/5.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/6.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/7.jpg" alt=""> </div>
                        
                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/8.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/9.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/10.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/11.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/12.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/13.jpg" alt=""> </div>

                        <div> <img src="<?php echo url("") ?>/images/galerija/subota-10122016/14.jpg" alt=""> </div>
                        
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
