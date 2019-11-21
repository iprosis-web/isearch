(function()  {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `
		<style>
		* {
		  box-sizing: border-box;
		}
		
		.autocomplete {
		  /*the container must be positioned relative:*/
		  position: relative;
		  display: inline-block;
		}
		
		input {
		  border: 1px solid transparent;
		  background-color: #f1f1f1;
		  padding: 10px;
		  font-size: 16px;
		}
		
		input[type=text] {
		  background-color: #f1f1f1;
		  width: 100%;
		}
		
		input[type=submit] {
		  background-color: DodgerBlue;
		  color: #fff;
		  cursor: pointer;
		}
		
		.autocomplete-items {
		  position: absolute;
		  border: 1px solid #d4d4d4;
		  border-bottom: none;
		  border-top: none;
		  z-index: 99;
		  /*position the autocomplete items to be the same width as the container:*/
		  top: 100%;
		  left: 0;
		  right: 0;
		}
		
		.autocomplete-items div {
		  padding: 10px;
		  cursor: pointer;
		  background-color: #fff; 
		  border-bottom: 1px solid #d4d4d4; 
		}
		
		.autocomplete-items div:hover {
		  /*when hovering an item:*/
		  background-color: #e9e9e9; 
		}
		</style>
		<form autocomplete="off" id="myForm">
		  <div class="autocomplete" style="width:300px;">
			<input id="myInput" type="text" name="myCountry" placeholder="">
		  </div>
		  <input type="submit">
		</form>
	`;

class ISearch extends HTMLElement {

	constructor() {
		super();
		this._shadowRoot = this.attachShadow({mode: 'open'});
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		
		this.setData = function(result){
				var data = [];
				var x = "";
				var res = result.split(',');
				console.log('%c ANNA '+res, "background: blue; color: white; padding-left:10px;");
				for (var i = 0; i < res.length; i++) {
					console.log(i);
					console.log(res[i]);
					if (res[i] != ",") {
						x = x + element;
					} else {
						data.push(x);	
						x= ""; }
				};
			var index = 0;
			data.forEach(function(element) {
				sdata[index] = element;
				index = index +1;
			});
			
		};
		this.getData = function(){
			return sdata;
		};



}}; // end constructor

	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})(); // end function
