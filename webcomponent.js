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

		<div class="autocomplete" id="container">
			<input id="myInput" type="text" name="myCountry" placeholder="Country">
		</div>
	`;

	class ISearch extends HTMLElement {
		constructor() {
			super();
			let shadow = this.attachShadow({ mode: 'open' });
			shadow.appendChild(tmpl.content.cloneNode(true));

			let that = this;

			function autocomplete(inp, that) {
				let currentFocus;
				inp.addEventListener('input', function(e) {
					let val = this.value;
					closeAllLists();
					currentFocus = -1;
					let a = document.createElement('div');
					a.id = this.id + 'autocomplete-list';
					a.classList.add('autocomplete-items');
					this.parentNode.appendChild(a);
					for (let i = 0; i < that.dataModel.length; i++) {
						if (
							that.dataModel[i]
								.substr(0, val.length)
								.toUpperCase() == val.toUpperCase()
						) {
							let b = document.createElement('div');
							b.innerHTML =
								'<strong>' +
								that.dataModel[i].substr(0, val.length) +
								'</strong>' +
								that.dataModel[i].substr(val.length);
							b.addEventListener('click', function(e) {
								that.selectedValue = this.innerText;
								inp.value = this.innerText;
								closeAllLists();
							});
							a.appendChild(b);
						}
					}
				});

				inp.addEventListener('keydown', function(e) {
					var x = shadow.getElementById(
						this.id + 'autocomplete-list'
					);
					if (x) x = x.getElementsByTagName('div');
					// arrow down
					if (e.keyCode == 40) {
						currentFocus++;
						addActive(x);
						// arrow up
					} else if (e.keyCode == 38) {
						currentFocus--;
						addActive(x);
					} else if (e.keyCode == 13) {
						//enter
						e.preventDefault();
						if (currentFocus > -1) {
							if (x) x[currentFocus].click();
						}
					}
				});
				function addActive(x) {
					if (!x) return false;

					removeActive(x);
					if (currentFocus >= x.length) currentFocus = 0;
					if (currentFocus < 0) currentFocus = x.length - 1;
					x[currentFocus].classList.add('autocomplete-active');
				}
				function removeActive(x) {
					for (var i = 0; i < x.length; i++) {
						x[i].classList.remove('autocomplete-active');
					}
				}
				function closeAllLists(elmnt) {
					var xContainer = shadow.getElementById('container');
					var x = xContainer.getElementsByClassName(
						'autocomplete-items'
					);
					for (var i = 0; i < x.length; i++) {
						if (elmnt != x[i] && elmnt != inp) {
							x[i].parentNode.removeChild(x[i]);
						}
					}
				}
				document.addEventListener('click', function(e) {
					closeAllLists(e.target);
				});
			}

			autocomplete(shadow.querySelector('#myInput'), that);
		}

		selectedValue = '';

		dataModel = [
			'Afghanistan',
			'Albania',
			'Algeria',
			'Andorra',
			'Angola',
			'Anguilla',
			'Antigua'
		];

		getValue() {
			return this.selectedValue;
		}

		getDataModel() {
			return this.dataModel;
		}

		setDataModel(newdata) {
			this.dataModel = newdata;
		}
	}

	/* Define web component - input: tag and class */
	customElements.define('com-iprosis-sample-search', ISearch);
})();
