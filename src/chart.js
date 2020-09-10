import chartJsStyle from 'chart.js/dist/Chart.min.css';
import chartStyle from './chart.css';
//@ts-check
import Chart from 'chart.js/dist/Chart.min';
import { FrmdbChartDataPoint } from './point';
import { FrmdbChartSeries } from './series';

const LINE_COLORS = [
    'red',
    'blue',
    'cyan',
    'magenta',
    'green'
]
export class FrmdbChart extends HTMLElement {

    constructor() {
        super();

        const template = document.createElement('template');
        //wrapped in a div because https://stackoverflow.com/questions/40529006/chartjs-and-polymer-1-7-0
        template.innerHTML = `
            <style>${chartJsStyle}</style>
            <style>${chartStyle}</style>
            <div>
                <canvas id = "chart" height="${this.height}" width="${this.width}"></canvas>
                <div id="chart-data">
                    <button id="hide-series-data" onclick="this.parentElement.classList.toggle('visible')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"/></svg>
                    </button>
                    <slot></slot>
                </div>
            </div>`;
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
        this.querySelectorAll('frmdb-chart-series').forEach(
            /**
             * @param {FrmdbChartSeries} s
             */
            (s, i) => {
                s.querySelectorAll('frmdb-chart-p')
                    .forEach((/** @type {FrmdbChartDataPoint}*/dp) => {
                        let x = dp.x;
                        if (!dataMap[x]) dataMap[x] = {};
                        dataMap[x][`s${i}`] = dp.y;
                    });
                let series = {
                    label: s.name + (s.suffix ? ' ' + s.suffix : '') + (s.suffix2 ? ' ' + s.suffix2 : '') + (s.suffix3 ? ' ' + s.suffix3 : ''),
                    data: [],
                    _id: `s${i}`,
                    borderColor: LINE_COLORS[i % LINE_COLORS.length],
                    ...(s.options || {})
                };
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
        }).observe(this, { childList: true, subtree: true });
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