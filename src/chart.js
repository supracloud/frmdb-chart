import Chart from 'chart.js/dist/Chart.min';
import chartStyle from 'chart.js/dist/Chart.min.css';

export class FrmdbChart extends HTMLElement {

    constructor() {
        super();

        const template = document.createElement('template');
        //wrapped in a div because https://stackoverflow.com/questions/40529006/chartjs-and-polymer-1-7-0
        template.innerHTML = `<style>${chartStyle}</style><div><canvas id = "chart" height="${this.height}" width="${this.width}"></canvas></div>`;
        const defaultOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        this._sR = this.attachShadow({ mode: 'open' });
        this._sR.appendChild(template.content.cloneNode(true));

        this.chart = new Chart(this._sR.querySelector('#chart').getContext('2d'), {
            type: this.type,
            data: {},
            options: { ...defaultOptions, ...this.options }
        })
        this.redraw();
    }

    redraw() {
        let data = { labels: [], datasets: [] };
        let dataMap = {};
        this.querySelectorAll('frmdb-chart-series').forEach((s, i) => {
            s.querySelectorAll('frmdb-chart-data-point').forEach(dp => {
                let x = dp.getAttribute('x');
                if (!dataMap[x]) dataMap[x] = {};
                dataMap[x][`s${i}`] = dp.getAttribute('y');
            });
            let series = { label: s.getAttribute('name'), data: [], _id: `s${i}` };
            data.datasets.push(series);
        });
        Object.keys(dataMap).forEach(k => {
            data.labels.push(k);
            Object.keys(dataMap[k]).forEach(s => {
                data.datasets.find(ds => ds._id === s).data.push(dataMap[k][s])
            })

        })
        this.chart.data = data;
        this.chart.update();
    }

    onChartEvent(event) {
        this.dispatchEvent(new CustomEvent('frmdbChartEvent', { detail: event }));
    }

    connectedCallback() {
        new MutationObserver(() => {
            this.redraw();
        }).observe(this, { childList: true });
    }

    static get observedAttributes() {
        return ['type', 'options', 'height', 'width'];
    }

    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        this.setAttribute('type', value);
    }

    get options() {
        return JSON.parse(this.getAttribute('options'));
    }

    set options(value) {
        this.setAttribute('options', JSON.stringify(value));
    }

    get height() {
        return this.getAttribute('height') || 400;
    }

    set height(value) {
        this.setAttribute('height', value);
    }

    get width() {
        return this.getAttribute('width') || 400;
    }

    set width(value) {
        this.setAttribute('width', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render() {

    }
}