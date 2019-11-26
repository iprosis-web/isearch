(function() {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `

	<link rel="stylesheet" href="https://sapui5.hana.ondemand.com/1.60.13/resources/sap/m/themes/sap_belize/library.css">

	<script id="sap-ui-bootstrap"
	src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
	data-sap-ui-theme="sap_belize"
	data-sap-ui-libs="sap.m, sap.ui.layout, sap.tnt"
	data-sap-ui-resourceroots='{"Quickstart": "./"}'
	data-sap-ui-async="true">
	</script>

	<div id='sfContainer'>
	
	</div>


	`;

	class ISearch extends HTMLElement {
		constructor() {
			super();

			this._shadowRoot = this.attachShadow({ mode: 'open' });
			this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

			var isSuggestions = null;
			var selectedText = null;
			this.oSearchField = null;

			if (window.sap && sap.zen && sap.zen.designmode) {
				var x = 'dd';
			}

			if (this._alive) {
				return;
			} else {
				var currentSf = 'SF_' + Math.floor(Math.random() * 1000);

				// Create Search Field control and load data
				this.oSearchField = new sap.m.SearchField(currentSf, {
					//enableSuggestions: true,
					search: function(oEvent) {
						console.log('Im here');
						// var text = '';
						// var key = '';
						// var isFire = true;
						// if (isSuggestions === false) {
						// 	text = oEvent.getParameter('query');
						// 	key = text;
						// } else {
						// 	var item = oEvent.getParameter('suggestionItem');
						// 	if (item) {
						// 		text = item.getText();
						// 		key = item.getKey();
						// 	} else if (
						// 		oEvent.getParameter('query') === selectedText
						// 	) {
						// 		isFire = false;
						// 	}
						// }
						// //		oEvent.getParameter("query");
						// if (isFire) {
						// 	selectedValue = key;
						// 	selectedText = text;
						// 	that.firePropertiesChanged(['SelectedValue']);
						// 	that.firePropertiesChanged(['SelectedText']);
						// 	that.fireEvent('onSearch');
						// }
					}

					// suggest: function(oEvent) {
					// 	var value = oEvent.getParameter('suggestValue');
					// 	var filters = [];
					// 	if (value !== '') {
					// 		filters = that.getFilters(value);
					// 	} else {
					// 		filters = that.getFilters('999999iprosis');
					// 	}
					// 	that.oSearchField
					// 		.getBinding('suggestionItems')
					// 		.filter(filters);
					// 	that.oSearchField.suggest();
					// }
				});

				let sfContainer = this.shadowRoot.getElementById('sfContainer');

				this.oSearchField.placeAt(sfContainer);

				this._alive = true;
			}
		}

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
