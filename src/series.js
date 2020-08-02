//@ts-check
export class FrmdbChartSeries extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ['name', 'suffix'];
    }
    connectedCallback() {
        this.style.display = 'table';
        this.style.borderLeft = '1px solid lightgrey';
        this.style.borderBottom = '1px solid lightgrey';
        this.style.marginLeft = "5px";
    }

    get name() {
        return this.getAttribute('name');
    }
    set name(val) {
        this.setAttribute('name', val);
    }

    get suffix() {
        return this.getAttribute('suffix');
    }
    set suffix(val) {
        this.setAttribute('suffix', val);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.dispatchEvent(new CustomEvent('change'));
    }

    render() { }
}