/*
 * jQuery Instagram Browser
 * Version: 1.0
 *
 * Author: Chris Rivers
 * http://chrisriversdesign.com
 *
 *
 * Changelog: 
 * Version: 1.0
 *
 */

// Global
var ibObj;
var instagramBrowserNextMax;
var customSettings;

/* Instagram Popular Fetch
------------------------------*/
function instagramFetch(settings){	
	var access_token = settings.accessToken;
    var param = {access_token:access_token};
    fetchCMD(param, settings);
}

function fetchCMD(param, settings){
   
	var cmdURL = "";

	if( settings.mode == 'user' ){
		// User Mode
		cmdURL = 'https://api.instagram.com/v1/users/' + settings.userID + '/media/recent/?&count=' + settings.limit + '&callback=?';
	} else {
		// Popular Mode
    	cmdURL = 'https://api.instagram.com/v1/media/popular?callback=?';
	}

   	$.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
	
}

/* Instagram Tag Search
------------------------------*/
function instagramSearch(settings){
	var access_token = settings.accessToken;
    var param = {access_token:access_token};

	var searchQuery = $(".searchBox").val().replace(/ /g,'');
		
    searchCMD(param, settings, searchQuery);
}

function searchCMD(param, settings, searchQuery){
   
	var cmdURL = "";

	// Tag Search
	cmdURL = 'https://api.instagram.com/v1/tags/' + searchQuery + '/media/recent?callback=?';
	
   	$.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
	
}

/* Instagram User Search
------------------------------*/
function instagramUserSearch(settings){
	var access_token = settings.accessToken;
	var searchQuery = $(".searchBox").val().replace(/ /g,'');
	var param = {access_token:access_token,q:searchQuery};
		
    userSearchCMD(param, settings);
}

function userSearchCMD(param, settings){
	var cmdURL = 'https://api.instagram.com/v1/users/search?callback=?';
	
   	$.getJSON(cmdURL, param, function(data){
		onUserLoaded(data, settings);
	});
}

function onUserLoaded(data, settings){
	if( data.meta.code == 200 ){
        var users = data.data;
		// console.log(data);
		
		if( users.length > 0 ){
            for( var key in users ){
				// Build UI
				var user = users[key];			
				var instagramUser = '';
							
				instagramUser = '<div class="instagram-user" id="p' + user.id + '" title="' + user.username + '" rel="' + user.id + '">';
				instagramUser += 	"<img src='" + user.profile_picture + "' />";
				instagramUser += 	"<span class='instagram-username'>" + user.username + "</span>";
				instagramUser += 	"<span class='instagram-fullname'>" + user.full_name + "</span>";
				instagramUser += '</div>';

	            $(instagramUser).appendTo(ibObj);
				
			}
		}
		
	}
}

/* Instagram Tags Load More
---------------------------------*/
function instagramTagsLoadMore(settings){
	var access_token = settings.accessToken;
    var param = {access_token:access_token, max_tag_id: instagramBrowserNextMax};

	var searchQuery = $(".searchBox").val().replace(/ /g,'');
		
    loadMoreCMD(settings,param,searchQuery);
}

function loadMoreCMD(settings, param, searchQuery){
		
	var cmdURL = "";
	cmdURL = "https://api.instagram.com/v1/tags/" + searchQuery + "/media/recent?callback=?";
	
   	$.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
}

/* Instagram Users Load More
---------------------------------*/
function instagramUsersLoadMore(settings){
	var access_token = settings.accessToken;
    var param = {access_token:access_token, max_id: instagramBrowserNextMax};
		
    loadMoreUsersCMD(settings,param);
}

function loadMoreUsersCMD(settings, param){

	cmdURL = 'https://api.instagram.com/v1/users/' + settings.userID + '/media/recent/?callback=?';

   	$.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
	
}


