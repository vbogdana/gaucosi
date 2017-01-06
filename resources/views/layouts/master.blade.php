<!DOCTYPE html>

<html lang="en" class=" js flexbox webgl no-touch geolocation hashchange history websockets rgba hsla multiplebgs backgroundsize borderimage textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage applicationcache svg svgclippaths mediaqueries no-regions supports">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <title> Klub Gaučosi - Belgrade Night Club</title>
        <link rel="icon" href="<?php echo url("") ?>/favicontransparent.ico">
        
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-89292527-1', 'auto');
            ga('send', 'pageview');
	</script>

	<meta property="fb:pages" content="gaucosi.belgrade">
        <meta name="description" content="Gaucosi - jedinstveni nocni klub u Beogradu, koncept dopadljiv svima. Nalazi se u samom srcu Dorcola kod Kalemegdana. 064 900 20 80">
        <meta property="og:locale" content="en_US">
        <meta property="og:type" content="website">
        <meta property="og:url" content="http://www.gaucosi.rs">
        <meta property="og:site_name" content="Gaucosi">
        <!-- Mobile Specific Meta -->
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        
        <link href='https://fonts.googleapis.com/css?family=Playfair+Display:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,900,700,500,500italic,700italic' rel='stylesheet' type='text/css'>
        <link href="<?php echo url("") ?>/css/icon-font/font-awesome.css" rel="stylesheet">
        <link href="<?php echo url("") ?>/css/icon-font/pe-icon-7.css" rel="stylesheet">
        <link href="<?php echo url("") ?>/css/bootstrap.min.css" rel="stylesheet">
        <link href="<?php echo url("") ?>/css/animsition.css" rel="stylesheet">
        <link href="<?php echo url("") ?>/revolution/css/settings.css" rel="stylesheet">
        <link href="<?php echo url("") ?>/revolution/css/layers.css" rel="stylesheet">
        <link href="<?php echo url("") ?>/revolution/css/navigation.css" rel="stylesheet">
        <link href="<?php echo url("") ?>/css/style.css" rel="stylesheet">
        <script src="<?php echo url("") ?>/js/modernizr.js"></script>
    </head>
    
    <body data-smooth-scroll="true" class="overlay-nav">       
        <div class="animsition">
            <header class="nav-wrap stuck is-shrink" data-is-fill="true">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-6 col-md-3">
                            <div class="brand-wrap clearfix">
                                <a href="<?php echo url("") ?>" class="brand">
                                    <img src="<?php echo url("") ?>/images/logo/logobeli.png" class="logo-white" alt="logo gaucosi">
                                    <img src="<?php echo url("") ?>/images/logo/logocrni.png" class="logo-dark" alt="logo gaucosi">
                                </a>
                            </div>

                        </div>
                        <!-- / col-xs-6 -->

                        <div class="col-xs-6 col-md-9">
                            <button class="button_container" id="toggle">
                                <span></span>
                            </button>
                        </div>
                        <!-- / col-md-9 -->
                        
                        <div class="overlay" id="overlay">
                              <nav id="dl-menu" class="overlay-menu dl-menuwrapper">
                                <ul class="heighlight-menu menu-smooth dl-menu">
                                    @section('menu')
                                    <li>
                                        <a href="{{ route("/") }}#intro" data-scroll class="outer-link">HOME</a>
                                    </li>
                                    <li>
                                        <a href="{{ route("/") }}#events" data-scroll class="outer-link">DOGAĐAJI</a>
                                    </li>
                                    <li>
                                        <a href="{{ route("/") }}#about" data-scroll class="outer-link">O NAMA</a>
                                    </li>
                                    <li>
                                        <a href="{{ route("/") }}#menu" data-scroll class="outer-link">KARTA PIĆA</a>
                                    </li>
                                    <li>
                                        <a href="{{ route("/") }}#contact" data-scroll class="outer-link">NAŠA LOKACIJA</a>
                                    </li>
                                    <li>
                                        <a href="{{ route("/") }}#reserv" data-scroll class="outer-link">REZERVACIJA</a>
                                    </li>
                                    <li>
                                        <a href="{{ route("/") }}#gallery" data-scroll class="drop active">GALERIJA</a>
                                    </li>
                                    <li>
                                        <a href="{{ route("/") }}#info" data-scroll class="outer-link">KONTAKT</a>
                                    </li>
                                    @show
                                </ul>
                            </nav>
                        </div>
                        
                        <div class="clearfix"></div>                       
                    </div>
                    <!-- end row -->
                </div>
                <!-- end container -->
            </header>
            <!-- end header -->

            <div class='wrapper'>
                @yield('content')

                <section id="info" class="pages space-y-t highlighted-section-2">
                    <footer class="footer-mini text-center space-y-b highlighted-section-2">
                        <div class="container-fluid space-y-b highlighted-section-3 add-marg"> <!-- with-zic-right klasa uklonjena -->
                            <div class="row">
                                <div class="col-md-4 block-info standard-boxes">
                                    <h2 class="main-header">Pratite nas</h2>
                                    <i class="pe-7s-chat"></i>
                                    <p style="font-weight: bold;">TEL: <a href="tel:+381649002080">(+381) 064 900 20 80</a> <br>
                                        MAIL: <a href="mailto:office@gaucosi.rs">OFFICE@GAUCOSI.RS</a>
                                    </p> 
                                    <p class="standard-boxes__text">Najnovije informacije uvek možete naći i na društvenim mrežama. </p>
                                    <ul>
                                        <li><a href="https://www.facebook.com/gaucosi.belgrade/"><i class="fa fa-facebook"></i></a>
                                        </li>
                                        <!--<li><a href="#"><i class="fa fa-twitter"></i></a>
                                        </li>-->
                                        <li><a href="https://www.instagram.com/gaucosi/"><i class="fa fa-instagram"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-4 block-info standard-boxes cover-box  with-bg-middle">
                                    <h2 class="main-header">Radno vreme</h2>
                                    <i class="pe-7s-clock"></i>
                                    <div class="standard-boxes__text">
                                        <div class="quform-spacer">
                                            <label for=""><span class="quform-required">* Rezervacije važe do 23:30h!</span></label>
                                        </div>
                                        <p class="text-uppercase"> <strong>Petak</strong>
                                        </p>
                                        <p class="text-uppercase">23:00 - 04:00</p>
                                        <p class="text-uppercase"> <strong>Subota </strong>
                                        </p>
                                        <p class="text-uppercase">23:00 - 04:00</p>
                                    </div>
                                </div>
                                <div class="col-md-4 block-info standard-boxes">
                                    <h2 class="main-header">Partneri</h2>
                                </div>
                            </div>
                        </div>
                    </footer><!-- / footer -->
                    
                    <div class="copy-right">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="text-uppercase">
                                        © 2016 Gaučosi, Beograd web site by <a href="http://www.code581.rs" target="_blank">code 581</a>
                                    </div>
                                </div>
                                <div class="col-md-4 text-right">
                                    <a href="#" class="back-to-top">back to top</a>
                                </div>
                            </div>
                        </div>
                    </div><!-- end copy right -->
                </section>
                <!-- / INFO -->
                
            </div>
        </div>
        
        @yield('scripts')
    </body>
</html>

