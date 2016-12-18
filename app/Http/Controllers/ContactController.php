<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Mail;

class ContactController extends Controller
{
    function reserve(Request $request) {
        
        $data = [
           'name' => $request->input('name'),
           'phone' => $request->input('personal_phone'),
           'people' => $request->input('people_select'),
           'seating' => $request->input('seating_select'),
           'day' => $request->input('time_select'),
           //'content' => $request->input('content')
        ];

        Mail::send('emails.reservation', $data, function ($message)
        {
            $message->to('bveselinovic555@gmail.com')->subject('Online rezervacija Gaučosi');
            $message->to('bogdana.veselinovic@yahoo.com')->subject('Online rezervacija Gaučosi');
        });

        if( count(Mail::failures()) > 0 ) {
            return view('home', ['result' => "fail"]);
            //return redirect()->route('online-reservation', ['result' => "fail"]);
        } else {
            return view('home', ['result' => "success"]); 
            //return redirect()->route('online-reservation', ['result' => "success"]);
        }

    }
}