/* Photo Handler
------------------------------*/
function onPhotoLoaded(data, settings){
	
	// Store Next Page of Results... // next_url
	if( data.pagination ){
		if( data.pagination.next_max_id ){
			instagramBrowserNextMax = data.pagination.next_max_id;
		} else {
			instagramBrowserNextMax = "Empty";
		}	
	} else {
		instagramBrowserNextMax = "Empty";
	}
		
    if( data.meta.code == 200 ){
	
		// Testing
		// console.log(data);
		
		// Setting Up Variables
        var photos = data.data;

		if( ibObj.html() != "" ){
			var addingToList = true;
		} else {
			var addingToList = false;
		}

        if( photos.length > 0 ){
	
			// console.log(photos);

            for( var key in photos ){
               
				// Get Photo Data
				var photo = photos[key];
			
				// Build DOM
				var instagramPhoto = '';				
				var photoCaption = '';
			
				if( photo.caption ){
					photoCaption = photo.caption.text;
				} else {
					photoCaption = "Instagram Photo";
				}

				var photo_src = photo.images.standard_resolution.url;
                var photo_thumb = photo.images.thumbnail.url;
                var obDate = parseInt(photo.created_time);
				obDate = new Date( obDate * 1000 );
				obDate = dateFormat(obDate, "mmm d, yyyy");
				var date1 = new Date(obDate);
				var date2 = new Date();
				var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
									
				instagramPhoto = '<li>';					
				instagramPhoto += '<a class="instagram-photo" target="_blank" href="' + photo.link + '" rel="' + photo.user.full_name + '" id="p' + photo.id + '" title="' + photoCaption + '" data-created="' + photo.created_time + '">';
				instagramPhoto +=   (settings.thumb === true ) ? '<img src="' + photo_thumb + '" width="100%">': '<img src="' + photo_src + '" width="100%">';
				instagramPhoto += '</a>';
				instagramPhoto += (settings.likes === true)?'<span class="likes"> ' + photo.likes.count + ' </span>': '';

				instagramPhoto += (settings.dates === true)? (diffDays < 1)? '<span class="date"> Today </span>'
				:'<span class="date"> ' + diffDays + ' Days Ago </span>':  '';
				
				instagramPhoto += '</li>';

	            $(instagramPhoto).appendTo(ibObj);
            }
			
			// Count photos
			var photoCount = $('.instagram-photo').size() - 1;
			
			if( addingToList == false ){
				$('.instagram-photo').hide();
			}
			
			$('.instagram-photo').each(function(index){
				
				// Store Current Photo
				currentPhoto = $(this);
				
				// Render Effect
				currentPhoto.delay( settings.delayInterval * index ).fadeIn(settings.speed);
				
				// Clear Any Existing Load More Buttons
				$("#seachInstagramLoadMoreContainer").remove();
				
				
				
			});

        } else {
            alert('empty');
        }

    } else {
        alert(data.meta.error_message);
    }
}

$.fn.instagramBrowser = function ( options ) {
	
	/* Setting Up Variables
	------------------------------*/
	var settings = {
		mode : 'popular', // This sets the mode to either "user" or "popular". Either pull from the popular feed or your user feed. Default is set to popular
		accessToken : '3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f', // This a mandatory setting that allows you to specify a user token. Default is 3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f
		userID : '1138644', // This is a setting that you have to use if your using "user" mode. Default is "For stunning photography – Kevin Burg".
		speed: 700, // Sets the speed of the images fade in effect, default is 700.
		delayInterval : 80, // Sets the interval of the delay between photos appearing, default is 80.
		searchBox : ".searchContainer .searchBox",
		limit:8,
		likes:true,
		dates:true,
		thumb:false
	};
	
	ibObj = $(this);
	
	// Combine your options with our settings...
	$.extend(settings, options);
	
	/* Plugin Logic
	------------------------------*/
	return this.each(function() {

		// Powers Activate...
		$(document).ready(function(){
			instagramFetch(settings);
		});

	});
}



/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


