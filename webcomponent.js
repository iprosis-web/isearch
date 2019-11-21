(function()  {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `
		<style>
		* {
		  box-sizing: border-box;
		}
		
		body {
		  font: 16px Arial;  
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

		<form autocomplete="on" id="myForm">
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
		
}}; // end constructor

	//   /*An array containing all the country names in the world:*/
	var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
	  
	   /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/ 
	  // autocomplete(document.getElementById("myInput"),countries ); 



	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})(); // end function
