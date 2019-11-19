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
		var dataResultSet = null;
			var _isEnabled = null;
			var placeHolder = null;
			var _isSearchButton = null;
			var isSuggestions = null;
			var maxLength = null;
			var selectedDimension = null;
			
			var displayKey = null;
			var selectedValue = null;
			var selectedText = null;
			var reload = false;
			var that = this;
			var Data = null;
			this.oSearchField = null;
			
			this.init = function() {
				
				if( window.sap && sap.zen && sap.zen.designmode)
					{
						var x = "dd";
					}
				
				
				if (this._alive){
					return;
				} else {
				
					currentDiv = "DIV_" + this.$().attr('id');
					var currentSf = "SF_" + this.$().attr('id');
					
					// Create Search Field control and load data
					that.oSearchField = new sap.m.SearchField(currentSf, {
						enableSuggestions: true,
						search: function(oEvent) {
							var text = "";
							var key = "";
							var isFire = true;
							if (isSuggestions === false)
								{
									text = oEvent.getParameter("query");
									key = text;
								}else{
									var item = oEvent.getParameter("suggestionItem");
									if(item)
										{
											text = item.getText();
											key = item.getKey();
										}else if (oEvent.getParameter("query") === selectedText)
											{
												 isFire = false;
											}
								}
					//		oEvent.getParameter("query");
								if (isFire)
									{
										selectedValue = key;
										selectedText = text;
										that.firePropertiesChanged(["SelectedValue"]);
										that.firePropertiesChanged(["SelectedText"]);
										that.fireEvent("onSearch");  
									}
						},
	
						suggest: function(oEvent) {
								var value =oEvent.getParameter("suggestValue");
								var filters = [];
								if(value !== "")
									{
									 filters = that.getFilters(value);		
									}else{
										filters = that.getFilters("999999iprosis");		
									}
								that.oSearchField.getBinding("suggestionItems").filter(filters);
								that.oSearchField.suggest();
						}
					});
	
				this.$().html('<div id="' + currentDiv + '"> ');
				that.oSearchField.placeAt(currentDiv);
				this._alive = true;
				}
			};
			
			this.afterUpdate = function() {
				that.oSearchField.setEnabled(_isEnabled);
				that.oSearchField.setPlaceholder(placeHolder);
				that.oSearchField.setEnableSuggestions(isSuggestions);
				that.oSearchField.setMaxLength(maxLength);
				that.oSearchField.setShowSearchButton(_isSearchButton);
	
				if (dataResultSet){
					if (reload){	
						return;
					} else {
						this.insertData();
						reload = true;
					}
				}
				
			};
			this.getFilters = function(value){
				var filters = [];
				oFilterText = new sap.ui.model.Filter("text", function(sText) {
					return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
				});
				oFilterDesc =  new sap.ui.model.Filter("key", function(sDes) {
						 return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					 });
				
				if (displayKey === true)
					{
						filters = [new sap.ui.model.Filter([oFilterText,oFilterDesc], false)];
					}else{
						filters = [	new sap.ui.model.Filter([oFilterText], false)];
					}
				
				return filters
			};
			this.getTemplate = function(){
				if (displayKey === true)
					{
						 oTemplate = new sap.m.SuggestionItem({
							text: "{text}",
							key: "{key}",
							description:"{key}"
						 });
					}else{
						oTemplate = new sap.m.SuggestionItem({
						text: "{text}",
						key: "{key}"
					});
				}
				return oTemplate;
			};
			
			
			this.getData = function(result){
				var data = [];
				var x = result;
				var obj = {};
				result.forEach(function(element) {
					obj = {};
					obj.text = element.text;
					obj.key = element.key;
					data.push(obj);
				});
			
				var oModel = new sap.ui.model.json.JSONModel(data);
				var oTemplate = this.getTemplate();
				that.oSearchField.setModel(oModel);
				that.oSearchField.bindAggregation("suggestionItems", "/", oTemplate);	
				
			}
			
			this.insertData = function() {
	
				if (selectedDimension)
					{
					var dim = selectedDimension.toUpperCase();
						that.callZTLFunction("getMembers", that.getData, dim);
					}
						
	//			data = dataResultSet.dimensions[0].members;
	//			oModel.setSizeLimit(maxItems);			
			};
			
			this.DataResultSet = function(value) {
				if(value===undefined) {
					return dataResultSet;
				} else {
					//Clear Auto
					if (reload) {
						that.oSearchField.removeAllSuggestionItems();
						that.oSearchField.setValue("");
						reload = false;
					}
					dataResultSet = value;
					return this;
				};
			};	
			
			this.DisplayKey = function(value) {
				if(value===undefined) {
					Reload = false;
					return displayKey;
				} else {
					Reload = false;
					displayKey = value;
					return this;
				};
			};
	
			this.IsEnabled = function(value) {
				if(value===undefined) {
					Reload = false;
					return _isEnabled;
				} else {
					Reload = false;
					_isEnabled = value;
					return this;
				};
			};
			
			this.PlaceHolder = function(value) {
				if(value===undefined) {
					Reload = false;
					return placeHolder;
				} else {
					Reload = false;
					placeHolder = value;
					return this;
				};
			};
			
			this.IsSearchButton = function(value) {
				if(value===undefined) {
					Reload = false;
					return _isSearchButton;
				} else {
					Reload = false;
					_isSearchButton = value;
					return this;
				};
			};
			this.MaxLength = function(value) {
				if(value===undefined) {
					Reload = false;
					return maxLength;
				} else {
					Reload = false;
					maxLength = value;
					return this;
				};
			};
			this.SelectedDimension = function(value) {
				if(value===undefined) {
					Reload = false;
					return selectedDimension;
				} else {
					Reload = false;
					selectedDimension = value;
					return this;
				};
			};
			
			
			this.IsSuggestions = function(value) {
				if(value===undefined) {
					Reload = false;
					return isSuggestions;
				} else {
					Reload = false;
					isSuggestions = value;
					return this;
				};
			};
		
			this.SelectedValue = function(value) {
				if(value===undefined) {
					return selectedValue;
				} else {
					selectedValue = value;
					return this;
				};
			};
			
			this.SelectedText = function(value) {
				if(value===undefined) {
					return selectedText;
				} else {
					selectedText = value;
					return this;
				};
			};	
			
		};	
	}

	// TRY CODE IN CONSTRUCTOR INSTED OF INNER HTML	
	window.onload = function(){ 
		//Get submit button
		var submitbutton = document.getElementById("tfq");
		//Add listener to submit button
		if(submitbutton.addEventListener){
			submitbutton.addEventListener("onClick", function() {
				if (submitbutton.value == 'Search our website'){//Customize this text string to whatever you want
					submitbutton.value = '';
				}
			});
		}
	
	}

	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})();
