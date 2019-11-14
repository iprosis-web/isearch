(function()  {
let tmpl = document.createElement('template');
tmpl.innerHTML = `
<input type="text" class="form-control" id="searchMovie" value="">

`;

class ISearch extends HTMLElement {

	constructor() {
		super();
		this._shadowRoot = this.attachShadow({mode: 'open'});
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		this.sVal = 0;

		
	};

	
	

    get val() {
    	return this.sVal;
    }
    set val(value) {
		this.sVal =  value;
		
	};

  }
	  /* Define web component - input: tag and class */
	  customElements.define('com-iprosis-sample-search', ISearch);
	})();

