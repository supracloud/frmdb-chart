export class FrmdbChartDataPoint extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ['x','y','backgroundColor','borderColor'];
    }

    get x() {
        return this.getAttribute('x');
    }

    set x(val) {
        this.setAttribute('x', val);
    }

    get y() {
        return this.getAttribute('y');
    }

    set y(val) {
        this.setAttribute('y', val);
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