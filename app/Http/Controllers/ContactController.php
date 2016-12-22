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
           'comment' => $request->input('comment')
        ];

        Mail::send('emails.reservation', $data, function ($message)
        {
            $message->to('gaucosi011@gmail.com')->subject('Online rezervacija Gaučosi');
            //$message->to('bogdana.veselinovic@yahoo.com')->subject('Online rezervacija Gaučosi');
        });

        if( count(Mail::failures()) > 0 ) {
            return "fail";
            //return redirect()->route('online-reservation', ['result' => "fail"]);
        } else {
            return "success"; 
            //return redirect()->route('online-reservation', ['result' => "success"]);
        }

    }
}
