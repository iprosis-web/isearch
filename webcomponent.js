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
		selectedValue;
		constructor() {
			super();
			this.selectedValue = 'test test test';
			let shadow = this.attachShadow({ mode: 'open' });
			shadow.appendChild(tmpl.content.cloneNode(true));

			function autocomplete(inp, arr) {
				var currentFocus;
				inp.addEventListener('input', function(e) {
					var a,
						b,
						i,
						val = this.value;

					//closeAllLists();
					if (!val) {
						return false;
					}
					currentFocus = -1;
					a = document.createElement('DIV');
					a.setAttribute('id', this.id + 'autocomplete-list');
					a.setAttribute('class', 'autocomplete-items');
					this.parentNode.appendChild(a);
					for (i = 0; i < arr.length; i++) {
						if (
							arr[i].substr(0, val.length).toUpperCase() ==
							val.toUpperCase()
						) {
							b = document.createElement('DIV');
							b.innerHTML =
								'<strong>' +
								arr[i].substr(0, val.length) +
								'</strong>';
							b.innerHTML += arr[i].substr(val.length);
							b.innerHTML +=
								"<input type='hidden' value='" + arr[i] + "'>";

							b.addEventListener('click', function(e) {
								inp.value = this.getElementsByTagName(
									'input'
								)[0].value;
								//closeAllLists();
							});
							a.appendChild(b);
						}
					}
				});

				// inp.addEventListener('keydown', function(e) {
				// 	var x = shadow.getElementById(
				// 		this.id + 'autocomplete-list'
				// 	);
				// 	if (x) x = x.getElementsByTagName('div');
				// 	if (e.keyCode == 40) {
				// 		currentFocus++;
				// 		addActive(x);
				// 	} else if (e.keyCode == 38) {
				// 		currentFocus--;

				// 		addActive(x);
				// 	} else if (e.keyCode == 13) {
				// 		e.preventDefault();
				// 		if (currentFocus > -1) {
				// 			if (x) x[currentFocus].click();
				// 		}
				// 	}
				// });
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
					var x = shadow.getElementsByClassName('autocomplete-items');
					for (var i = 0; i < x.length; i++) {
						if (elmnt != x[i] && elmnt != inp) {
							x[i].parentNode.removeChild(x[i]);
						}
					}
				}
				document.addEventListener('click', function(e) {
					//closeAllLists(e.target);
				});
			}

			autocomplete(shadow.querySelector('#myInput'), this.countries);

			if (this._alive) {
				return;
			} else {
				this._alive = true;
			}
		}

		countries = [
			'Afghanistan',
			'Albania',
			'Algeria',
			'Andorra',
			'Angola',
			'Anguilla',
			'Antigua'
		];

		get value() {
			return 'hhhhhhhh';
		}

		// get value() {
		// 	return this.countries;
		// }

		// 	afterUpdate() {
		// 			that.oSearchField.setEnabled(isEnabled);
		// 			that.oSearchField.setPlaceholder(placeHolder);
		// 			that.oSearchField.setEnableSuggestions(isSuggestions);
		// 			that.oSearchField.setMaxLength(maxLength);
		// 			that.oSearchField.setShowSearchButton(isSearchButton);

		// 			if (dataResultSet){
		// 				if (reload){
		// 					return;
		// 				} else {
		// 					this.insertData();
		// 					reload = true;
		// 				}
		// 			}

		// 	};

		// 	getFilters = function(value){
		// 			var filters = [];
		// 			oFilterText = new sap.ui.model.Filter("text", function(sText) {
		// 				return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
		// 			});
		// 			oFilterDesc =  new sap.ui.model.Filter("key", function(sDes) {
		// 				 	return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
		// 				 });

		// 			if (displayKey === true)
		// 				{
		// 					filters = [new sap.ui.model.Filter([oFilterText,oFilterDesc], false)];
		// 				}else{
		// 					filters = [	new sap.ui.model.Filter([oFilterText], false)];
		// 				}

		// 			return filters
		// 	};

		// 	getTemplate = function(){
		// 			if (displayKey === true)
		// 				{
		// 					 oTemplate = new sap.m.SuggestionItem({
		// 						text: "{text}",
		// 						key: "{key}",
		// 						description:"{key}"
		// 					 });
		// 				}else{
		// 					oTemplate = new sap.m.SuggestionItem({
		// 					text: "{text}",
		// 					key: "{key}"
		// 				});
		// 			}
		// 			return oTemplate;
		// 	};

		// 	getData = function(result){
		// 			var data = [];
		// 			var x = result;
		// 			var obj = {};
		// 			result.forEach(function(element) {
		// 				obj = {};
		// 				obj.text = element.text;
		// 				obj.key = element.key;
		// 				data.push(obj);
		// 			});

		// 			var oModel = new sap.ui.model.json.JSONModel(data);
		// 			var oTemplate = this.getTemplate();
		// 			that.oSearchField.setModel(oModel);
		// 			that.oSearchField.bindAggregation("suggestionItems", "/", oTemplate);

		// 	};

		// 	insertData = function() {

		// 			if (selectedDimension)
		// 				{
		// 				var dim = selectedDimension.toUpperCase();
		// 					that.callZTLFunction("getMembers", that.getData, dim);
		// 				}

		// //			data = dataResultSet.dimensions[0].members;
		// //			oModel.setSizeLimit(maxItems);
		// 	};

		// 	DataResultSet = function(value) {
		// 			if(value===undefined) {
		// 				return dataResultSet;
		// 			} else {
		// 				//Clear Auto
		// 				if (reload) {
		// 					that.oSearchField.removeAllSuggestionItems();
		// 					that.oSearchField.setValue("");
		// 					reload = false;
		// 				}
		// 				dataResultSet = value;
		// 				return this;
		// 			};
		// 	};

		// 	DisplayKey = function(value) {
		// 			if(value===undefined) {
		// 				Reload = false;
		// 				return displayKey;
		// 			} else {
		// 				Reload = false;
		// 				displayKey = value;
		// 				return this;
		// 			};
		// 	};

		// 	IsEnabled = function(value) {
		// 		if(value===undefined) {
		// 			Reload = false;
		// 			return isEnabled;
		// 		} else {
		// 			Reload = false;
		// 			isEnabled = value;
		// 			return this;
		// 		};
		// 	};

		// 	PlaceHolder = function(value) {
		// 		if(value===undefined) {
		// 			Reload = false;
		// 			return placeHolder;
		// 		} else {
		// 			Reload = false;
		// 			placeHolder = value;
		// 			return this;
		// 		};
		// 	};

		// 	IsSearchButton = function(value) {
		// 		if(value===undefined) {
		// 			Reload = false;
		// 			return isSearchButton;
		// 		} else {
		// 			Reload = false;
		// 			isSearchButton = value;
		// 			return this;
		// 		};
		// 	};
		// 	MaxLength = function(value) {
		// 		if(value===undefined) {
		// 			Reload = false;
		// 			return maxLength;
		// 		} else {
		// 			Reload = false;
		// 			maxLength = value;
		// 			return this;
		// 		};
		// 	};
		// 	SelectedDimension = function(value) {
		// 		if(value===undefined) {
		// 			Reload = false;
		// 			return selectedDimension;
		// 		} else {
		// 			Reload = false;
		// 			selectedDimension = value;
		// 			return this;
		// 		};
		// 	};

		// 	IsSuggestions = function(value) {
		// 		if(value===undefined) {
		// 			Reload = false;
		// 			return isSuggestions;
		// 		} else {
		// 			Reload = false;
		// 			isSuggestions = value;
		// 			return this;
		// 		};
		// 	};

		// 	SelectedValue = function(value) {
		// 		if(value===undefined) {
		// 			return selectedValue;
		// 		} else {
		// 			selectedValue = value;
		// 			return this;
		// 		};
		// 	};

		// 	SelectedText = function(value) {
		// 		if(value===undefined) {
		// 			return selectedText;
		// 		} else {
		// 			selectedText = value;
		// 			return this;
		// 		};
		// 	};
	}

	/* Define web component - input: tag and class */
	customElements.define('com-iprosis-sample-search', ISearch);
})();
