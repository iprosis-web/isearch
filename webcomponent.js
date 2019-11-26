

(function()  {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `
	<style>
	.text-field {
		-moz-box-sizing: border-box;
		border: 1px solid #EEEEEE;
		font-family: "Source Sans Pro",Arial,sans-serif;
		font-size: 0.73684em;
		font-weight: 600;
		height: 37px;
		margin: 0;
		padding: 5px;
		width: 100%;
		
	}
	.autocomplete-suggestion {
		overflow: hidden;
		padding: 2px 5px;
		white-space: nowrap;
	}
	.autocomplete-suggestions strong {
		color: #3399FF;
		font-weight: normal;
	}
	.autocomplete-selected{
	  background:#F0F0F0;
	}
	</style>
	<form>
	<input type="text" id="query" class="text-field">
	<button>Search</button>
  </form>
	
	`;

class ISearch extends HTMLElement {

	constructor() {
		super();
		this._shadowRoot = this.attachShadow({mode: 'open'});
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		this._shadowRoot.getElementById("query").addEventListener("keypress", this._submit.bind(this));
		this.addEventListener("click", event => {
			var event = new Event("onSearch");
			this.dispatchEvent(event);
		});
		var that = this;
		this._sdata = [];
		this.selectedValue = "";

////////////////////////////////////////////////
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


		////////////////////////////////////
		this.insertData = function() {

			if (_sdata)
				{
				//var dim = _sdata.toUpperCase();
				//	that.callZTLFunction("getMembers", that.getData, dim);
				}		
		};// end insert data to list

	} // end constructor

	_submit(e) {
		e.preventDefault();
		this.dispatchEvent(new CustomEvent("suggestions", {
			
			detail: {
					 
					properties: {
						/////////
					
					}
				}	
		}
		));
	} //end _submit
		
	
	set data(_sdata) {
		var data = [];
			result.forEach(function(element) {
				data.push(element);
			});
		
			var oModel = new sap.ui.model.json.JSONModel(data);
			that.oSearchField.setModel(oModel);
			that.oSearchField.bindAggregation("suggestionItems", "/", tmpl);
	} //end set data

	get data() {
		return this._sdata;
	} // end get data

} //end Class
	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})(); // EOF
