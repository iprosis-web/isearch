(function() {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `

	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

	<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	
	
	
		

		<div class="ui-widget" id="container">
  			<labelfor="tags">Tags: </label>
  			<input id="tags" autocomplete="on">
		</div>

	`;

	class ISearch extends HTMLElement {
		constructor() {
			super();

			let shadow = this.attachShadow({ mode: 'open' });
			shadow.appendChild(tmpl.content.cloneNode(true));

			let containerDiv = shadow.querySelector('#container');
			let btn1 = document.createElement('BUTTON');
			btn1.id = 'btn1';
			containerDiv.append(btn1);

			let btn2 = document.createElement('BUTTON');
			btn2.id = 'btn2';
			containerDiv.append(btn2);

			btn1.onclick = function() {
				console.log('Button1 !!!');
				$('#btn2', shadow).html('Button2');
			};

			let availableTutorials = ['ActionScript', 'Bootstrap', 'C', 'C++'];

			$('#tags', shadow).autocomplete({
				source: availableTutorials
			});

			// if (this._alive) {
			// 	return;
			// } else {
			// 	this._alive = true;
			// }
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
