"use strict";
// libs
//= ../libs/jquery.min.js

$(function() {

	var hamburger = $(".hamburger");
	var headerNav = $(".header__nav")
  hamburger.on("click", function(e) {
		hamburger.toggleClass("is-active");
    headerNav.toggleClass("header__nav_active");
  });

});
