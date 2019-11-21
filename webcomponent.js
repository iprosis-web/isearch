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
	.tfbutton2{
		icon: "https://cdn3.vectorstock.com/i/1000x1000/62/77/lupe-icon-search-design-graphic-vector-10066277.jpg"
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
	<div>
	<input type="submit" value=">" class="tfbutton2"><input type="text" id="query" class="text-field valid" autocomplete="on" placeholder="">
	</div>
	`;

class ISearch extends HTMLElement {

	constructor() {
		super();
		this._shadowRoot = this.attachShadow({mode: 'open'});
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		var sData=[];
		
		this.setData = function(result){
			var data = [];
			var x = "";
			result.forEach(function(element) {
				x = x + element;
				console.log("x1");
				if (element === ","){
					data.push(x);
					console.log("x2");
					x= ""; }
				console.log("x3");
			});
			var index = 0;
			data.forEach(function(element) {
				sdata[index] = element;
				index = index +1;
			});
			// var oModel = new sap.ui.model.json.JSONModel(data);
			// var oTemplate = this.getTemplate();
			// that.oSearchField.setModel(oModel);
			// that.oSearchField.bindAggregation("suggestionItems", "/", oTemplate);	
			
		};
		this.getData = function(){
			return sdata;
		};
		
	}};
	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})();
