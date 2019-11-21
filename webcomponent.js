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

		document.getElementById("myInput").addEventListener("input", function(e) { 
			var a, b, i, val = this.value;
			/*close any already open lists of autocompleted values*/
			closeAllLists();
			if (!val) { return false;}
			currentFocus = -1;
			/*create a DIV element that will contain the items (values):*/
			a = document.createElement("DIV");
			a.setAttribute("id", this.id + "autocomplete-list");
			a.setAttribute("class", "autocomplete-items");
			/*append the DIV element as a child of the autocomplete container:*/
			this.parentNode.appendChild(a);
			/*for each item in the array...*/
			for (i = 0; i < arr.length; i++) {
			  /*check if the item starts with the same letters as the text field value:*/
			  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					document.getElementById("myForm").submit();
					/*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			  }
			}
		});//end of input listener
  /*execute a function when someone clicks in the document:*/
 	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});

		



}}; // end constructor

	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})(); // end function
