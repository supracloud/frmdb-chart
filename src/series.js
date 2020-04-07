export class FrmdbChartSeries extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ['name'];
    }

    get name() {
        return this.getAttribute('name');
    }

    set name(val) {
        this.setAttribute('name', val);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.dispatchEvent(new CustomEvent('change'));
    }

    render() { }
}