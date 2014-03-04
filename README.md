jquery-dotstring
================

Prototype String functions for jQuery

jQuery is a fantastic javascript library with excellent CSS selector capabilities and DOM manipulation. It's light-weight and really fast. Prototype is an excellent all-purpose library with many great utility features, including string manipulation, enumerable arrays and hashes. I love using jQuery for its speed and simplicity, but I miss Prototype's utilities. Luckily, jQuery is very extensible with its versatile plugin system. $.string is a plugin which aims to provide Prototype's string manipulation functions to jQuery.

$.string requires jQuery 1.2.2 or later. It may work with earlier versions, but only these have been tested. $.string has been tested with the following web browsers:

* Chrome 11+ (probably works with earlier versions)
* Firefox 2.x, 3.x or 4.x
* Internet Explorer 6+
* Opera 9.5
* Safari 3.x, 4.x, and 5.x

Usage
=====

Include jQuery and $.string in your header:

    <script type="text/javascript" src="jquery-latest.min.js"></script>
    <script type="text/javascript" src="jquery.string.1.1.0.js"></script>

$.string methods are the same as their Prototype counterparts. Unlike Prototype, $.string does not by default extend the String JavaScript prototype. You must create a $.string object:

    $.string(" ").blank();
    // true

All methods that do not return a String will produce the same result as the Prototype counterpart. blank returns boolean, evalJSON returns a JSON object, etc. For methods that do return a string, $.string will return another $.string object. This allows you to chain $.string methods without needing to extend String. You can retrieve the string portion of the object using the ‘str’ property.

    $.string(" <p>this is a test</p> ").strip().stripTags().capitalize().str
    // 'This is a test'

$.string can also be used to extend the String prototype in the same manner that Prototype does, giving you the same functionality and compatibility.

    $.string(String.prototype);
    " <p>this is a test</p> ".strip().stripTags().capitalize()
    // 'This is a test'

$.string‘s compatibility target is Prototype 1.6.0.2. Latest Prototype version is 1.7.0.0, however this introduced an incompatibility with the toJSON method, so it was decided to maintain 1.6.0.3 compatibility as this is more of a legacy/transition project. All other methods pass their compatibility tests in 1.7.0.0.

Copyright and License
=====================
**COPYRIGHT**

jquery.string - Prototype string functions for jQuery
(c) 2008-2011 David E. Still (http://stilldesigning.com)
Original Prototype extensions (c) 2005-2011 Sam Stephenson (http://prototypejs.org)

**LICENSE**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(The astute reader will note that this is the same license that Prototype is released under.)

See more at: http://stilldesigning.com/projects/dotstring-js/
