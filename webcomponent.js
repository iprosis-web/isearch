

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
	<div id="help">
	<input type="submit" value=">" class="tfbutton2"><input type="text" id="query" class="text-field valid" autocomplete="on" placeholder="">
	</div>
	`;

class ISearch extends HTMLElement {

	constructor() {
		super();
		this._shadowRoot = this.attachShadow({mode: 'open'});
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		this._shadowRoot.getElementById("help").addEventListener("keypress", this._submit.bind(this));
		this.addEventListener("click", event => {
			var event = new Event("onSearch");
			this.dispatchEvent(event);
		});
		this._sdata;
	
	}
	_submit(e) {
		e.preventDefault();
		this.dispatchEvent(new CustomEvent("suggestions", {
				detail: {
					properties: {
						
					}
				}
		}));
	}
	set data(_sdata) {
		this._shadowRoot.getElementById("suggestions").value = _sdata;
		var data = [];
			result.forEach(function(element) {
				data.push(obj);
			});
		
			var oModel = new sap.ui.model.json.JSONModel(data);
			that.oSearchField.setModel(oModel);
			that.oSearchField.bindAggregation("suggestionItems", "/", tmpl);
	}

	get data() {
		return this._shadowRoot.getElementById("suggestions")._sdata;
	}
}
	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})();
