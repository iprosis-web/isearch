(function()  {
let tmpl = document.createElement('template');
tmpl.innerHTML = `
		 <form id="form">
		 	<fieldset>
				<legend>Search Box Properties</legend>
		 		<table>
		 			<tr>
						<td>Value</td>
						<td><input id="aps_val" type="text" name="val" size="20" maxlength="20"></td>
					</tr>
				</table>
		 	</fieldset>
		 	<button type="submit">Submit</button>
		 </form>
`;

class ISearch extends HTMLElement {
		  constructor() {
		    super();
		    this._shadowRoot = this.attachShadow({mode: 'open'});
		    this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		    this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		  }

		  _submit(e) {
		    	e.preventDefault();
				this.dispatchEvent(new CustomEvent('propertiesChanged', { detail: { properties: {
					val: this.val,
				}}}));
				return false;
		  }

		  get val() {
			 return this._shadowRoot.getElementById("aps_val").value ;
	      }

		  set val(value) {
			  this._shadowRoot.getElementById("aps_val").value = value;
		  }


// 		  attributeChangedCallback(name, oldValue, newValue) {
// 			 if (oldValue != newValue) {
// 				  this[name] = newValue;
// 			 }
// 		  }
 }

customElements.define('com-iprosis-sample-search-aps', ISearch);
})();