(function()  {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `
	body{background-color:#34495e;}
	ul
	{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.selected
	{
		background: #3498DB;
		padding-bottom: 8px;
		color: #fff;
	}
	#quickSearchDiv
	{
		background-color: #fff;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 250px;
		display:none; 
		margin-top:1px; 
		border: 1px solid #CCC; 
		min-height:0px;
		text-align:left;
		z-index:999;
		position: relative;
	}
	#quickSearchDiv ul li
	{
		font-family: "Open Sans", "Helvetica Neue", Helvetica, sans-serif;
		margin: 0;
		padding: 0;
		font-variant: normal;
		color: #000;
	}
	#quickSearchDiv ul li a
	{
		font-size: 11px;
		border-bottom: 1px solid #F7F7F7;
		color: #000;
		display: block;
		margin: 0;
		padding: 5px 8px;
		text-decoration: none;
		min-height: 20px;
	}
	#quickSearchDiv ul li a:hover
	{
		background: #1b9bff;
		padding-bottom: 8px;
		color: #fff;
	}
	#quickSearchDiv ul li.selected a { color: #fff; }
	#autocomplete
	{
		width: 250px;
		height:25px;
		padding-left:2px;
		padding-right:2px;
		background-color: #34495e;
		color: #fff;
		line-height: 100%;
		font-size: 14px;
		font-family: Tahoma, Geneva, sans-serif;
		border:1px solid #223444;
		font-variant: small-caps;
		-webkit-appearance: none;
		-webkit-box-sizing: content-box;
		outline:none;
		padding-top:3px;
	}
	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration 
	{
		display: none;
	}
	
	<div id="quickSearchContainer" style="float:left; width: 300px;">
	<input type="search" id="autocomplete">
	<div id="quickSearchDiv">
		<ul id="quickSearch"></ul>	
	</div>
</div>
<div  id="selection" style="display:none; color: #fff; float:left;">
	Selected : <span id="text"></span>
</div>
	`;

class ISearch extends HTMLElement {

	constructor() {
		super();
		this._shadowRoot = this.attachShadow({mode: 'open'});
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		
		this.setData = function(result){
			var data = [];
			var x = "";
			result.forEach(function(element) {
				if (element != ","){
					x = x + element;
				} else {
				data.push(x);	
				x= ""; }
			});
			var index = 0;
			data.forEach(function(element) {
				sdata[index] = element;
				index = index +1;
			});
			
		};
		this.getData = function(){
			return sdata;
		};
		$(document).ready(function () {

            var delay = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();
            var xml = "<menuitems> <menu data='RUSSIA'/> <menu data='ENGLAND'/> <menu data='USA'/> <menu data='INDIA'/> </menuitems>",
            xmlMenu = $.parseXML(xml);

            $("#autocomplete").bind('keyup focus', function (e) {
                //return if up/down/return key
                if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) {
                    e.preventDefault();
                    return;
                }
                delay(function () {
                    $("#quickSearch").empty();
                    $("#quickSearchDiv").show();
                    //non-case-sensitive search item
                    var regex = new RegExp($("#autocomplete").val(), "i");
                    var i = 0;
                    $(xmlMenu).find('menu').filter(function () { return $(this).attr('data').match(regex); }).each(function () {
                        i++;
                        if (i > 5) return false;

                        type = "";
                        $("#quickSearch").append("<li><a tabindex='-1' href='javascript:void(0);' onclick=dispSelection('" + $(this).attr("data") + "')>" + $(this).attr("data") + "</a></li>");
                    });
                    //add class to the first<li>
                    $("#quickSearch li:first").addClass('selected');

                }, 750);
            });

            // keypress on the search textbox
            $("#autocomplete").keydown(function (e) {
                var selected = $("#quickSearch .selected");
                if (e.keyCode == 13) { // on select
                    e.preventDefault();
                    if ($("#quickSearch li").length > 0) {
                        dispSelection(selected.find('a').html());
                    }
                }
                if (e.keyCode == 38) { // up
                    $("#quickSearch .selected").removeClass("selected");
                    if (selected.prev().length == 0) {
                        $("#quickSearch li:last").addClass("selected");
                    } else {
                        selected.prev().addClass("selected");
                    }
                }
                if (e.keyCode == 40) { // down
                    var selected = $("#quickSearch .selected");
                    $("#quickSearch .selected").removeClass("selected");
                    if (selected.next().length == 0) {
                        $("#quickSearch li:first").addClass("selected");
                    } else {
                        selected.next().addClass("selected");
                    }
                }
            });
            $("#autocomplete").focusout(function() {
                if(autocText != $("#autocomplete").val())
                {
                    document.getElementById("autocomplete").value = "";
                    document.getElementById("selection").style.display = "none";
                    autocText = "";
                }
            });
            $("body").click(function () {
                $("#quickSearchDiv").hide();
            });
            $("#quickSearchContainer").click(function (event) {
                event.stopPropagation();
            });
        });
        autocText = null;
        function dispSelection(text)
        {
            $("#quickSearchDiv").hide();
            document.getElementById("selection").style.display = "block";
            document.getElementById("text").innerHTML = text;
            document.getElementById("autocomplete").value = text;
            autocText = text;
        }
$(document).ready(function () {
$("#autocomplete").focus();

});

}}; // end constructor




	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})(); // end function
