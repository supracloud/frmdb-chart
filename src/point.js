//@ts-check
export class FrmdbChartDataPoint extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.style.display = 'table-row';
    }

    static get observedAttributes() {
        return ['x','y','backgroundColor','borderColor'];
    }

    get x() {
        return this.querySelector('frmdb-chart-p-x').innerHTML;
    }

    set x(val) {
        this.querySelector('frmdb-chart-p-x').innerHTML = val;
    }

    get y() {
        return this.querySelector('frmdb-chart-p-y').innerHTML;
    }

    set y(val) {
        this.querySelector('frmdb-chart-p-y').innerHTML = val;
    }

    get backgroundColor() {
        return this.getAttribute('backgroundColor');
    }

    set backgroundColor(val) {
        this.setAttribute('backgroundColor', val);
    }

    get borderColor() {
        return this.getAttribute('borderColor');
    }

    set borderColor(val) {
        this.setAttribute('borderColor', val);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.dispatchEvent(new CustomEvent('change'));
    }

    render() { }
}