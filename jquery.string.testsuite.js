/**
 * jQuery.string Test Suite
 */

/**
 * Test Suite function list.  Each function to be tested has its own attribute with a list of functions.
 * All functions should return true to pass the test.
 */
var testSuite = {
	blank: [
		function() { return $.string("").blank(); },
		function() { return $.string("   ").blank(); },
		function() { return !($.string("  f  ").blank()); },
		function() { return !($.string("foo").blank()); }
	],
	camelize: [
		function() { return ($.string("background-color").camelize().str == "backgroundColor"); },
		function() { return ($.string("-moz-binding").camelize().str == "MozBinding"); }
	],
	capitalize: [
		function() { return ($.string("hello").capitalize().str == "Hello"); },
		function() { return ($.string("HELLO WORLD").capitalize().str == "Hello world"); }
	],
	dasherize: [
		function() { return ($.string("border_bottom_width").dasherize().str == "border-bottom-width"); }
	],
	empty: [
		function() { return ($.string("").empty()); },
		function() { return (!$.string(" ").empty()); }
	],
	endsWith: [
		function() { return $.string("slaughter").endsWith("laughter"); },
		function() { return !$.string("laughter is the best medicine").endsWith("laughter"); }
	],
	escapeHTML: [
		function() { return $.string("<div class=\"article\">This is an article</div>").escapeHTML().str == "&lt;div class=\"article\"&gt;This is an article&lt;/div&gt;"; }
	],
	evalJSON: [
		function() {
			var test = $.string('{ "name": "Violet", "occupation": "character" }').evalJSON();
			return test.name == "Violet" && test.occupation == "character";
		},
		function() {
			var test = $.string('{ "name": "Violet", "occupation": "character" }').evalJSON(true);
			return test.name == "Violet" && test.occupation == "character";
		},
		function(){
			var test = false;
			try {
				$.string('grabUserPassword()').evalJSON(true);
			} 
			catch (e) {
				test = true;
			}
			return test;
		},
		function() {
			var test = $.string('/*-secure-\n{ "name": "Violet", "occupation": "character" }\n*/').evalJSON();
			return test.name == "Violet" && test.occupation == "character";
		}
	],
	evalScripts: [
		function() {
			var test = $.string("test scripts<script>2 + 2</script> more test here<script language='javascript' type='text/javascript'>['foo','bar'].join('');</script>").evalScripts();
			return (test[0] == 4 && test[1] == 'foobar');
		},
		function() { return $.string("ain't <b>frakking</b> no <h1>script tags</h1> here").evalScripts().length === 0; }
	],
	extractScripts: [
		function() {
			var test = $.string("test scripts<script>2 + 2</script> more test here<script language='javascript' type='text/javascript'>['foo','bar'].join('');</script>").extractScripts();
			return (test[0] == '2 + 2' && test[1] == "['foo','bar'].join('');");
		},
		function() { return $.string("ain't <b>frakking</b> no <h1>script tags</h1> here").extractScripts().length === 0; }
	],
	gsub: [
		function() { return $.string("this is a test").gsub(" ", "-").str == "this-is-a-test"; },
		function() { return $.string("this is a test").gsub(/\w+/, function(m){ return "["+m+"]"; }).str == "[this] [is] [a] [test]"; }
	],
	include: [
		function() { return $.string("Not just the Prototype framework any more").include("frame"); },
		function() { return !$.string("Not just the Prototype framework any more").include("frameset"); }
	],
	inspect: [
		function() { return $.string('I\'m so happy.').inspect().str == "'I\\'m so happy.'"; },
		function() { return $.string('I\'m so happy.').inspect(true).str == "\"I'm so happy.\""; }
	],
	interpolate: [
		function() { return $.string("#{animals} on a #{transport}").interpolate({ animals: "Pigs", transport: "Surfboard"}).str == "Pigs on a Surfboard"; },
		function() { return $.string('<div>Name: <b><%= name %></b>, Age: <b><%=age%></b></div>').interpolate({ name: 'John Smith', age: 26 }, /(\<%=\s*(\w+)\s*%\>)/).str == '<div>Name: <b>John Smith</b>, Age: <b>26</b></div>'; }
	],
	isJSON: [
		function() { return !$.string("something").isJSON(); },
		function() { return $.string("\"something\"").isJSON(); },
		function() { return !$.string("{ foo: 42 }").isJSON(); },
		function() { return $.string("{ \"foo\": 42 }").isJSON(); }
	],
	scan: [
		function() {
			var fruits = [];
			$.string('apple, pear & orange').scan(/\w+/, function(match){ fruits.push(match)});
			return fruits.join("-") == "apple-pear-orange"
		},
		function() {
			var fruits = [];
			return $.string('apple, pear & orange').scan(/\w+/, function(match){ fruits.push(match)}).str == 'apple, pear & orange';
		}
	],
	startsWith: [
		function() { return $.string("slaughter").startsWith("slaugh"); },
		function() { return !$.string("laughter is the best medicine").startsWith("medicine"); }
	],
	strip: [
		function() { return $.string("   foo!  ").strip().str == "foo!"; },
		function() { return $.string("  	 foo").strip().str == "foo"; },
		function() { return $.string("foo  ").strip().str == "foo"; },
		function() { return $.string("foo").strip().str == "foo"; }
	],
	stripScripts: [
		function() { return $.string('a <a href="#">link</a><script>alert("hello world!")</script>').stripScripts().str == 'a <a href="#">link</a>'; },
		function() { return $.string('a <a href="#">link</a>').stripScripts().str == 'a <a href="#">link</a>'; },
		function() { return $.string('a <a href="#">link</a><script>alert("hello world!")</script>America! Heck, yeah!').stripScripts().str == 'a <a href="#">link</a>America! Heck, yeah!'; }
	],
	stripTags: [
		function() { return $.string('a <a href="#">link</a><script>alert("hello world!")</script>').stripTags().str == 'a linkalert("hello world!")'; }
	],
	sub: [
		function() { return $.string("this is a test").sub(" ", "-").str == "this-is a test"; },
		function() { return $.string("this is a test").sub(" ", "-", 2).str == "this-is-a test"; },
		function() { return $.string("this is a test").sub(/\w+/, function(m){ return "["+m+"]"; }).str == "[this] is a test"; },
		function() { return $.string("this is a test").sub(/\w+/, function(m){ return "["+m+"]"; }, 3).str == "[this] [is] [a] test"; },
		function() { return $.string("this is a test").sub(/\w+/, function(m){ return "["+m+"]"; }, -1).str == "[this] [is] [a] [test]"; }
	],
	succ: [
		function() { return $.string("a").succ().str == "b"; },
		function() { return $.string("aaaa").succ().str == "aaab"; }
	],
	times: [
		function() { return $.string("foo!").times(0).str == ""; },
		function() { return $.string("foo!").times(3).str == "foo!foo!foo!"; }
	],
	toJSON: [
		function() { return $.string('The "Quoted" chronicles').toJSON().str == '"The \\"Quoted\\" chronicles"'; }
	],
	toQueryParams: [
		function() {
			var params = $.string('foo.html?section=blog&id=45').toQueryParams();
			return params.section == 'blog' && params.id == '45';
		},
		function() {
			var params = $.string('foo.html?section=blog&id=45#comments').toQueryParams();
			return params.section == 'blog' && params.id == '45';
		},
		function() {
			var params = $.string('section=blog;id=45').toQueryParams(';');
			return params.section == 'blog' && params.id == '45';
		},
		function() {
			var params = $.string('section=blog&tag=javascript&tag=prototype&tag=doc').toQueryParams();
			return params.section == 'blog' && params.tag[0] == 'javascript' && params.tag[1] == 'prototype' && params.tag[2];
		},
		function() {
			var params = $.string('tag=ruby%20on%20rails').toQueryParams(';');
			return params.tag == 'ruby on rails';
		},
		function() {
			var params = $.string('id=45&raw').toQueryParams();
			return params.id == '45' && params.raw === undefined;
		}
	],
	truncate: [
		function() { return $.string('A random sentence whose length exceeds 30 characters.').truncate().str == 'A random sentence whose len...'; },
		function() { return $.string('Some random text').truncate().str == 'Some random text'; },
		function() { return $.string('Some random text').truncate(10).str == 'Some ra...'; },
		function() { return $.string('Some random text').truncate(10, '[...]').str == 'Some [...]'; }
	],
	underscore: [
		function() { return $.string('borderBottomWidth').underscore().str == 'border_bottom_width'; },
		function() { return $.string('BorderBottomWidth').underscore().str == 'border_bottom_width'; }
	],
	unescape: [
		function() { return $.string('x &gt; 10').unescapeHTML().str == 'x > 10'; },
		function() { return $.string('<h1>Pride &amp; Prejudice</h1>').unescapeHTML().str == 'Pride & Prejudice'; }
	],
	unfilterJSON: [
		function() { return $.string('/*-secure-\n{"name": "Violet", "occupation": "character", "age": 25}\n*/').unfilterJSON().str == '{"name": "Violet", "occupation": "character", "age": 25}'; }
	]
}, results = '', property, tests, i, passed, failed, attempt;


$(document).ready(function() {
	for (method in testSuite) {
		results = "<span class='test'>" + method + "... </span>";
		tests = testSuite[method];
		passed = true;
		failed = [];
		for (i=0; i<tests.length; i++) {
			try { attempt = tests[i](); }
			catch(e){ attempt = false; }
			//attempt = tests[i]();
			if (!attempt) {
				passed = false;
				failed.push(i);
			}
		}
		results += (passed)?"<span class='pass'>Passed!</span><br />\n":"<span class='fail'>Failed!</span> ("+failed.join(", ")+")<br />\n";
		$("#testresults").html($("#testresults").html()+results);
	}
});
