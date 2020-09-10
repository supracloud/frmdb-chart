//@ts-check
export class FrmdbChartSeries extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ['name', 'suffix', 'suffix2', 'suffix3'];
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

    get suffix2() {
        return this.getAttribute('suffix2');
    }
    set suffix2(val) {
        this.setAttribute('suffix2', val);
    }
    get suffix3() {
        return this.getAttribute('suffix3');
    }
    set suffix3(val) {
        this.setAttribute('suffix3', val);
    }
    
    attributeChangedCallback(name, oldVal, newVal) {
        this.dispatchEvent(new CustomEvent('change'));
    }

    get options() {
        return JSON.parse(this.getAttribute('options'));
    }

    set options(value) {
        this.setAttribute('options', JSON.stringify(value));
    }

    render() { }
}