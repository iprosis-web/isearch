(function() {
	console.log(1);
	let tmpl = document.createElement('template');
	console.log(2);
	tmpl.innerHTML = `

		<style>
			* {
			box-sizing: border-box;
			}

			body {
			font: 16px Arial;  
			}

			/*the container must be positioned relative:*/
			.autocomplete {
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

			/*when hovering an item:*/
			.autocomplete-items div:hover {
			background-color: #e9e9e9; 
			}

			/*when navigating through the items using the arrow keys:*/
			.autocomplete-active {
			background-color: DodgerBlue !important; 
			color: #ffffff; 

		</style>

		<div class="autocomplete" id="container" style="width:300px;">
			<input id="myInput" type="text" name="myCountry" placeholder="Country">
		</div>


	`;

	class ISearch extends HTMLElement {
		constructor() {
			super();

			if (this._alive) {
				return;
			} else {
				this._alive = true;
			}

			let shadow = this.attachShadow({ mode: 'open' });
			shadow.appendChild(tmpl.content.cloneNode(true));

			var sfRandomId = 'SF_' + Math.floor(Math.random() * 1000);
			let SF = new sap.m.SearchField(sfRandomId, {
				tooltip: 'Search for Products',
				width: '500px',
				liveChange: filterTable
			});

			function filterTable() {
				console.log('Search liveeeeeee!');
			}

			let topDiv = shadow.getElementById('autocomplete');
			SF.placeAt(topDiv);

			this._alive = true;
		}

		getValue() {
			console.log('This :', this);
			return 'hhhhhhhh';
		}
	}
	/* Define web component - input: tag and class */
	let ttt = customElements.define('com-iprosis-sample-search', ISearch);
})();
