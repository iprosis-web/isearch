(function()  {
let tmpl = document.createElement('template');
tmpl.innerHTML = `
<script type="text/javascript">
window.onload = function(){ 
	//Get submit button
	var submitbutton = document.getElementById("tfq");
	//Add listener to submit button
	if(submitbutton.addEventListener){
		submitbutton.addEventListener("click", function() {
			if (submitbutton.value == 'Search our website'){//Customize this text string to whatever you want
				submitbutton.value = '';
			}
		});
	}
}
</script>
  <style type="text/css">
	#tfheader{
		background-color:#c3dfef;
	}
	#tfnewsearch{
		float:right;
		padding:20px;
	}
	.tftextinput2{
		margin: 0;
		padding: 5px 15px;
		font-family: Arial, Helvetica, sans-serif;
		font-size:14px;
		color:#666;
		border:1px solid #0076a3; border-right:0px;
		border-top-left-radius: 5px 5px;
		border-bottom-left-radius: 5px 5px;
	}
	.tfbutton2 {
		margin: 0;
		padding: 5px 7px;
		font-family: Arial, Helvetica, sans-serif;
		font-size:14px;
		font-weight:bold;
		outline: none;
		cursor: pointer;
		text-align: center;
		text-decoration: none;
		color: #ffffff;
		border: solid 1px #0076a3; border-right:0px;
		background: #0095cd;
		background: -webkit-gradient(linear, left top, left bottom, from(#00adee), to(#0078a5));
		background: -moz-linear-gradient(top,  #00adee,  #0078a5);
		border-top-right-radius: 5px 5px;
		border-bottom-right-radius: 5px 5px;
	}
	.tfbutton2:hover {
		text-decoration: none;
		background: #007ead;
		background: -webkit-gradient(linear, left top, left bottom, from(#0095cc), to(#00678e));
		background: -moz-linear-gradient(top,  #0095cc,  #00678e);
	}
	/* Fixes submit button height problem in Firefox */
	.tfbutton2::-moz-focus-inner {
	  border: 0;
	}
	.tfclear{
		clear:both;
	}
</style>
  <div id="tfheader">
		<form id="tfnewsearch" method="get" action="http://www.google.com">
		        <input type="text" id="tfq" class="tftextinput2" name="q" size="21" maxlength="120" value="Search our website"><input type="submit" value=">" class="tfbutton2">
		</form>
		<div class="tfclear"></div>
	</div>
`;

class ISearch extends HTMLElement {

	constructor() {
		super();
		this._shadowRoot = this.attachShadow({mode: 'open'});
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		this.style.height = "100%";
		this._shadowRoot.addEventListener("mousedown", this.makeMouseDownHandler(this.mouseStart.bind(this), this.mouseFeedback.bind(this), this.mouseFinish.bind(this), this.mouseAbort.bind(this)));
		this._val = 0;
		this._look = "vu";
		this._rotate_angle = 360; // depends on used picture
		this.needle = this._shadowRoot.querySelector("#needle");
		this.adjustCssClasses();
	};



    get val() {
    	return Math.round(this._val);
    }
    set val(value) {
		this._val =  Math.max(0, Math.min(100, value));
		var angle = this._val / 100 * this._rotate_angle;
		this.needle.style.transform = "rotate(" + angle + "deg)";
	};


	get look() {
		return this._look;
	}

	set look(value) {
		this._look = value;
		this.adjustCssClasses();
		this.val = this.val; // Refresh to fit to new scaling
	};

//	this.afterUpdate = function() {
//		if (_datacell) {
//			var percent = _datacell.data[0] / 1000;
//			this.val(percent);
//		}
//	};



	adjustCssClasses() {
		this._rotate_angle = this._look === "vu" ? 80 : 270;
		this.className  = this._look + "_fixed";
		this.needle.className = this._look + "_turning";
	}

	makeMouseDownHandler(mouseStart, mouseFeedback, mouseFinish, mouseAbort) {
		return function(e) {
			var mouseMoveHappend = false;
			function cleanup() {
				$(document).unbind("mousemove", mousemove);
				$(document).unbind("mouseup", mouseup);
				$(document).unbind("keydown", abort);
			}

			var lastE = e;
			function mousemove(e) {
				// The following line detects this a mouseup outside of the browser in IE happened in the meantime
				if ($.browser.msie && event && event.button == 0) {
					mouseup(lastE);
				} else {
					mouseMoveHappend = true;
					lastE = e;
					mouseFeedback(e.pageX, e.pageY);
				}
			}

			function mouseup(e) {
				cleanup();
				mouseFinish(e.pageX, e.pageY);
			}

			function abort(e) {
				if (e.which === 27) {
					cleanup();
					mouseAbort();
				}
			}

			if (e.which == 1) { // Check only left mouse button
				mouseMoveHappend = false;
				e.preventDefault();
				e.stopPropagation();
				mouseStart(e.pageX, e.pageY);
				$(document).mouseup(mouseup);
				$(document).mousemove(mousemove);
				$(document).keydown(abort);
			}
		};
	}

	/**
	 * xc = x-coordinate of dial's center of rotation
	 * yc = y-coordinate of dial's center of rotation
	 * x = x-coordinate of mouse pointer
	 * y = y-coordinate of mouse pointer
	 * rotate_angle = angular range of dial in degrees
	 */
	getPercentValue(xc, yc, x, y) {
		var alpha = Math.atan2(x - xc, yc - y) / Math.PI * 180;
		var halfRange = this._rotate_angle / 2;

		if (alpha < -halfRange) {
			alpha = -halfRange;
		} else if (alpha > halfRange) {
			alpha = halfRange;
		}
		var percentValue = (alpha / this._rotate_angle + 0.5) * 100;
		return percentValue;
	}

	storeCenter () {
		var screenX = this.getBoundingClientRect().left;
		var screenY = this.getBoundingClientRect().top;

		var relativeCenter = getComputedStyle(this.needle)["transform-origin"];
		relativeCenter = relativeCenter.replace(/px/g, ""); // Remove "px"
		var aSplit = relativeCenter.split(" ");

		this.center = {
			x: screenX + parseFloat(aSplit[0]),
			y: screenY + parseFloat(aSplit[1])
		};
	};

	mouseStart (x, y) {
		this.storeCenter();
		this.orgAngle = this.getPercentValue(this.center.x, this.center.y, x, y);
		this.orgVal = this.val;
	};

	mouseFeedback (x, y) {
		var newAngle = this.getPercentValue(this.center.x, this.center.y, x, y);
		var turnBy = newAngle - this.orgAngle;
		this.val = this.orgVal + turnBy;
	};

	mouseFinish (x, y) {
		var event = new Event('onTurn');
		this.dispatchEvent(event);
	};

	mouseAbort() {
		this.val = this.orgVal;
	};

  }
	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})();
