<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('home');
})->name("/");

Route::get('/galerija/{day}-{date}', function ($day, $date) {
    return view('/albums/'.$day.'-'.$date);
})->name("gallery");

Route::post('/reserve', "ContactController@reserve")->name("online-reservation");
